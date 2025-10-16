import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  Subject,
  Observable,
  combineLatest,
  filter,
  map,
  takeUntil,
  tap,
  forkJoin,
} from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { VendorAddress } from '../../../store/vendor-addresses/vendor-address.model';
import { VendorAddressesFacade } from '../../../store/vendor-addresses/vendor-addresses.facade';

@Component({
  selector: 'app-view-vendor-addresses',
  standalone: false,
  templateUrl: './view-vendor-addresses.component.html',
  styleUrl: './view-vendor-addresses.component.scss',
})
export class ViewVendorAddressesComponent {
  tableDataInside: VendorAddress[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'details', header: 'Details' },
    { field: 'detailsAR', header: 'Details AR' },
    { field: 'isMain', header: 'is Main' },
    { field: 'isActive', header: 'is Active' },
  ];
  showDeleteModal: boolean = false;
  selectedVendorAddressId: number | null = null;
  originalVendorAddress: VendorAddress[] = [];
  filteredVendorAddress: VendorAddress[] = [];
  VendorAddresses$!: Observable<VendorAddress[]>;

  constructor(private router: Router, private facade: VendorAddressesFacade) {}
  ngOnInit() {
    // 1) kick off both loads
    this.facade.loadHistory();

    // 2) pull the raw streams
    this.VendorAddresses$ = this.facade.history$;

    // 3) whenever either list changes, rebuild your display list
    combineLatest([this.VendorAddresses$])
      .pipe(
        // wait until the sectors are actually loaded
        map(([subs]) =>
          subs
            .map((ss) => ({
              ...ss,
            }))
            .sort((a, b) => b.id - a.id)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((list) => {
        this.originalVendorAddress = list;
        this.filteredVendorAddress = [...list];
      });

    // 4) after any create/update/delete, re-load
    this.facade.operationSuccess$
      .pipe(
        // only react to the VendorAddress entity
        filter((op) => op?.entity === 'VendorAddress'),
        // you could further narrow to op.operation === 'create' if you like
        tap(() => this.facade.loadHistory()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  onAddVendorAddress() {
    this.router.navigate(['/lookups/add-vendor-address']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteVendorAddress(VendorAddressId: any): void {
    console.log(
      '[View] onDeleteVendorAddress() – opening modal for id=',
      VendorAddressId
    );
    this.selectedIds = [VendorAddressId];
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
    this.VendorAddresses$ = this.facade.all$;
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
    this.selectedVendorAddressId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredVendorAddress = this.originalVendorAddress.filter(
      (VendorAddresses) =>
        Object.values(VendorAddresses).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditVendorAddress(VendorAddress: VendorAddress) {
    this.router.navigate(['/lookups/edit-vendor-address', VendorAddress.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewVendorAddress(ct: VendorAddress) {
    this.router.navigate(['/lookups/edit-vendor-address', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
