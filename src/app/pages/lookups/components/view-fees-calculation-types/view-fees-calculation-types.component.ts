import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, take } from 'rxjs';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { FeeCalculationType } from '../../store/fee-calculation-types/fee-calculation-types.model';
import { FeeCalculationTypesFacade } from '../../store/fee-calculation-types/fee-calculation-types.facade';

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
    this.feeCalculationTypes$ = this.facade.all$;
    console.log('🟢 before loadAll, current store value:');
    this.feeCalculationTypes$
      .pipe(take(1))
      .subscribe((v) => console.log('   store currently has:', v));
    console.log('🟢 Calling loadAll() to fetch feeCalculationTypes');
    this.facade.loadAll();

    this.feeCalculationTypes$
      ?.pipe(takeUntil(this.destroy$))
      .subscribe((feeCalculationTypes) => {
        console.log(
          '🟢 subscribe: received feeCalculationTypes array:',
          feeCalculationTypes
        );

        // preserve immutability, then sort by id descending
        const sorted = [...feeCalculationTypes].sort((a, b) => b.id - a.id);
        console.log('🟢 sorted (by id desc):', sorted);

        this.originalFeeCalculationType = sorted;
        console.log(
          '🟢 originalFeeCalculationType set to:',
          this.originalFeeCalculationType
        );

        this.filteredFeeCalculationType = [...sorted];
        console.log(
          '🟢 filteredFeeCalculationType set to:',
          this.filteredFeeCalculationType
        );
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
    this.selectedFeeCalculationTypeId = feeCalculationTypeId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedFeeCalculationTypeId
    );
    if (this.selectedFeeCalculationTypeId !== null) {
      this.facade.delete(this.selectedFeeCalculationTypeId);
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
