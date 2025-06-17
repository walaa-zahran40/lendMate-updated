import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  Subject,
  Observable,
  takeUntil,
  combineLatest,
  map,
  filter,
} from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { ProductsFacade } from '../../../store/products/products.facade';
import { Product } from '../../../store/products/product.model';
import { BusinessLine } from '../../../store/business-lines/business-line.model';
import { Store } from '@ngrx/store';
import { BusinessLinesFacade } from '../../../store/business-lines/business-lines.facade';

@Component({
  selector: 'app-view-products',
  standalone: false,
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.scss',
})
export class ViewProductsComponent {
  tableDataInside: Product[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'lisenceStartDate', header: 'Lisence Start Date' },
    { field: 'businessLineName', header: 'business Line' },
    { field: 'isActive', header: 'Is Active' },
  ];
  showDeleteModal: boolean = false;
  selectedProductId: number | null = null;
  originalProducts: Product[] = [];
  filteredProducts: Product[] = [];
  products$!: Observable<Product[]>;
  businessLinesList$!: Observable<BusinessLine[]>;

  constructor(
    private router: Router,
    private facade: ProductsFacade,
    private businessLineFacade: BusinessLinesFacade,
    private store: Store
  ) {}
  ngOnInit() {
    // 1️⃣ kick off loads
    this.facade.loadHistory();
    this.businessLineFacade.loadAll();

    // 2️⃣ pull raw streams
    const products$ = this.facade.history$;
    const businessLines$ = this.businessLineFacade.all$;

    // 3️⃣ combine, enrich, filter, sort, subscribe
    combineLatest([products$, businessLines$])
      .pipe(
        // wait until business lines arrive
        filter(([, bls]) => bls.length > 0),
        // attach businessLineName
        map(([prods, bls]) =>
          prods.map((p) => ({
            ...p,
            businessLineName:
              bls.find((b) => b.id === p.businessLineId)?.name ?? '—',
          }))
        ),
        // newest first
        map((list) => [...list].sort((a, b) => b.id - a.id)),
        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        this.originalProducts = enriched;
        this.filteredProducts = [...enriched];
      });
  }

  onAddProduct() {
    this.router.navigate(['/lookups/add-products']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteProduct(productId: any): void {
    console.log('[View] onDeleteProduct() – opening modal for id=', productId);
    this.selectedProductId = productId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedProductId
    );
    if (this.selectedProductId !== null) {
      this.facade.delete(this.selectedProductId);
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
    this.selectedProductId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredProducts = this.originalProducts.filter((product) =>
      Object.values(product).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditProduct(product: Product) {
    this.router.navigate(['/lookups/edit-products', product.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewProduct(ct: Product) {
    this.router.navigate(['/lookups/edit-products', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
