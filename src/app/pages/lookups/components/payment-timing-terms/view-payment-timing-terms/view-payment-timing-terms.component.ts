import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, take, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { PaymentTimingTerm } from '../../../store/payment-timing-terms/payment-timing-term.model';
import { PaymentTimingTermsFacade } from '../../../store/payment-timing-terms/payment-timing-terms..facade';

@Component({
  selector: 'app-view-payment-timing-terms',
  standalone: false,
  templateUrl: './view-payment-timing-terms.component.html',
  styleUrl: './view-payment-timing-terms.component.scss',
})
export class ViewPaymentTimingTermsComponent {
  tableDataInside: PaymentTimingTerm[] = [];
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
  selectedPaymentTimingTermId: number | null = null;
  originalPaymentTimingTerm: PaymentTimingTerm[] = [];
  filteredPaymentTimingTerm: PaymentTimingTerm[] = [];
  PaymentTimingTerms$!: Observable<PaymentTimingTerm[]>;

  constructor(private router: Router, private facade: PaymentTimingTermsFacade) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.PaymentTimingTerms$ = this.facade.all$;
    console.log('🟢 before loadAll, current store value:');
    this.PaymentTimingTerms$.pipe(take(1)).subscribe((v) =>
      console.log('   store currently has:', v)
    );
    console.log('🟢 Calling loadAll() to fetch PaymentTimingTerms');
    this.facade.loadAll();

    this.PaymentTimingTerms$?.pipe(takeUntil(this.destroy$))?.subscribe((payment) => {
      // products is now rentStructureType[], not any
      const activeCodes = payment.filter((code) => code.isActive);
      const sorted = [...activeCodes].sort((a, b) => b?.id - a?.id);
      this.originalPaymentTimingTerm = sorted;
      this.filteredPaymentTimingTerm = [...sorted];
    });
  }

  onAddPaymentTimingTerm() {
    this.router.navigate(['/lookups/add-payment-timing-terms']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeletePaymentTimingTerm(PaymentTimingTermId: any): void {
    console.log(
      '[View] onDeletePaymentTimingTerm() – opening modal for id=',
      PaymentTimingTermId
    );
    this.selectedPaymentTimingTermId = PaymentTimingTermId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedPaymentTimingTermId
    );
    if (this.selectedPaymentTimingTermId !== null) {
      this.facade.delete(this.selectedPaymentTimingTermId);
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
    this.selectedPaymentTimingTermId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredPaymentTimingTerm = this.originalPaymentTimingTerm.filter((PaymentTimingTerms) =>
      Object.values(PaymentTimingTerms).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditPaymentTimingTerm(PaymentTimingTerm: PaymentTimingTerm) {
    this.router.navigate(['/lookups/edit-payment-timing-terms', PaymentTimingTerm.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewPaymentTimingTerm(ct: PaymentTimingTerm) {
    this.router.navigate(['/lookups/edit-payment-timing-terms', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
