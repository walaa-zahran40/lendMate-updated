import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, filter } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Page } from '../../../../organizations/store/pages/page.model';
import { PagesFacade } from '../../../store/pages/pages.facade';

@Component({
  selector: 'app-view-pages',
  standalone: false,
  templateUrl: './view-pages.component.html',
  styleUrl: './view-pages.component.scss',
})
export class ViewPagesComponent {
  tableDataInside: Page[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'url', header: 'URL' },
  ];
  showDeleteModal: boolean = false;
  selectedPageId: number | null = null;
  originalPages: Page[] = [];
  filteredPages: Page[] = [];
  pages$!: Observable<Page[]>;

  constructor(private router: Router, private facade: PagesFacade) {}
  ngOnInit() {
    this.facade.loadAll();
    this.facade.operationSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter((op) => op?.entity === 'Page')
      )
      .subscribe(() => this.facade.loadAll());
    this.pages$ = this.facade.all$;

    this.pages$?.pipe(takeUntil(this.destroy$))?.subscribe((address) => {
      // products is now rentStructureType[], not any
      const activeCodes = address.filter((code) => code.isActive);
      const sorted = [...activeCodes].sort((a, b) => b?.id - a?.id);
      this.originalPages = sorted;
      this.filteredPages = [...sorted];
    });
  }

  onAddPage() {
    this.router.navigate(['/organizations/add-page']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeletePage(pageId: any): void {
    console.log('[View] onDeletePage() – opening modal for id=', pageId);
    this.selectedPageId = pageId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedPageId
    );
    if (this.selectedPageId !== null) {
      this.facade.delete(this.selectedPageId);
      console.log('[View] confirmDelete() – facade.delete() called');
    } else {
      console.warn('[View] confirmDelete() – no id to delete');
    }
    this.resetDeleteModal();
  }
  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedPageId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredPages = this.originalPages.filter((page) =>
      Object.values(page).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditPage(page: Page) {
    this.router.navigate(['/lookups/edit-pages', page.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewPage(ct: Page) {
    this.router.navigate(['/lookups/edit-pages', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
