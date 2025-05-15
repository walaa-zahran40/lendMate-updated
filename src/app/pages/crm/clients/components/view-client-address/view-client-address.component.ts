import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, takeUntil, tap, map } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { ClientAddressesFacade } from '../../store/client-addresses/client-addresses.facade';
import { ClientAddress } from '../../store/client-addresses/client-address.model';

@Component({
  selector: 'app-view-client-addresses',
  standalone: false,
  templateUrl: './view-client-addresses.component.html',
  styleUrl: './view-client-addresses.component.scss',
})
export class ViewClientAddressesComponent {
  tableDataInside: ClientAddress[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  clientIdParam!: any;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'details', header: 'Details' },
    { field: 'detailsAR', header: 'Details AR' },
    { field: 'client', header: 'Client' },
  ];
  showDeleteModal: boolean = false;
  selectedClientAddressId: number | null = null;
  originalClientAddresses: ClientAddress[] = [];
  filteredClientAddresses: ClientAddress[] = [];
  clientAddresses$!: Observable<ClientAddress[]>;

  constructor(
    private router: Router,
    private facade: ClientAddressesFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const raw = this.route.snapshot.paramMap.get('clientId');
    this.clientIdParam = raw !== null ? Number(raw) : undefined;
    this.facade.loadClientAddressesByClientId(this.clientIdParam);
    this.clientAddresses$ = this.facade.items$;

    this.clientAddresses$
      .pipe(
        takeUntil(this.destroy$),

        // log raw array coming from the facade
        tap((rawList) =>
          console.log('[View] facade.items$ rawList =', rawList)
        ),

        // your transform
        map((list) =>
          (list ?? [])
            .map((r) => ({ ...r, client: r.client?.name || '—' }))
            .sort((a, b) => b.id - a.id)
        ),

        // log after mapping + sorting
        tap((formatted) =>
          console.log('[View] after map+sort formatted =', formatted)
        )
      )
      .subscribe((formatted) => {
        this.filteredClientAddresses = formatted;
        this.originalClientAddresses = formatted;
        console.log(
          '[View] subscribe → filteredCurrencyExchangeRates =',
          this.filteredClientAddresses
        );
      });
  }

  onAddClientAddress() {
    const clientIdParam = this.route.snapshot.paramMap.get('clientId');

    this.router.navigate(['/crm/clients/add-client-addresses'], {
      queryParams: { mode: 'add', clientId: clientIdParam },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteClientAddress(clientAddressId: any): void {
    console.log(
      '[View] onDeleteClientAddress() – opening modal for id=',
      clientAddressId
    );
    this.selectedClientAddressId = clientAddressId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedClientAddressId
    );
    if (this.selectedClientAddressId !== null) {
      this.facade.delete(this.selectedClientAddressId, this.clientIdParam);
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
    this.selectedClientAddressId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredClientAddresses = this.originalClientAddresses.filter(
      (clientAddress) =>
        Object.values(clientAddress).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditClientAddress(clientAddress: ClientAddress) {
    this.router.navigate(
      ['/crm/clients/edit-client-addresses', clientAddress.id],
      {
        queryParams: {
          mode: 'edit',
          clientId: this.clientIdParam, // <-- use "currencyId" here
        },
      }
    );
  }
  onViewClientAddress(ct: ClientAddress) {
    this.router.navigate(['/crm/clients/edit-client-addresses', ct.id], {
      queryParams: {
        mode: 'view',
        clientId: this.clientIdParam, // <-- use "currencyId" here
      },
    });
  }
}

