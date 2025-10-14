import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Subject,
  Observable,
  combineLatest,
  of,
  map,
  takeUntil,
  forkJoin,
} from 'rxjs';
import { TableComponent } from '../../../../../../../../../shared/components/table/table.component';
import { ClientIdentitiesFacade } from '../../../../../../store/client-identities/client-identities.facade';
import { ClientIdentity } from '../../../../../../store/client-identities/client-identity.model';
import { IdentificationTypesFacade } from '../../../../../../../../lookups/store/identification-types/identification-types.facade';
import { IdentificationType } from '../../../../../../../../lookups/store/identification-types/identification-type.model';
import { ClientIdentitiesListData } from '../../../../../../../resolvers/client-identities-list.resolver';

@Component({
  selector: 'app-view-client-identity',
  standalone: false,
  templateUrl: './view-client-identity.component.html',
  styleUrl: './view-client-identity.component.scss',
})
export class ViewClientIdentityComponent implements OnInit, OnDestroy {
  tableDataInside: ClientIdentity[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();
  clientIdParam!: any;

  @ViewChild('tableRef') tableRef!: TableComponent;
  selectedIds: number[] = [];

  readonly colsInside = [
    { field: 'identificationTypeName', header: 'Identification Type' },
    { field: 'identificationNumber', header: 'Identification Number' },
    { field: 'isMain', header: 'Is Main' },
  ];

  showDeleteModal = false;
  selectedClientIdentityId: number | null = null;
  originalClientIdentities: ClientIdentity[] = [];
  filteredClientIdentities: ClientIdentity[] = [];

  clientIdentities$!: Observable<ClientIdentity[]>;
  identificationTypes$!: Observable<IdentificationType[]>;

  constructor(
    private router: Router,
    private facade: ClientIdentitiesFacade,
    private identificationTypesFacade: IdentificationTypesFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const data = this.route.snapshot.data[
      'list'
    ] as ClientIdentitiesListData | null;

    // Fallback: if resolver didn't run or returned null, still grab the param
    const raw = this.route.snapshot.paramMap.get('clientId');
    const fallbackClientId = raw !== null ? Number(raw) : undefined;

    this.clientIdParam = data?.clientId ?? fallbackClientId;
    console.log('[ViewIdentity] clientIdParam =', this.clientIdParam);

    // Build first paint from resolver if available
    const items = data?.items ?? [];
    const types = data?.identificationTypes ?? [];
    console.log('[ViewIdentity] resolver items:', items);
    console.log('[ViewIdentity] resolver types:', types);

    const idToName = new Map(types.map((t) => [t.id, t.name]));
    const firstRender = items
      .map((it) => ({
        ...it,
        identificationTypeName: idToName.get(it.identificationTypeId) ?? '—',
      }))
      // TEMP: don't filter by isActive to confirm data flow
      // .filter((it) => it.isActive)
      .sort((a, b) => (b.id ?? 0) - (a.id ?? 0));

    console.log(
      '[ViewIdentity] firstRender count =',
      firstRender.length,
      firstRender
    );
    this.originalClientIdentities = firstRender;
    this.filteredClientIdentities = [...firstRender];

    // Keep reacting to store after create/update/delete
    if (this.clientIdParam != null && !Number.isNaN(this.clientIdParam)) {
      this.facade.loadByClientId(this.clientIdParam);
    } else {
      console.warn(
        '[ViewIdentity] Missing/invalid clientIdParam; skipping loadByClientId'
      );
    }

    this.clientIdentities$ = this.facade.items$;

    combineLatest([this.clientIdentities$, of(types)])
      .pipe(
        map(([itemsFromStore, typesList]) => {
          console.log('[ViewIdentity] store items:', itemsFromStore);
          const idToName2 = new Map(typesList.map((t) => [t.id, t.name]));
          const enriched = (itemsFromStore ?? [])
            // TEMP: if API returns clientId as string, normalize both sides
            .filter((it) => Number(it.clientId) === Number(this.clientIdParam))
            .map((it) => ({
              ...it,
              identificationTypeName:
                idToName2.get(it.identificationTypeId) ?? '—',
            }))
            // TEMP: comment out isActive filter to validate data path
            // .filter((it) => it.isActive)
            .sort((a, b) => (b.id ?? 0) - (a.id ?? 0));

          console.log(
            '[ViewIdentity] enriched count =',
            enriched.length,
            enriched
          );
          return enriched;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        this.originalClientIdentities = enriched;
        this.filteredClientIdentities = [...enriched];
      });
  }

  onAddClientIdentity() {
    console.log('edioyt', this.clientIdParam);
    const routeId = this.route.snapshot.paramMap.get('clientId');
    this.router.navigate(['crm/clients/add-client-identity', routeId], {
      queryParams: {
        mode: 'add',
        clientId: this.clientIdParam, // <-- use "clientId" here
      },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteClientIdentity(payload: number | ClientIdentity) {
    const id = typeof payload === 'number' ? payload : payload?.id;
    if (!id) return;
    this.selectedIds = [id];
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (!this.selectedIds.length) return;
    const clientId = this.clientIdParam;

    this.selectedIds.forEach((id) => this.facade.delete(id, clientId));
    this.showDeleteModal = false;
    this.selectedIds = [];
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    this.showDeleteModal = false;
    this.selectedClientIdentityId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredClientIdentities = this.originalClientIdentities.filter(
      (clientSales) =>
        Object.values(clientSales).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditClientIdentity(clientSales: ClientIdentity) {
    console.log('edioyt', this.clientIdParam);
    this.router.navigate(['crm/clients/edit-client-identity', clientSales.id], {
      queryParams: {
        mode: 'edit',
        clientId: this.clientIdParam, // <-- use "clientId" here
      },
    });
  }

  onViewClientIdentity(clientSales: ClientIdentity) {
    this.router.navigate(['crm/clients/edit-client-identity', clientSales.id], {
      queryParams: {
        mode: 'view',
        clientId: this.clientIdParam, // <-- and here
      },
    });
  }

  refreshCalls() {
    this.facade.loadAll();
    this.clientIdentities$ = this.facade.items$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
