import { Component, ViewChild } from '@angular/core';
import {
  combineLatest,
  filter,
  forkJoin,
  map,
  Observable,
  of,
  Subject,
  takeUntil,
} from 'rxjs';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { FeeType } from '../../../store/fee-types/fee-type.model';
import { FeeTypesFacade } from '../../../store/fee-types/fee-types.facade';
import { FeeCalculationTypesFacade } from '../../../store/fee-calculation-types/fee-calculation-types.facade';

@Component({
  selector: 'app-view-fee-types',
  standalone: false,
  templateUrl: './view-fee-types.component.html',
  styleUrl: './view-fee-types.component.scss',
})
export class ViewFeeTypesComponent {
  tableDataInside: FeeType[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'code', header: 'Code' },
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'description', header: 'Description' },
    { field: 'descriptionAR', header: 'Description AR' },
    { field: 'feeCalculationType', header: 'Fee Calculation Type' },
    { field: 'defaultPercentage', header: 'Default Percentage' },
    { field: 'defaultAmount', header: 'Default Amount' },
    { field: 'isActive', header: 'Is Active' },
  ];

  showDeleteModal = false;
  selectedFeeTypeId: number | null = null;
  originalFeeTypes: FeeType[] = [];
  filteredFeeTypes: FeeType[] = [];
  feeTypes$!: any;
  feeCalcList$: any;
  constructor(
    private router: Router,
    private facade: FeeTypesFacade,
    private feecalcFacade: FeeCalculationTypesFacade
  ) {}

  ngOnInit() {
    // Initialize observables
    this.feeTypes$ = this.facade.history$;
    this.feeCalcList$ = this.feecalcFacade.all$;

    // Trigger loading
    this.facade.loadHistory();
    this.feecalcFacade.loadAll();

    // Combine fee types with their corresponding calculation type names
    combineLatest<[FeeType[], any[]]>([
      this.feeTypes$ ?? of([]),
      this.feeCalcList$ ?? of([]),
    ])
      .pipe(
        map(([feeTypes, feeCalcTypes]) => {
          console.log('📦 Raw feeTypes:', feeTypes);
          console.log('📦 Raw feeCalcTypes:', feeCalcTypes);

          return feeTypes
            .map((ss) => {
              console.log('ss', ss);
              const match = feeCalcTypes.find(
                (s) => s.id === ss.feeCalculationTypeId
              );

              console.log(
                `🔍 Matching calc type for feeType ID ${ss.id} (feeCalculationTypeId: ${ss.feeCalculationTypeId}):`,
                match
              );

              return {
                ...ss,
                feeCalculationType:
                  feeCalcTypes.find((s) => s.id === ss.feeCalculationTypeId)
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
        this.filteredFeeTypes = result;
        this.originalFeeTypes = result;
      });
  }

  onAddFeeType() {
    this.router.navigate(['/lookups/add-fee-types']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteFeeType(feeTypesId: number): void {
    this.selectedIds = [feeTypesId];
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
    this.feeTypes$ = this.facade.all$;
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
    this.showDeleteModal = false;
    this.selectedFeeTypeId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredFeeTypes = this.originalFeeTypes.filter((feeTypes) =>
      Object.values(feeTypes).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditFeeType(feeTypes: FeeType) {
    this.router.navigate(['/lookups/edit-fee-types', feeTypes.id], {
      queryParams: { mode: 'edit' },
    });
  }

  onViewFeeType(feeTypes: FeeType) {
    this.router.navigate(['/lookups/edit-fee-types', feeTypes.id], {
      queryParams: { mode: 'view' },
    });
  }
}
