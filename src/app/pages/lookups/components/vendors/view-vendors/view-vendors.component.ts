import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Subject,
  Observable,
  combineLatest,
  filter,
  map,
  takeUntil,
  forkJoin,
} from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Vendor } from '../../../store/vendors/vendor.model';
import { VendorsFacade } from '../../../store/vendors/vendors.facade';

@Component({
  selector: 'app-view-vendors',
  standalone: false,
  templateUrl: './view-vendors.component.html',
  styleUrl: './view-vendors.component.scss',
})
export class ViewVendorsComponent {
  tableDataInside: Vendor[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'taxNumber', header: 'Tax Number' },
    { field: 'isActive', header: 'Is Active' },
  ];
  showDeleteModal: boolean = false;
  selectedVendorId: number | null = null;
  originalVendors: Vendor[] = [];
  filteredVendors: Vendor[] = [];
  vendors$!: Observable<Vendor[]>;

  constructor(
    private router: Router,
    private facade: VendorsFacade,
    private store: Store
  ) {}
  ngOnInit() {
    // 1️⃣ kick off loads
    this.facade.loadAll();

    // 2️⃣ pull raw streams
    const vendors$ = this.facade.all$;

    // 3️⃣ combine, enrich, filter, sort, subscribe
    combineLatest([vendors$])
      .pipe(
        // attach businessLineName
        map(([prods]) =>
          prods.map((p) => ({
            ...p,
          }))
        ),
        // newest first
        map((list) => [...list].sort((a, b) => b.id - a.id)),
        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        this.originalVendors = enriched;
        this.filteredVendors = [...enriched];
      });
  }

  onAddVendor() {
    this.router.navigate(['/lookups/add-vendor']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteVendor(vendorId: any): void {
    console.log('[View] onDeleteVendor() – opening modal for id=', vendorId);
    this.selectedIds = [vendorId];
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
    this.vendors$ = this.facade.all$;
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
    this.selectedVendorId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredVendors = this.originalVendors.filter((vendor) =>
      Object.values(vendor).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditVendor(vendor: Vendor) {
    this.router.navigate(['/lookups/edit-vendor', vendor.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewVendor(ct: Vendor) {
    this.router.navigate(['/lookups/edit-vendor', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
