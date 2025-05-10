import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, take, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { GracePeriodUnitsFacade } from '../../store/period-units/period-units.facade';
import { PeriodUnit } from '../../store/period-units/period-unit.model';

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
  ];
  showDeleteModal: boolean = false;
  selectedGracePeriodUnitId: number | null = null;
  originalGracePeriodUnit: PeriodUnit[] = [];
  filteredGracePeriodUnit: PeriodUnit[] = [];
  gracePeriodUnits$!: Observable<PeriodUnit[]>;

  constructor(private router: Router, private facade: GracePeriodUnitsFacade) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.gracePeriodUnits$ = this.facade.all$;
    console.log('🟢 before loadAll, current store value:');
    this.gracePeriodUnits$
      .pipe(take(1))
      .subscribe((v) => console.log('   store currently has:', v));
    console.log('🟢 Calling loadAll() to fetch gracePeriodUnits');
    this.facade.loadAll();

    this.gracePeriodUnits$
      ?.pipe(takeUntil(this.destroy$))
      ?.subscribe((periodUnits) => {
        // periodUnits is now rentStructureType[], not any
        const activeCodes = periodUnits.filter((code) => code.isActive);
        const sorted = [...activeCodes].sort((a, b) => b?.id - a?.id);
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
    this.selectedGracePeriodUnitId = gracePeriodUnitId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedGracePeriodUnitId
    );
    if (this.selectedGracePeriodUnitId !== null) {
      this.facade.delete(this.selectedGracePeriodUnitId);
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
