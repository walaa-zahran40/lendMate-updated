import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, take, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { PaymentType } from '../../store/payment-types/payment-type.model';
import { PaymentTypesFacade } from '../../store/payment-types/payment-types.facade';

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
  ];
  showDeleteModal: boolean = false;
  selectedPaymentTypeId: number | null = null;
  originalPaymentType: PaymentType[] = [];
  filteredPaymentType: PaymentType[] = [];
  PaymentTypes$!: Observable<PaymentType[]>;

  constructor(private router: Router, private facade: PaymentTypesFacade) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.PaymentTypes$ = this.facade.all$;
    console.log('🟢 before loadAll, current store value:');
    this.PaymentTypes$.pipe(take(1)).subscribe((v) =>
      console.log('   store currently has:', v)
    );
    console.log('🟢 Calling loadAll() to fetch PaymentTypes');
    this.facade.loadAll();

    this.PaymentTypes$?.pipe(takeUntil(this.destroy$))?.subscribe((payment) => {
      // products is now rentStructureType[], not any
      const activeCodes = payment.filter((code) => code.isActive);
      const sorted = [...activeCodes].sort((a, b) => b?.id - a?.id);
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
    this.selectedPaymentTypeId = PaymentTypeId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedPaymentTypeId
    );
    if (this.selectedPaymentTypeId !== null) {
      this.facade.delete(this.selectedPaymentTypeId);
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
