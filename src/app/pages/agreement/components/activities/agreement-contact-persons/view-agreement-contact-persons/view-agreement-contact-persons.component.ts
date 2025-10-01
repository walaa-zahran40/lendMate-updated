import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Subject,
  Observable,
  takeUntil,
  forkJoin,
  combineLatest,
  map,
} from 'rxjs';
import { TableComponent } from '../../../../../../shared/components/table/table.component';
import { LegalForm } from '../../../../../legals/store/legal-forms/legal-form.model';
import { LegalFormsFacade } from '../../../../../legals/store/legal-forms/legal-forms.facade';
import { Store } from '@ngrx/store';
import { ClientAddress } from '../../../../../crm/clients/store/client-addresses/client-address.model';
import { ClientAddressesFacade } from '../../../../../crm/clients/store/client-addresses/client-addresses.facade';
import { Area } from '../../../../../lookups/store/areas/area.model';
import { AreasFacade } from '../../../../../lookups/store/areas/areas.facade';
import { selectAllAreas } from '../../../../../lookups/store/areas/areas.selectors';

@Component({
  selector: 'app-view-agreement-contact-persons',
  standalone: false,
  templateUrl: './view-agreement-contact-persons.component.html',
  styleUrl: './view-agreement-contact-persons.component.scss',
})
export class ViewAgreementContactPersonsComponent {
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
    private areaFacade: AreasFacade,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    const raw = this.route.snapshot.paramMap.get('clientId');
    this.clientIdParam = raw !== null ? Number(raw) : undefined;

    this.areaFacade.loadAll();
    this.AreasList$ = this.store.select(selectAllAreas);
    this.store.dispatch({ type: '[Areas] Load All' });

    this.facade.loadClientAddressesByClientId(this.clientIdParam);
    this.clientAddresses$ = this.facade.items$;

    combineLatest([this.clientAddresses$, this.AreasList$])
      .pipe(
        map(([clientAddresses, AreasList]) =>
          clientAddresses
            .map((address) => ({
              ...address,
              AreaName:
                AreasList.find((c) => c.id === address.areaId)?.name || '—',
            }))
            .filter((address) => address.isActive)
            .sort((a, b) => b.id - a.id)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        this.originalClientAddresses = enriched;
        this.filteredClientAddresses = [...enriched];
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
