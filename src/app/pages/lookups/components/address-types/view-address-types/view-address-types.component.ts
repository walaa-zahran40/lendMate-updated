import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, filter } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { AddressTypesFacade } from '../../../store/address-types/address-types.facade';
import { AddressType } from '../../../store/address-types/address-types.model';

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
  ];
  showDeleteModal: boolean = false;
  selectedAddressTypeId: number | null = null;
  originalAddressTypes: AddressType[] = [];
  filteredAddressTypes: AddressType[] = [];
  addressTypes$!: Observable<AddressType[]>;

  constructor(private router: Router, private facade: AddressTypesFacade) {}
  ngOnInit() {
    this.facade.loadAll();
    this.facade.operationSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter((op) => op?.entity === 'AddressType')
      )
      .subscribe(() => this.facade.loadAll());
    this.addressTypes$ = this.facade.all$;

    this.addressTypes$?.pipe(takeUntil(this.destroy$))?.subscribe((address) => {
      const activeCodes = address.filter((code) => code.isActive);
      const sorted = [...activeCodes].sort((a, b) => b?.id - a?.id);
      this.originalAddressTypes = sorted;
      this.filteredAddressTypes = [...sorted];
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
    this.selectedAddressTypeId = addressTypeId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedAddressTypeId
    );
    if (this.selectedAddressTypeId !== null) {
      this.facade.delete(this.selectedAddressTypeId);
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
}
