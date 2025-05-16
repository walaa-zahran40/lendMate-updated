import { Component, ViewChild } from '@angular/core';
import { Address } from '../../../../../../shared/interfaces/address.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, combineLatest } from 'rxjs';
import { TableComponent } from '../../../../../../shared/components/table/table.component';
import { ClientsAddressesFacade } from '../../../store/address/client-addresses.facade';

@Component({
  selector: 'app-view-address',
  standalone: false,
  templateUrl: './view-address.component.html',
  styleUrl: './view-address.component.scss',
})
export class ViewAddressComponent {
  @ViewChild('tableRef') tableRef!: TableComponent;
  addresses$ = this.facade.items$;
  private destroy$ = new Subject<void>();
  clientId!: number;
  originalAddresses: Address[] = [];
  filteredAddresses: Address[] = [];
  first2 = 0;
  showFilters = false;
  showDeleteModal: boolean = false;
  selectedAddressId: number | null = null;

  readonly colsInside = [
    { field: 'fileName', header: 'File Name' },
    { field: 'fileType', header: 'File Type' },
    { field: 'expiryDate', header: 'Expiry Date', pipe: 'date:"YYYY-MM-DD"' },
  ];
  // addressTypes: AddressType[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private facade: ClientsAddressesFacade
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.clientId = +params['id'];
        if (!this.clientId || this.clientId === 0) {
          console.error('Missing or invalid clientId in query params');
          return;
        }

        // ▶️ only load this client’s files
        this.facade.loadByClient(this.clientId);
      });

    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.clientId = +params['id'];
        if (!this.clientId || this.clientId === 0) {
          console.error('Missing or invalid clientId in query params');
          return;
        }

        this.facade.loadByClient(this.clientId);
      });
  }

  onAddAddress() {
    this.router.navigate(['/crm/clients/add-address', this.clientId]);
  }

  // ViewUploadAddressesComponent
  onDeleteAddress(addressId: any): void {
    this.selectedAddressId = addressId;
    this.showDeleteModal = true;
  }
  confirmDelete() {
    if (this.clientId !== null) {
      this.facade.delete(this.clientId);
    }
    this.resetDeleteModal();
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    this.showDeleteModal = false;
    this.selectedAddressId = null;
  }
  onEditAddress(doc: any) {
    this.router.navigate(['/crm/clients/edit-address', this.clientId, doc.id]);
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredAddresses = this.originalAddresses.filter((d) =>
      Object.values(d).some((v) => v?.toString().toLowerCase().includes(lower))
    );
  }

  onToggleFilters(val: boolean) {
    this.showFilters = val;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onAddSide(_addressId: any) {
    // re-open the client wizard, passing the clientId
    this.router.navigate([
      '/crm/clients/client-activity-wizard',
      this.clientId,
    ]);
  }
}
