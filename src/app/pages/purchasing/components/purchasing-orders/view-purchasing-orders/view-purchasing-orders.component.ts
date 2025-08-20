import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { PurchaseOrder } from '../../../store/purchasing-orders/purchasing-order.model';
import { PurchasingOrdersFacade } from '../../../store/purchasing-orders/purchasing-orders.facade';

@Component({
  selector: 'app-view-purchasing-orders',
  standalone: false,
  templateUrl: './view-purchasing-orders.component.html',
  styleUrl: './view-purchasing-orders.component.scss',
})
export class ViewPurchasingOrdersComponent {
  tableDataInside: PurchaseOrder[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'number', header: 'Number' },
    { field: 'date', header: 'Date' },
    { field: 'isActive', header: 'is Active' },
  ];

  showDeleteModal = false;
  selectedPurchasingOrderId: number | null = null;
  originalPurchasingOrders: PurchaseOrder[] = [];
  filteredPurchasingOrders: PurchaseOrder[] = [];
  purchasingOrders$!: Observable<PurchaseOrder[]>;

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
    this.router.navigate([
      '/purchasing/purchasing-orders/add-purchasing-order',
    ]);
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
  onAddSide(event: any) {
    this.router.navigate([
      '/purchasing/purchasing-orders/wizard-purchasing-order',
      event,
    ]);
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

  onEditPurchasingOrder(purchasingOrder: PurchaseOrder) {
    this.router.navigate(
      [
        '/purchasing/purchasing-orders/edit-purchasing-order',
        purchasingOrder.id,
      ],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }

  onViewPurchasingOrder(purchasingOrder: PurchaseOrder) {
    this.router.navigate(
      [
        '/purchasing/purchasing-orders/edit-purchasing-order',
        purchasingOrder.id,
      ],
      {
        queryParams: { mode: 'view' },
      }
    );
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
