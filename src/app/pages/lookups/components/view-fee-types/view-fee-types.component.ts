import { Component, ViewChild } from '@angular/core';
import { combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { FeeType } from '../../store/fee-types/fee-type.model';
import { FeeTypesFacade } from '../../store/fee-types/fee-types.facade';

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
    { field: 'defaultPrecentage', header: 'defaultPrecentage' },
    { field: 'defaultAmount', header: 'defaultAmount' },
  ];

  showDeleteModal = false;
  selectedFeeTypeId: number | null = null;
  originalFeeTypes: FeeType[] = [];
  filteredFeeTypes: FeeType[] = [];
  feeTypes$!: Observable<FeeType[]>;

  constructor(private router: Router, private facade: FeeTypesFacade) {}

  ngOnInit() {
    this.facade.loadAll();
    this.feeTypes$ = this.facade.all$;
    this.feeTypes$.pipe(takeUntil(this.destroy$)).subscribe((feeTypes) => {
      const sorted = [...feeTypes].sort((a, b) => b.id - a.id);
      this.originalFeeTypes = sorted;
      this.filteredFeeTypes = [...sorted];
    });

    combineLatest([this.feeTypes$])
      .pipe(
        map(([feeTypes]) => {
          const mapped = feeTypes.map((ss) => {
            const feeCalculationType = ss.feeCalculationType?.name || '—';

            return {
              ...ss,
              feeCalculationType: feeCalculationType, // or call it `categoryName` if more accurate
            };
          });

          const sorted = mapped.sort((a, b) => b.id - a.id);
          return sorted;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (normalizedFeeTypes) => {
          console.log(
            '🟢 Final normalizedFeeTypes emitted to view:',
            normalizedFeeTypes
          );
          this.filteredFeeTypes = normalizedFeeTypes;
          this.originalFeeTypes = normalizedFeeTypes;
        },
        (error) => {
          console.error('❌ Error in combineLatest subscription:', error);
        }
      );
  }

  onAddFeeType() {
    this.router.navigate(['/lookups/add-fee-types']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteFeeType(feeTypesId: number): void {
    this.selectedFeeTypeId = feeTypesId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.selectedFeeTypeId !== null) {
      this.facade.delete(this.selectedFeeTypeId);
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
