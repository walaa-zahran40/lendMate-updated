import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Observable, combineLatest, of, map, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../../../../../../shared/components/table/table.component';
import { ClientIdentitiesFacade } from '../../../../../../store/client-identities/client-identities.facade';
import { ClientIdentity } from '../../../../../../store/client-identities/client-identity.model';
import { IdentificationTypesFacade } from '../../../../../../../../lookups/store/identification-types/identification-types.facade';
import { IdentificationType } from '../../../../../../../../lookups/store/identification-types/identification-type.model';

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
    // 1) grab the param
    const raw = this.route.snapshot.paramMap.get('clientId');
    this.clientIdParam = raw !== null ? Number(raw) : undefined;
    console.log('[View] ngOnInit → clientIdParam =', this.clientIdParam);

    this.facade.loadByClientId(this.clientIdParam);
    this.clientIdentities$ = this.facade.items$;

    this.identificationTypesFacade.loadAll();
    this.identificationTypes$ = this.identificationTypesFacade.all$;

    if (this.clientIdParam == null || isNaN(this.clientIdParam)) {
      console.error(
        '❌ Missing or invalid clientIdParam! Cannot load exchange rates.'
      );
      return;
    }

    combineLatest([
      this.clientIdentities$ ?? of([]),
      this.identificationTypes$ ?? of([]),
    ])
      .pipe(
        map(([clientIdentities, identificationTypes]) => {
          console.log('📦 Raw clientIdentities:', clientIdentities);
          console.log('📦 Raw phoneTypes:', identificationTypes);

          return clientIdentities
            .map((ss) => {
              const matchedIdentificationType = identificationTypes.find(
                (pt) => pt.id === ss.identificationTypeId
              );

              return {
                ...ss,
                identificationTypeName: matchedIdentificationType?.name ?? '—',
              };
            })
            .filter((ft) => ft.isActive)
            .sort((a, b) => b.id - a.id);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((result) => {
        console.log('✅ Final result:', result);
        this.filteredClientIdentities = result;
        this.originalClientIdentities = result;
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

  onDeleteClientIdentity(clientIdentityId: number): void {
    console.log(
      '[View] onDeleteClientIdentity() – opening modal for id=',
      clientIdentityId
    );
    this.selectedClientIdentityId = clientIdentityId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.selectedClientIdentityId != null) {
      this.facade.delete(this.selectedClientIdentityId, this.clientIdParam);
    }
    this.resetDeleteModal();
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
    console.log('route', this.route.snapshot);
    this.router.navigate(['crm/clients/edit-client-identity', clientSales.id], {
      queryParams: {
        mode: 'view',
        clientId: this.clientIdParam, // <-- and here
      },
    });
  }
}