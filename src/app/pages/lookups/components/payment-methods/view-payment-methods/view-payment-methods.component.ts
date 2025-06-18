import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, take, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { PaymentMethod } from '../../../store/payment-methods/payment-method.model';
import { PaymentMethodsFacade } from '../../../store/payment-methods/payment-methods.facade';

@Component({
  selector: 'app-view-payment-methods',
  standalone: false,
  templateUrl: './view-payment-methods.component.html',
  styleUrl: './view-payment-methods.component.scss',
})
export class ViewPaymentMethodsComponent {
  tableDataInside: PaymentMethod[] = [];
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
  selectedPaymentMethodId: number | null = null;
  originalPaymentMethod: PaymentMethod[] = [];
  filteredPaymentMethod: PaymentMethod[] = [];
  PaymentMethods$!: Observable<PaymentMethod[]>;

  constructor(private router: Router, private facade: PaymentMethodsFacade) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.PaymentMethods$ = this.facade.history$;
    console.log('🟢 before loadHistory, current store value:');
    this.PaymentMethods$.pipe(take(1)).subscribe((v) =>
      console.log('   store currently has:', v)
    );
    console.log('🟢 Calling loadHistory() to fetch PaymentMethods');
    this.facade.loadHistory();

    this.PaymentMethods$?.pipe(takeUntil(this.destroy$))?.subscribe(
      (payment) => {
        // products is now rentStructureType[], not any
        const sorted = [...payment].sort((a, b) => b?.id - a?.id);
        this.originalPaymentMethod = sorted;
        this.filteredPaymentMethod = [...sorted];
      }
    );
  }

  onAddPaymentMethod() {
    this.router.navigate(['/lookups/add-payment-methods']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeletePaymentMethod(PaymentMethodId: any): void {
    console.log(
      '[View] onDeletePaymentMethod() – opening modal for id=',
      PaymentMethodId
    );
    this.selectedIds = [PaymentMethodId];
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
    this.PaymentMethods$ = this.facade.all$;
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
    this.selectedPaymentMethodId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredPaymentMethod = this.originalPaymentMethod.filter(
      (PaymentMethods) =>
        Object.values(PaymentMethods).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditPaymentMethod(PaymentMethod: PaymentMethod) {
    this.router.navigate(['/lookups/edit-payment-methods', PaymentMethod.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewPaymentMethod(ct: PaymentMethod) {
    this.router.navigate(['/lookups/edit-payment-methods', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
