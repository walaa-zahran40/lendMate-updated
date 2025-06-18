import { Component, ViewChild } from '@angular/core';
// import { MandateStatuses } from '../../../../shared/interfaces/mandate-statuses.interface';
import { forkJoin, Observable, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { MandateStatus } from '../../../store/mandate-statuses/mandate-statuses/mandate-status.model';
import { MandateStatusesFacade } from '../../../store/mandate-statuses/mandate-statuses/mandate-statuses.facade';

@Component({
  selector: 'app-view-mandate-status',
  standalone: false,
  templateUrl: './view-mandate-statuses.component.html',
  styleUrl: './view-mandate-statuses.component.scss',
})
export class ViewMandateStatusesComponent {
  tableDataInside: MandateStatus[] = [];
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
  selectedMandateStatusId: number | null = null;
  originalMandateStatuses: MandateStatus[] = [];
  filteredMandateStatuses: MandateStatus[] = [];
  mandateStatuses$!: Observable<MandateStatus[]>;

  constructor(private router: Router, private facade: MandateStatusesFacade) {}
  ngOnInit() {
    this.facade.loadHistory();
    this.mandateStatuses$ = this.facade.history$;

    this.mandateStatuses$
      ?.pipe(takeUntil(this.destroy$))
      .subscribe((mandateStatuses) => {
        // mandateStatuses is now MandateStatus[], not any
        const sorted = [...mandateStatuses].sort((a, b) => b.id - a.id);
        this.originalMandateStatuses = sorted;
        this.filteredMandateStatuses = [...sorted];
      });
  }

  onAddMandateStatus() {
    this.router.navigate(['/lookups/add-mandate-status']);
  }
  onAddSide(mandateStatusId: any) {
    this.router.navigate(['/lookups/wizard-mandate-status', mandateStatusId]);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteMandateStatus(companyTypeId: any): void {
    console.log(
      '[View] onDeleteMandateStatus() – opening modal for id=',
      companyTypeId
    );
    this.selectedIds = [companyTypeId];
    this.showDeleteModal = true;
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
    this.mandateStatuses$ = this.facade.items$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedMandateStatusId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredMandateStatuses = this.originalMandateStatuses.filter(
      (companyType) =>
        Object.values(companyType).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditMandateStatus(companyType: MandateStatus) {
    this.router.navigate(['/lookups/edit-mandate-status', companyType.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewMandateStatus(ct: MandateStatus) {
    this.router.navigate(['/lookups/edit-mandate-status', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
