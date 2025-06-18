import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, take, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { PaymentMonthDay } from '../../../store/payment-month-days/payment-month-day.model';
import { PaymentMonthDaysFacade } from '../../../store/payment-month-days/payment-month-days.facade';

@Component({
  selector: 'app-view-payment-month-days',
  standalone: false,
  templateUrl: './view-payment-month-days.component.html',
  styleUrl: './view-payment-month-days.component.scss',
})
export class ViewPaymentMonthDaysComponent {
  tableDataInside: PaymentMonthDay[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'value', header: 'Value' },
    { field: 'isActive', header: 'Is Active' },
  ];
  showDeleteModal: boolean = false;
  selectedPaymentMonthDayId: number | null = null;
  originalPaymentMonthDay: PaymentMonthDay[] = [];
  filteredPaymentMonthDay: PaymentMonthDay[] = [];
  PaymentMonthDays$!: Observable<PaymentMonthDay[]>;

  constructor(private router: Router, private facade: PaymentMonthDaysFacade) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.PaymentMonthDays$ = this.facade.history$;
    console.log('🟢 before loadHistory, current store value:');
    this.PaymentMonthDays$.pipe(take(1)).subscribe((v) =>
      console.log('   store currently has:', v)
    );
    console.log('🟢 Calling loadHistory() to fetch PaymentMonthDays');
    this.facade.loadHistory();

    this.PaymentMonthDays$?.pipe(takeUntil(this.destroy$))?.subscribe(
      (payment) => {
        // products is now rentStructureType[], not any
        const sorted = [...payment].sort((a, b) => b?.id - a?.id);
        this.originalPaymentMonthDay = sorted;
        this.filteredPaymentMonthDay = [...sorted];
      }
    );
  }

  onAddPaymentMonthDay() {
    this.router.navigate(['/lookups/add-payment-month-day']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeletePaymentMonthDay(PaymentMonthDayId: any): void {
    console.log(
      '[View] onDeletePaymentMonthDay() – opening modal for id=',
      PaymentMonthDayId
    );
    this.selectedIds = [PaymentMonthDayId];
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
    this.PaymentMonthDays$ = this.facade.all$;
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
    this.selectedPaymentMonthDayId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredPaymentMonthDay = this.originalPaymentMonthDay.filter(
      (PaymentMonthDays) =>
        Object.values(PaymentMonthDays).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditPaymentMonthDay(PaymentMonthDay: PaymentMonthDay) {
    this.router.navigate(
      ['/lookups/edit-payment-month-day', PaymentMonthDay.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }
  onViewPaymentMonthDay(ct: PaymentMonthDay) {
    this.router.navigate(['/lookups/edit-payment-month-day', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
