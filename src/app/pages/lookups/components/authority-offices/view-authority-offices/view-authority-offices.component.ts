import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { AuthorityOffice } from '../../../store/authority-offices/authority-office.model';
import { AuthorityOfficesFacade } from '../../../store/authority-offices/authority-offices.facade';

@Component({
  selector: 'app-view-authority-offices',
  standalone: false,
  templateUrl: './view-authority-offices.component.html',
  styleUrl: './view-authority-offices.component.scss',
})
export class ViewAuthorityOfficesComponent {
  tableDataInside: AuthorityOffice[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'isActive', header: 'Active' },
  ];
  showDeleteModal: boolean = false;
  selectedAuthorityOfficeId: number | null = null;
  originalAuthorityOffices: AuthorityOffice[] = [];
  filteredAuthorityOffices: AuthorityOffice[] = [];
  authorityOffices$!: Observable<AuthorityOffice[]>;

  constructor(private router: Router, private facade: AuthorityOfficesFacade) {}
  ngOnInit() {
    this.facade.loadHistory();
    this.authorityOffices$ = this.facade.history$;

    this.authorityOffices$
      ?.pipe(takeUntil(this.destroy$))
      ?.subscribe((office) => {
        const sorted = [...office].sort((a, b) => b?.id - a?.id);
        this.originalAuthorityOffices = sorted;
        this.filteredAuthorityOffices = [...sorted];
      });
  }

  onAddAuthorityOffice() {
    this.router.navigate(['/lookups/add-authority-offices']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteAuthorityOfficeId(authorityOfficeId: any): void {
    console.log(
      '[View] onDeleteAuthorityOffice() – opening modal for id=',
      authorityOfficeId
    );
    this.selectedAuthorityOfficeId = authorityOfficeId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedAuthorityOfficeId
    );
    if (this.selectedAuthorityOfficeId !== null) {
      this.facade.delete(this.selectedAuthorityOfficeId);
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
    this.selectedAuthorityOfficeId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredAuthorityOffices = this.originalAuthorityOffices.filter(
      (authorityOffice) =>
        Object.values(authorityOffice).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditAuthorityOffice(authorityOffice: AuthorityOffice) {
    this.router.navigate(
      ['/lookups/edit-authority-offices', authorityOffice.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }
  onViewAuthorityOffice(ct: AuthorityOffice) {
    this.router.navigate(['/lookups/edit-authority-offices', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
