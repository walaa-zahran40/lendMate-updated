import { Component, ViewChild } from '@angular/core';
// import { ClientStatuses } from '../../../../shared/interfaces/client-statuses.interface';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../../../shared/components/table/table.component';
import { Client } from '../../../store/clients/client.model';
import { ClientsFacade } from '../../../store/clients/clients.facade';
import { ClientStatus } from '../../../store/client-statuses/client-status.model';
import { ClientStatusesFacade } from '../../../store/client-statuses/client-statuses.facade';

@Component({
  selector: 'app-view-client-status',
  standalone: false,
  templateUrl: './view-client-status.component.html',
  styleUrl: './view-client-status.component.scss',
})
export class ViewClientStatusComponent {
  tableDataInside: ClientStatus[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
  ];
  showDeleteModal: boolean = false;
  selectedClientStatusId: number | null = null;
  originalClientStatuses: ClientStatus[] = [];
  filteredClientStatuses: ClientStatus[] = [];
  clientStatuses$!: Observable<ClientStatus[]>;

  constructor(private router: Router, private facade: ClientStatusesFacade) {}
  ngOnInit() {
    this.facade.loadAll();
    this.clientStatuses$ = this.facade.items$;

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
    this.router.navigate(['/lookups/add-client-statuses']);
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
    this.selectedClientStatusId = companyTypeId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedClientStatusId
    );
    if (this.selectedClientStatusId !== null) {
      this.facade.delete(this.selectedClientStatusId);
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
    this.router.navigate(['/lookups/edit-client-statuses', companyType.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewClientStatus(ct: ClientStatus) {
    this.router.navigate(['/lookups/edit-client-statuses', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
