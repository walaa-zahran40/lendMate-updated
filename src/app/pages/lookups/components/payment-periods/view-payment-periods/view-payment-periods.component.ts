import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, take, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { PaymentPeriod } from '../../../store/payment-periods/payment-period.model';
import { PaymentPeriodsFacade } from '../../../store/payment-periods/payment-periods.facade';

@Component({
  selector: 'app-view-payment-periods',
  standalone: false,
  templateUrl: './view-payment-periods.component.html',
  styleUrl: './view-payment-periods.component.scss',
})
export class ViewPaymentPeriodsComponent {
  tableDataInside: PaymentPeriod[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'monthCount', header: 'Month Count' },
    { field: 'isActive', header: 'Is Active' },
  ];
  showDeleteModal: boolean = false;
  selectedPaymentPeriodId: number | null = null;
  originalPaymentPeriod: PaymentPeriod[] = [];
  filteredPaymentPeriod: PaymentPeriod[] = [];
  PaymentPeriods$!: Observable<PaymentPeriod[]>;

  constructor(private router: Router, private facade: PaymentPeriodsFacade) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.PaymentPeriods$ = this.facade.history$;
    console.log('🟢 before loadHistory, current store value:');
    this.PaymentPeriods$.pipe(take(1)).subscribe((v) =>
      console.log('   store currently has:', v)
    );
    console.log('🟢 Calling loadHistory() to fetch PaymentPeriods');
    this.facade.loadHistory();

    this.PaymentPeriods$?.pipe(takeUntil(this.destroy$))?.subscribe(
      (payment) => {
        // products is now payment[], not any
        const sorted = [...payment].sort((a, b) => b?.id - a?.id);
        this.originalPaymentPeriod = sorted;
        this.filteredPaymentPeriod = [...sorted];
      }
    );
  }

  onAddPaymentPeriod() {
    this.router.navigate(['/lookups/add-payment-periods']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeletePaymentPeriod(PaymentPeriodId: any): void {
    console.log(
      '[View] onDeletePaymentPeriod() – opening modal for id=',
      PaymentPeriodId
    );
    this.selectedPaymentPeriodId = PaymentPeriodId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedPaymentPeriodId
    );
    if (this.selectedPaymentPeriodId !== null) {
      this.facade.delete(this.selectedPaymentPeriodId);
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
    this.selectedPaymentPeriodId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredPaymentPeriod = this.originalPaymentPeriod.filter(
      (PaymentPeriods) =>
        Object.values(PaymentPeriods).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditPaymentPeriod(PaymentPeriod: PaymentPeriod) {
    this.router.navigate(['/lookups/edit-payment-periods', PaymentPeriod.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewPaymentPeriod(ct: PaymentPeriod) {
    this.router.navigate(['/lookups/edit-payment-periods', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
