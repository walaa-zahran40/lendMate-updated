import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, take, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { PaymentType } from '../../../store/payment-types/payment-type.model';
import { PaymentTypesFacade } from '../../../store/payment-types/payment-types.facade';

@Component({
  selector: 'app-view-payment-types',
  standalone: false,
  templateUrl: './view-payment-types.component.html',
  styleUrl: './view-payment-types.component.scss',
})
export class ViewPaymentTypesComponent {
  tableDataInside: PaymentType[] = [];
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
  selectedPaymentTypeId: number | null = null;
  originalPaymentType: PaymentType[] = [];
  filteredPaymentType: PaymentType[] = [];
  PaymentTypes$!: Observable<PaymentType[]>;

  constructor(private router: Router, private facade: PaymentTypesFacade) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.PaymentTypes$ = this.facade.history$;
    console.log('🟢 before loadHistory, current store value:');
    this.PaymentTypes$.pipe(take(1)).subscribe((v) =>
      console.log('   store currently has:', v)
    );
    console.log('🟢 Calling loadHistory() to fetch PaymentTypes');
    this.facade.loadHistory();

    this.PaymentTypes$?.pipe(takeUntil(this.destroy$))?.subscribe((payment) => {
      // products is now rentStructureType[], not any
      const sorted = [...payment].sort((a, b) => b?.id - a?.id);
      this.originalPaymentType = sorted;
      this.filteredPaymentType = [...sorted];
    });
  }

  onAddPaymentType() {
    this.router.navigate(['/lookups/add-payment-types']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeletePaymentType(PaymentTypeId: any): void {
    console.log(
      '[View] onDeletePaymentType() – opening modal for id=',
      PaymentTypeId
    );
    this.selectedIds = [PaymentTypeId];
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
    this.PaymentTypes$ = this.facade.all$;
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
    this.selectedPaymentTypeId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredPaymentType = this.originalPaymentType.filter((PaymentTypes) =>
      Object.values(PaymentTypes).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditPaymentType(PaymentType: PaymentType) {
    this.router.navigate(['/lookups/edit-payment-types', PaymentType.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewPaymentType(ct: PaymentType) {
    this.router.navigate(['/lookups/edit-payment-types', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
