import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, take, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { FeeCalculationType } from '../../../store/fee-calculation-types/fee-calculation-type.model';
import { FeeCalculationTypesFacade } from '../../../store/fee-calculation-types/fee-calculation-types.facade';

@Component({
  selector: 'app-view-fees-calculation-types',
  standalone: false,
  templateUrl: './view-fees-calculation-types.component.html',
  styleUrl: './view-fees-calculation-types.component.scss',
})
export class ViewFeesCalculationTypesComponent {
  tableDataInside: FeeCalculationType[] = [];
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
  selectedFeeCalculationTypeId: number | null = null;
  originalFeeCalculationType: FeeCalculationType[] = [];
  filteredFeeCalculationType: FeeCalculationType[] = [];
  feeCalculationTypes$!: Observable<FeeCalculationType[]>;

  constructor(
    private router: Router,
    private facade: FeeCalculationTypesFacade
  ) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.feeCalculationTypes$ = this.facade.history$;
    console.log('🟢 before loadAll, current store value:');
    this.feeCalculationTypes$
      .pipe(take(1))
      .subscribe((v) => console.log('   store currently has:', v));
    console.log('🟢 Calling loadAll() to fetch feeCalculationTypes');
    this.facade.loadHistory();

    this.feeCalculationTypes$
      ?.pipe(takeUntil(this.destroy$))
      ?.subscribe((fee) => {
        // fee is now fee[], not any
        const sorted = [...fee].sort((a, b) => b?.id - a?.id);
        this.originalFeeCalculationType = sorted;
        this.filteredFeeCalculationType = [...sorted];
      });
  }

  onAddFeeCalculationType() {
    this.router.navigate(['/lookups/add-fee-calculation-types']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteFeeCalculationType(feeCalculationTypeId: any): void {
    console.log(
      '[View] onDeleteFeeCalculationType() – opening modal for id=',
      feeCalculationTypeId
    );
    this.selectedIds = [feeCalculationTypeId];
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
    this.feeCalculationTypes$ = this.facade.all$;
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
    this.selectedFeeCalculationTypeId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredFeeCalculationType = this.originalFeeCalculationType.filter(
      (feeCalculationTypes) =>
        Object.values(feeCalculationTypes).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditFeeCalculationType(feeCalculationType: FeeCalculationType) {
    this.router.navigate(
      ['/lookups/edit-fee-calculation-types', feeCalculationType.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }
  onViewFeeCalculationType(ct: FeeCalculationType) {
    this.router.navigate(['/lookups/edit-fee-calculation-types', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
