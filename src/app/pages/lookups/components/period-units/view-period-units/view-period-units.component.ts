import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, take, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { GracePeriodUnitsFacade } from '../../../store/period-units/period-units.facade';
import { PeriodUnit } from '../../../store/period-units/period-unit.model';

@Component({
  selector: 'app-view-period-units',
  standalone: false,
  templateUrl: './view-period-units.component.html',
  styleUrl: './view-period-units.component.scss',
})
export class ViewPeriodUnitsComponent {
  tableDataInside: PeriodUnit[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'isActive', header: 'Is Active' },
  ];
  showDeleteModal: boolean = false;
  selectedGracePeriodUnitId: number | null = null;
  originalGracePeriodUnit: PeriodUnit[] = [];
  filteredGracePeriodUnit: PeriodUnit[] = [];
  gracePeriodUnits$!: Observable<PeriodUnit[]>;

  constructor(private router: Router, private facade: GracePeriodUnitsFacade) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.gracePeriodUnits$ = this.facade.history$;
    console.log('🟢 before loadHistory, current store value:');
    this.gracePeriodUnits$
      .pipe(take(1))
      .subscribe((v) => console.log('   store currently has:', v));
    console.log('🟢 Calling loadHistory() to fetch gracePeriodUnits');
    this.facade.loadHistory();

    this.gracePeriodUnits$
      ?.pipe(takeUntil(this.destroy$))
      ?.subscribe((periodUnits) => {
        // periodUnits is now rentStructureType[], not any
        const sorted = [...periodUnits].sort((a, b) => b?.id - a?.id);
        this.originalGracePeriodUnit = sorted;
        this.filteredGracePeriodUnit = [...sorted];
      });
  }

  onAddGracePeriodUnit() {
    this.router.navigate(['/lookups/add-period-units']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteGracePeriodUnit(gracePeriodUnitId: any): void {
    console.log(
      '[View] onDeleteGracePeriodUnit() – opening modal for id=',
      gracePeriodUnitId
    );
    this.selectedIds = [gracePeriodUnitId];
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
    this.gracePeriodUnits$ = this.facade.all$;
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
    this.selectedGracePeriodUnitId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredGracePeriodUnit = this.originalGracePeriodUnit.filter(
      (gracePeriodUnits) =>
        Object.values(gracePeriodUnits).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditGracePeriodUnit(periodUnit: PeriodUnit) {
    this.router.navigate(['/lookups/edit-period-units', periodUnit.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewGracePeriodUnit(ct: PeriodUnit) {
    this.router.navigate(['/lookups/edit-period-units', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
