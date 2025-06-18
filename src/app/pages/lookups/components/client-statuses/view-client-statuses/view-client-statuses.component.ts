import { Component, ViewChild } from '@angular/core';
// import { ClientStatuses } from '../../../../shared/interfaces/client-statuses.interface';
import { Observable, Subject, takeUntil, forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { ClientStatus } from '../../../store/client-statuses/client-status.model';
import { ClientStatusesFacade } from '../../../store/client-statuses/client-statuses.facade';

@Component({
  selector: 'app-view-client-status',
  standalone: false,
  templateUrl: './view-client-statuses.component.html',
  styleUrl: './view-client-statuses.component.scss',
})
export class ViewClientStatusesComponent {
  tableDataInside: ClientStatus[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'isInitial', header: 'Is Initial' },
    { field: 'isActive', header: 'Is Active' },
  ];
  showDeleteModal: boolean = false;
  selectedClientStatusId: number | null = null;
  originalClientStatuses: ClientStatus[] = [];
  filteredClientStatuses: ClientStatus[] = [];
  clientStatuses$!: Observable<ClientStatus[]>;

  constructor(private router: Router, private facade: ClientStatusesFacade) {}
  ngOnInit() {
    this.facade.loadHistory();
    this.clientStatuses$ = this.facade.history$;

    this.clientStatuses$
      ?.pipe(takeUntil(this.destroy$))
      .subscribe((clientStatuses) => {
        // clientStatuses is now ClientStatus[], not any
        const sorted = [...clientStatuses].sort((a, b) => b.id - a.id);
        this.originalClientStatuses = sorted;
        this.filteredClientStatuses = [...sorted];
      });
  }

  onAddClientStatus() {
    this.router.navigate(['/lookups/add-client-status']);
  }
  onAddSide(clientStatusId: any) {
    this.router.navigate(['/lookups/wizard-client-status', clientStatusId]);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteClientStatus(companyTypeId: any): void {
    console.log(
      '[View] onDeleteClientStatus() – opening modal for id=',
      companyTypeId
    );
    this.selectedIds = [companyTypeId];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedClientStatusId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredClientStatuses = this.originalClientStatuses.filter(
      (companyType) =>
        Object.values(companyType).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditClientStatus(companyType: ClientStatus) {
    this.router.navigate(['/lookups/edit-client-status', companyType.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewClientStatus(ct: ClientStatus) {
    this.router.navigate(['/lookups/edit-client-status', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
  selectedIds: number[] = [];
  confirmDelete() {
    const deleteCalls = this.selectedIds.map((id) => this.facade.delete(id));

    forkJoin(deleteCalls).subscribe({
      next: () => {
        this.selectedIds = [];
        this.showDeleteModal = false; // CLOSE MODAL HERE
        this.refreshCalls();
      },
      error: (err) => {
        this.showDeleteModal = false; // STILL CLOSE IT
      },
    });
  }

  refreshCalls() {
    this.facade.loadAll();
    this.clientStatuses$ = this.facade.items$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
