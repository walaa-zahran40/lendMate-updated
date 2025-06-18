import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, take, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { PaymentTimingTerm } from '../../../store/payment-timing-terms/payment-timing-term.model';
import { PaymentTimingTermsFacade } from '../../../store/payment-timing-terms/payment-timing-terms.facade';

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
    { field: 'isActive', header: 'Is Active' },
  ];
  showDeleteModal: boolean = false;
  selectedPaymentTimingTermId: number | null = null;
  originalPaymentTimingTerm: PaymentTimingTerm[] = [];
  filteredPaymentTimingTerm: PaymentTimingTerm[] = [];
  PaymentTimingTerms$!: Observable<PaymentTimingTerm[]>;

  constructor(
    private router: Router,
    private facade: PaymentTimingTermsFacade
  ) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.PaymentTimingTerms$ = this.facade.history$;
    console.log('🟢 before loadHistory, current store value:');
    this.PaymentTimingTerms$.pipe(take(1)).subscribe((v) =>
      console.log('   store currently has:', v)
    );
    console.log('🟢 Calling loadHistory() to fetch PaymentTimingTerms');
    this.facade.loadHistory();

    this.PaymentTimingTerms$?.pipe(takeUntil(this.destroy$))?.subscribe(
      (payment) => {
        // products is now payment[], not any
        const sorted = [...payment].sort((a, b) => b?.id - a?.id);
        this.originalPaymentTimingTerm = sorted;
        this.filteredPaymentTimingTerm = [...sorted];
      }
    );
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
    this.selectedIds = [PaymentTimingTermId];
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
    this.PaymentTimingTerms$ = this.facade.all$;
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
    this.selectedPaymentTimingTermId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredPaymentTimingTerm = this.originalPaymentTimingTerm.filter(
      (PaymentTimingTerms) =>
        Object.values(PaymentTimingTerms).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditPaymentTimingTerm(PaymentTimingTerm: PaymentTimingTerm) {
    this.router.navigate(
      ['/lookups/edit-payment-timing-terms', PaymentTimingTerm.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }
  onViewPaymentTimingTerm(ct: PaymentTimingTerm) {
    this.router.navigate(['/lookups/edit-payment-timing-terms', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
