import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { PurchasingOrder } from '../../../store/purchasing-orders/purchasing-order.model';
import { PurchasingOrdersFacade } from '../../../store/purchasing-orders/purchasing-orders.facade';

@Component({
  selector: 'app-view-purchasing-orders',
  standalone: false,
  templateUrl: './view-purchasing-orders.component.html',
  styleUrl: './view-purchasing-orders.component.scss',
})
export class ViewPurchasingOrdersComponent {
  tableDataInside: PurchasingOrder[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
  ];

  showDeleteModal = false;
  selectedPurchasingOrderId: number | null = null;
  originalPurchasingOrders: PurchasingOrder[] = [];
  filteredPurchasingOrders: PurchasingOrder[] = [];
  purchasingOrders$!: Observable<PurchasingOrder[]>;

  constructor(private router: Router, private facade: PurchasingOrdersFacade) {}

  ngOnInit() {
    this.facade.loadAll();
    this.purchasingOrders$ = this.facade.all$;

    this.purchasingOrders$
      .pipe(takeUntil(this.destroy$))
      .subscribe((purchasingOrders) => {
        const activeCodes = purchasingOrders.filter((code) => code.isActive);
        const sorted = [...activeCodes].sort((a, b) => b.id - a.id);
        console.log('🟢 sorted purchasingOrders:', sorted);
        this.originalPurchasingOrders = sorted;
        this.filteredPurchasingOrders = [...sorted];
      });
  }

  onAddPurchasingOrder() {
    this.router.navigate(['/legals/add-legal-form-law']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeletePurchasingOrder(purchasingOrderId: number): void {
    console.log(
      '[View] onDeletePurchasingOrder() – opening modal for id=',
      purchasingOrderId
    );
    this.selectedIds = [purchasingOrderId];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedPurchasingOrderId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredPurchasingOrders = this.originalPurchasingOrders.filter(
      (purchasingOrder) =>
        Object.values(purchasingOrder).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditPurchasingOrder(purchasingOrder: PurchasingOrder) {
    this.router.navigate(['/legals/edit-legal-form-law', purchasingOrder.id], {
      queryParams: { mode: 'edit' },
    });
  }

  onViewPurchasingOrder(purchasingOrder: PurchasingOrder) {
    this.router.navigate(['/legals/edit-legal-form-law', purchasingOrder.id], {
      queryParams: { mode: 'view' },
    });
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
    this.purchasingOrders$ = this.facade.all$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
