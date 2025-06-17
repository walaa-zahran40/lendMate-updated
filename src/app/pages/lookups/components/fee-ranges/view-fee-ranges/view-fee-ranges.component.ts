import { Component, ViewChild } from '@angular/core';
import { combineLatest, map, of, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { FeeRange } from '../../../store/fee-ranges/fee-range.model';
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
    { field: 'feeTypeName', header: 'Fee Type' },
    { field: 'lowerBound', header: 'Lower Bound' },
    { field: 'upperBound', header: 'Upper Bound' },
    { field: 'criteriaField', header: 'Criteria Field' },
    { field: 'defaultPrecentage', header: 'Default Percentage' },
    { field: 'defaultAmount', header: 'Default Amount' },
    { field: 'isActive', header: 'Is Active' },
  ];

  showDeleteModal = false;
  selectedFeeRangeId: number | null = null;
  originalFeeRanges: FeeRange[] = [];
  filteredFeeRanges: FeeRange[] = [];
  feeRanges$!: any;
  feeTypes$: any;
  constructor(
    private router: Router,
    private facade: FeeRangesFacade,
    private feeTypesFacade: FeeTypesFacade
  ) {}

  //feeTypeId
  ngOnInit() {
    // Initialize observables

    // Trigger loading
    this.facade.loadHistory();
    this.feeTypesFacade.loadAll();

    this.feeRanges$ = this.facade.history$;
    this.feeTypes$ = this.feeTypesFacade.all$;

    // Combine fee types with their corresponding Typesulation type names
    combineLatest<[FeeRange[], any[]]>([
      this.feeRanges$ ?? of([]),
      this.feeTypes$ ?? of([]),
    ])
      .pipe(
        map(([feeRanges, feeTypes]) => {
          console.log('📦 Raw feeRanges:', feeRanges);
          console.log('📦 Raw feeTypes:', feeTypes);

          return (
            feeRanges
              .map((ss) => {
                console.log('ss', ss);
                const match = feeTypes.find((s) => s.id === ss.feeTypeId);

                console.log(
                  `🔍 Matching Types type for feeRange ID ${ss.id} (feeTypeNameId: ${ss.feeTypeId}):`,
                  match
                );

                return {
                  ...ss,
                  feeTypeName:
                    feeTypes.find((s) => s.id === ss.feeTypeId)?.name || '—',
                };
              })
              // .filter((ft) => ft.isActive)
              .sort((a, b) => b.id - a.id)
          );
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
