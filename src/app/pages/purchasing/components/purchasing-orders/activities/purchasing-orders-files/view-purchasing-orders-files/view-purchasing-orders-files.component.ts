import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {
  Subject,
  Observable,
  takeUntil,
  forkJoin,
  map,
  combineLatest,
} from 'rxjs';
import { TableComponent } from '../../../../../../../shared/components/table/table.component';
import { PurchaseOrderFile } from '../../../../../store/purchasing-order-files/purchasing-order-file.model';
import { PurchasingOrderFilesFacade } from '../../../../../store/purchasing-order-files/purchasing-order-files.facade';
import { PurchasingOrdersFacade } from '../../../../../store/purchasing-orders/purchasing-orders.facade';
import { PurchaseOrder } from '../../../../../store/purchasing-orders/purchasing-order.model';

@Component({
  selector: 'app-view-purchasing-orders-files',
  standalone: false,
  templateUrl: './view-purchasing-orders-files.component.html',
  styleUrl: './view-purchasing-orders-files.component.scss',
})
export class ViewPurchasingOrderFilesComponent {
  tableDataInside: PurchaseOrderFile[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'expiryDate', header: 'File Expiry Date' },
    { field: 'number', header: 'PO Number' },
    // { field: 'isActive', header: 'Is Active' },
  ];

  showDeleteModal = false;
  selectedPurchasingOrderFileId: number | null = null;
  originalPurchasingOrderFiles: PurchaseOrderFile[] = [];
  filteredPurchasingOrderFiles: PurchaseOrderFile[] = [];
  purchasingOrderFiles$!: Observable<PurchaseOrderFile[]>;
  purchaseOrders$!: Observable<PurchaseOrder[]>;
  routeId = this.route.snapshot.params['id'];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private facade: PurchasingOrderFilesFacade,
    private facadePurchasingOrders: PurchasingOrdersFacade
  ) {}

  ngOnInit() {
    this.facade.loadAll();

    this.facadePurchasingOrders.loadAll();
    this.purchaseOrders$ = this.facadePurchasingOrders.all$.pipe(
      map((res: any) => (Array.isArray(res) ? res : res?.items ?? []))
    );
    this.purchasingOrderFiles$ = this.facade.all$;

    combineLatest([this.purchasingOrderFiles$, this.purchaseOrders$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([filesRes, orders]) => {
        const files: PurchaseOrderFile[] = Array.isArray(filesRes)
          ? filesRes
          : filesRes &&
            'items' in filesRes &&
            Array.isArray((filesRes as any).items)
          ? (filesRes as any).items
          : [];

        // Build a quick lookup map: id -> number
        const poNumberMap = new Map<number, string>(
          orders.map((o) => [o.id, o.number ?? `#${o.id}`])
        );

        // Enrich files with the correct PO number
        const enriched = files.map((f) => ({
          ...f,
          number: poNumberMap.get(f.purchaseOrderId) ?? `#${f.purchaseOrderId}`, // ← use purchaseOrderId
        }));
        // sort as you like
        const sorted = [...enriched].sort((a, b) => b.id - a.id);

        this.originalPurchasingOrderFiles = sorted;
        this.filteredPurchasingOrderFiles = [...sorted];
      });
  }

  onAddPurchasingOrderFile() {
    this.router.navigate([
      `/purchasing/purchasing-orders/activities/add-purchasing-orders-file/${this.routeId}`,
    ]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeletePurchasingOrderFile(purchasingOrderFileId: number): void {
    console.log(
      '[View] onDeletePurchasingOrderFile() – opening modal for id=',
      purchasingOrderFileId
    );
    this.selectedIds = [purchasingOrderFileId];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedPurchasingOrderFileId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredPurchasingOrderFiles =
      this.originalPurchasingOrderFiles.filter((purchasingOrderFile) =>
        Object.values(purchasingOrderFile).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
      );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditPurchasingOrderFile(purchasingOrderFile: PurchaseOrderFile) {
    this.router.navigate(
      [
        '/purchasing/purchasing-orders/edit-purchasing-order',
        purchasingOrderFile.id,
      ],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }

  onViewPurchasingOrderFile(purchasingOrderFile: PurchaseOrderFile) {
    this.router.navigate(
      [
        '/purchasing/purchasing-orders/edit-purchasing-order',
        purchasingOrderFile.id,
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
    this.purchasingOrderFiles$ = this.facade.all$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
