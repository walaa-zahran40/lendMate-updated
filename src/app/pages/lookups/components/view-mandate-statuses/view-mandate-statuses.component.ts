import { Component, ViewChild } from '@angular/core';
import { MandateStatuses } from '../../../../shared/interfaces/mandate-statuses.interface';
import { Router } from '@angular/router';
import { MandateStatus } from '../../store/mandate-statuses/mandate-status.model';
import { MandateStatusesFacade } from '../../store/mandate-statuses/mandate-statuses.facade';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../shared/components/table/table.component';

@Component({
  selector: 'app-view-mandate-statuses',
  standalone: false,
  templateUrl: './view-mandate-statuses.component.html',
  styleUrl: './view-mandate-statuses.component.scss',
})

export class ViewMandateStatusesComponent {
  tableDataInside: MandateStatus[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'code', header: 'Code' },
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'isinitial', header: 'Is Initial' },
  ];

  showDeleteModal = false;
  selectedMandateStatusId: number | null = null;
  originalMandateStatuses: MandateStatus[] = [];
  filteredMandateStatuses: MandateStatus[] = [];
  mandateStatuses$!: Observable<MandateStatus[]>;

  constructor(private router: Router, private facade: MandateStatusesFacade) {}

  ngOnInit() {
    console.log('🟢 ngOnInit: start loading mandateStatuses');
    this.facade.loadAll();
    this.mandateStatuses$ = this.facade.items$;

    this.mandateStatuses$.pipe(takeUntil(this.destroy$)).subscribe((mandateStatuses) => {
      const sorted = [...mandateStatuses].sort((a, b) => b.id - a.id);
      console.log('🟢 sorted mandateStatuses:', sorted);
      this.originalMandateStatuses = sorted;
      this.filteredMandateStatuses = [...sorted];
    });
  }

  onAddMandateStatus() {
    this.router.navigate(['/lookups/add-mandate-statuses']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteMandateStatus(currencyId: number): void {
    console.log(
      '[View] onDeleteMandateStatus() – opening modal for id=',
      currencyId
    );
    this.selectedMandateStatusId = currencyId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedMandateStatusId
    );
    if (this.selectedMandateStatusId !== null) {
      this.facade.delete(this.selectedMandateStatusId);
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
    this.selectedMandateStatusId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredMandateStatuses = this.originalMandateStatuses.filter((mandateStatus) =>
      Object.values(mandateStatus).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditMandateStatus(mandateStatus: MandateStatus) {
    this.router.navigate(['/lookups/edit-mandate-statuses', mandateStatus.id], {
      queryParams: { mode: 'edit' },
    });
  }

  onViewMandateStatus(mandateStatus: MandateStatus) {
    this.router.navigate(['/lookups/edit-mandate-statuses', mandateStatus.id], {
      queryParams: { mode: 'view' },
    });
  }
}
