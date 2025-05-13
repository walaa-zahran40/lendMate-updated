import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, filter } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { PageOperation } from '../../../store/page-operations/page-operation.model';
import { PageOperationsFacade } from '../../../store/page-operations/page-operations.facade';

@Component({
  selector: 'app-view-page-operations',
  standalone: false,
  templateUrl: './view-page-operations.component.html',
  styleUrl: './view-page-operations.component.scss',
})
export class ViewPageOperationsComponent {
  tableDataInside: PageOperation[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'operationName', header: 'Operation' },
    { field: 'pageName', header: 'Page' },
  ];
  showDeleteModal: boolean = false;
  selectedPageOperationsId: number | null = null;
  originalPageOperations: any;
  filteredPageOperations: any;
  pageOperations$!: Observable<PageOperation[]>;

  constructor(private router: Router, private facade: PageOperationsFacade) {}
  ngOnInit() {
    this.facade.loadAll();
    this.facade.pageOperationSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter((op) => op?.entity === 'PageOperations')
      )
      .subscribe(() => this.facade.loadAll());
    this.pageOperations$ = this.facade.all$;

    this.pageOperations$
      ?.pipe(takeUntil(this.destroy$))
      ?.subscribe((pageOperations) => {
        console.log('[View] pageOperations$ – pageOperations=', pageOperations);
        const activeCodes = pageOperations.filter((code) => code.isActive);
        const sorted = [...activeCodes].sort((a, b) => b?.id - a?.id);
        this.originalPageOperations = sorted;
        this.filteredPageOperations = [...sorted];
        const flat = sorted.map((po) => ({
          id: po.id,
          operationName: po.operation?.name,
          pageName: po.page?.name,
          isActive: po.isActive,
        }));

        this.originalPageOperations = flat;
        this.filteredPageOperations = [...flat];
      });
  }

  onAddPageOperation() {
    this.router.navigate(['/organizations/add-page-operation']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeletePageOperation(pageOperationsId: any): void {
    console.log(
      '[View] onDeletePageOperations() – opening modal for id=',
      pageOperationsId
    );
    this.selectedPageOperationsId = pageOperationsId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedPageOperationsId
    );
    if (this.selectedPageOperationsId !== null) {
      this.facade.delete(this.selectedPageOperationsId);
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
    this.selectedPageOperationsId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredPageOperations = this.originalPageOperations.filter(
      (pageOperations: { [s: string]: unknown } | ArrayLike<unknown>) =>
        Object.values(pageOperations).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditPageOperation(pageOperations: PageOperation) {
    this.router.navigate(
      ['/organizations/edit-page-operation', pageOperations.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }
  onViewPageOperations(ct: PageOperation) {
    this.router.navigate(['/organizations/edit-page-operation', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
