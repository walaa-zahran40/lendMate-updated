import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, filter, forkJoin, take } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { AddressTypesFacade } from '../../../store/address-types/address-types.facade';
import { AddressType } from '../../../store/address-types/address-type.model';

@Component({
  selector: 'app-view-address-types',
  standalone: false,
  templateUrl: './view-address-types.component.html',
  styleUrl: './view-address-types.component.scss',
})
export class ViewAddressTypesComponent {
  tableDataInside: AddressType[] = [];
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
  selectedAddressTypeId: number | null = null;
  originalAddressTypes: AddressType[] = [];
  filteredAddressTypes: AddressType[] = [];
  addressTypes$!: Observable<AddressType[]>;
  history: AddressType[] = [];

  constructor(private router: Router, private facade: AddressTypesFacade) {}
  ngOnInit() {
    // Load History
    this.facade.loadHistory();
    this.addressTypes$ = this.facade.addressTypeHistory$;

    // Optionally bind filtered list
    this.facade.addressTypeHistory$
      .pipe(filter((data) => !!data && data.length > 0))
      .subscribe((data) => {
        this.filteredAddressTypes = data;
      });
  }

  onAddAddressType() {
    this.router.navigate(['/lookups/add-address-types']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteAddressType(addressTypeId: any): void {
    console.log(
      '[View] onDeleteAddressType() – opening modal for id=',
      addressTypeId
    );
    this.selectedIds = [addressTypeId];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedAddressTypeId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredAddressTypes = this.originalAddressTypes.filter(
      (addressType) =>
        Object.values(addressType).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditAddressType(addressType: AddressType) {
    this.router.navigate(['/lookups/edit-address-types', addressType.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewAddressType(ct: AddressType) {
    this.router.navigate(['/lookups/edit-address-types', ct.id], {
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
    this.addressTypes$ = this.facade.all$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
