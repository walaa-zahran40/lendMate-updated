import { Component, ViewChild } from '@angular/core';
import {
  combineLatest,
  map,
  of,
  Subject,
  takeUntil,
} from 'rxjs';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { FeeRange } from '../../../store/fee-ranges/fee-ranges.model';
import { FeeRangesFacade } from '../../../store/fee-ranges/fee-ranges.facade';
import { FeeTypesFacade } from '../../../store/fee-types/fee-types.facade';

@Component({
  selector: 'app-view-fee-ranges',
  standalone: false,
  templateUrl: './view-fee-ranges.component.html',
  styleUrl: './view-fee-ranges.component.scss',
})
export class ViewFeeRangesComponent {
  tableDataInside: FeeRange[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'lowerBound', header: 'Lower Bound' },
    { field: 'upperBound', header: 'Upper Bound' },
    { field: 'feeTypeName', header: 'Fee Type' },
    { field: 'defaultPrecentage', header: 'Default Percentage' },
    { field: 'defaultAmount', header: 'Default Amount' },
    { field: 'criteriaField', header: 'Criteria Field' }
  ];


  //   id: number;
  // lowerBound: number;
  // upperBound: number;
  // feeTypeId: number;
  // feeType: any;
  // defaultAmount: number;
  // defaultPercentage: any;
  // criteriaField: string;
  // isActive: boolean;

  showDeleteModal = false;
  selectedFeeRangeId: number | null = null;
  originalFeeRanges: FeeRange[] = [];
  filteredFeeRanges: FeeRange[] = [];
  feeRanges$!: any;
  feeCalcList$: any;
  constructor(
    private router: Router,
    private facade: FeeRangesFacade,
    private feeTypesFacade: FeeTypesFacade
  ) {}

  //feeTypeId
  ngOnInit() {
    // Initialize observables
    this.feeRanges$ = this.facade.all$;
    this.feeCalcList$ = this.feeTypesFacade.all$;

    // Trigger loading
    this.facade.loadAll();
    this.feeTypesFacade.loadAll();

    // Combine fee types with their corresponding Typesulation type names
    combineLatest<[FeeRange[], any[]]>([
      this.feeRanges$ ?? of([]),
      this.feeCalcList$ ?? of([]),
    ])
      .pipe(
        map(([feeRanges, feeCalcRanges]) => {
          console.log('📦 Raw feeRanges:', feeRanges);
          console.log('📦 Raw feeCalcRanges:', feeCalcRanges);

          return feeRanges
            .map((ss) => {
              console.log('ss', ss);
              const match = feeCalcRanges.find(
                (s) => s.id === ss.feeTypeId
              );

              console.log(
                `🔍 Matching Types type for feeRange ID ${ss.id} (feeCalculationRangeId: ${ss.feeTypeId}):`,
                match
              );

              return {
                ...ss,
                feeCalculationRange:
                  feeCalcRanges.find((s) => s.id === ss.feeTypeId)
                    ?.name || '—',
              };
            })
            .filter((ft) => ft.isActive)
            .sort((a, b) => b.id - a.id);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((result) => {
        console.log('result', result);
        this.filteredFeeRanges = result;
        this.originalFeeRanges = result;
      });
  }

  onAddFeeRange() {
    this.router.navigate(['/lookups/add-fee-ranges']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteFeeRange(feeRangesId: number): void {
    this.selectedFeeRangeId = feeRangesId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.selectedFeeRangeId !== null) {
      this.facade.delete(this.selectedFeeRangeId);
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
    this.showDeleteModal = false;
    this.selectedFeeRangeId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredFeeRanges = this.originalFeeRanges.filter((feeRanges) =>
      Object.values(feeRanges).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditFeeRange(feeRanges: FeeRange) {
    this.router.navigate(['/lookups/edit-fee-ranges', feeRanges.id], {
      queryParams: { mode: 'edit' },
    });
  }

  onViewFeeRange(feeRanges: FeeRange) {
    this.router.navigate(['/lookups/edit-fee-ranges', feeRanges.id], {
      queryParams: { mode: 'view' },
    });
  }
}
