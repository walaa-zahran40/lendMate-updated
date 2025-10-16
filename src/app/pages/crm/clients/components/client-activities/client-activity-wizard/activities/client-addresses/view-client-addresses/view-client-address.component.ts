import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Observable, forkJoin, of, map } from 'rxjs';
import { TableComponent } from '../../../../../../../../../shared/components/table/table.component';
import { Area } from '../../../../../../../../lookups/store/areas/area.model';
import { ClientAddress } from '../../../../../../store/client-addresses/client-address.model';
import { ClientAddressesFacade } from '../../../../../../store/client-addresses/client-addresses.facade';
import { ClientAddressesListData } from '../../../../../../resolvers/client-addresses-list.resolver';

@Component({
  selector: 'app-view-client-address',
  standalone: false,
  templateUrl: './view-client-address.component.html',
  styleUrl: './view-client-address.component.scss',
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
    { field: 'AreaName', header: 'Area Name' },
  ];
  showDeleteModal: boolean = false;
  selectedClientAddressId: number | null = null;
  originalClientAddresses: ClientAddress[] = [];
  filteredClientAddresses: ClientAddress[] = [];
  clientAddresses$!: Observable<ClientAddress[]>;
  AreasList$!: Observable<Area[]>;

  constructor(
    private router: Router,
    private facade: ClientAddressesFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const data = this.route.snapshot.data[
      'list'
    ] as ClientAddressesListData | null;
    if (!data) return;

    this.clientIdParam = data.clientId;

    // one-time lookup map
    const idToArea = new Map(data.areas.map((a) => [a.id, a.name]));

    // 1) seed initial rows from resolver (fast paint)
    const initial = (data.addresses ?? [])
      .map((a) => ({ ...a, AreaName: idToArea.get(a.areaId) ?? '—' }))
      .sort((a, b) => b.id - a.id);
    this.originalClientAddresses = initial;
    this.filteredClientAddresses = [...initial];

    // 2) subscribe to store for live updates after create/update/delete
    this.facade.loadClientAddressesByClientId(this.clientIdParam); // idempotent
    this.facade.items$
      .pipe(
        // if you have a selector by clientId, use that instead
        map((list) => list.filter((a) => a.clientId === this.clientIdParam)),
        map((list) =>
          list
            .map((a) => ({ ...a, AreaName: idToArea.get(a.areaId) ?? '—' }))
            .filter((a) => a.isActive)
            .sort((a, b) => b.id - a.id)
        )
      )
      .subscribe((enriched) => {
        this.originalClientAddresses = enriched;
        this.filteredClientAddresses = [...enriched];
      });
  }

  onAddClientAddress() {
    const clientIdParam = this.route.snapshot.paramMap.get('clientId');
    this.router.navigate(['/crm/clients/add-client-addresses', clientIdParam], {
      queryParams: { mode: 'add' },
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
    this.selectedIds = [clientAddressId];
    this.showDeleteModal = true;
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
          clientId: this.clientIdParam,
        },
      }
    );
  }
  onViewClientAddress(ct: ClientAddress) {
    this.router.navigate(['/crm/clients/edit-client-addresses', ct.id], {
      queryParams: {
        mode: 'view',
        clientId: this.clientIdParam,
      },
    });
  }
  selectedIds: number[] = [];
  confirmDelete() {
    const deleteCalls = this.selectedIds.map((id) =>
      this.facade.delete(id, this.clientIdParam)
    );

    forkJoin(deleteCalls).subscribe({
      next: () => {
        this.selectedIds = [];
        this.showDeleteModal = false;
        this.refreshCalls();
      },
      error: (err) => {
        this.showDeleteModal = false;
      },
    });
  }

  refreshCalls() {
    this.facade.loadAll();
    this.clientAddresses$ = this.facade.items$;
  }
  onBulkDelete(ids: number[]) {
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
