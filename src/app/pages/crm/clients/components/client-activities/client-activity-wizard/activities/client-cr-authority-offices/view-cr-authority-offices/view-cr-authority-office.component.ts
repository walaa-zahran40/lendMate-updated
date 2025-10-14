import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Subject,
  Observable,
  combineLatest,
  map,
  takeUntil,
  forkJoin,
  of,
} from 'rxjs';
import { TableComponent } from '../../../../../../../../../shared/components/table/table.component';
import { AuthorityOffice } from '../../../../../../../../lookups/store/authority-offices/authority-office.model';
import { selectAllAuthorityOffices } from '../../../../../../../../lookups/store/authority-offices/authority-offices.selectors';
import { ClientCRAuthorityOfficesFacade } from '../../../../../../store/client-cr-authority-office/client-cr-authority-office.facade';
import { ClientCRAuthorityOffice } from '../../../../../../store/client-cr-authority-office/client-cr-authority-office.model';
import { loadAll as loadAllAuthorityOffice } from '../../../../../../../../lookups/store/authority-offices/authority-offices.actions';
import { ClientCRAuthorityOfficesListData } from '../../../../../../../resolvers/client-cr-authority-offices-list.resolver';

@Component({
  selector: 'app-view-cr-authority-office',
  standalone: false,
  templateUrl: './view-cr-authority-office.component.html',
  styleUrl: './view-cr-authority-office.component.scss',
})
export class ViewCRAuthorityOfficesComponent {
  tableDataInside: ClientCRAuthorityOffice[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  clientIdParam!: any;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'crNumber', header: 'CR Number' },
    { field: 'expiryDate', header: 'Expiry Date' },
    { field: 'crAuthorityOffice', header: 'CR Authority Office' },
    { field: 'isActive', header: 'Is Active' },
  ];
  showDeleteModal: boolean = false;
  selectedCRAuthorityOfficeId: number | null = null;
  originalCRAuthorityOffices: ClientCRAuthorityOffice[] = [];
  filteredCRAuthorityOffices: ClientCRAuthorityOffice[] = [];
  cRAuthorityOffices$!: Observable<ClientCRAuthorityOffice[]>;
  authorityOfficesList$!: Observable<AuthorityOffice[]>;

  constructor(
    private router: Router,
    private facade: ClientCRAuthorityOfficesFacade,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    const data = this.route.snapshot.data[
      'list'
    ] as ClientCRAuthorityOfficesListData;
    this.clientIdParam = data.clientId;

    // first paint
    const idToName = new Map(data.authorityOffices.map((o) => [o.id, o.name]));
    const firstRender = (data.items ?? [])
      .map((it) => ({
        ...it,
        crAuthorityOffice: idToName.get(it.crAuthorityOfficeId) ?? '—',
      }))
      .sort((a, b) => (b.id ?? 0) - (a.id ?? 0));

    this.originalCRAuthorityOffices = firstRender;
    this.filteredCRAuthorityOffices = [...firstRender];

    // keep reacting to store for live refresh (after create/update/delete)
    this.facade.loadByClientId(this.clientIdParam);
    this.cRAuthorityOffices$ = this.facade.items$;

    combineLatest([
      this.cRAuthorityOffices$,
      // reuse the resolver’s lookup set so we don't depend on another async stream
      of(data.authorityOffices),
    ])
      .pipe(
        map(([items, authorityOffices]) => {
          const idToName = new Map(authorityOffices.map((o) => [o.id, o.name]));
          return (items ?? [])
            .filter((it) => Number(it.clientId) === Number(this.clientIdParam))
            .map((it) => ({
              ...it,
              crAuthorityOffice: idToName.get(it.crAuthorityOfficeId) ?? '—',
            }))
            .sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        this.originalCRAuthorityOffices = enriched;
        this.filteredCRAuthorityOffices = [...enriched];
      });
  }

  onAddCRAuthorityOffice() {
    const clientIdParam = this.route.snapshot.paramMap.get('clientId');

    this.router.navigate(['/crm/clients/add-client-cr-authority-offices'], {
      queryParams: { mode: 'add', clientId: clientIdParam },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteCRAuthorityOffice(cRAuthorityOfficeId: any): void {
    console.log(
      '[View] onDeleteCRAuthorityOfficee() – opening modal for id=',
      cRAuthorityOfficeId
    );
    this.selectedIds = [cRAuthorityOfficeId];
    this.showDeleteModal = true;
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
    this.cRAuthorityOffices$ = this.facade.items$;
  }
  onBulkDelete(ids: number[]) {
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedCRAuthorityOfficeId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredCRAuthorityOffices = this.originalCRAuthorityOffices.filter(
      (cRAuthorityOffice) =>
        Object.values(cRAuthorityOffice).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditCRAuthorityOffice(cRAuthorityOffice: ClientCRAuthorityOffice) {
    this.router.navigate(
      ['/crm/clients/edit-client-cr-authority-offices', cRAuthorityOffice.id],
      {
        queryParams: {
          mode: 'edit',
          clientId: this.clientIdParam,
        },
      }
    );
  }
  onViewCRAuthorityOffice(ct: ClientCRAuthorityOffice) {
    this.router.navigate(
      ['/crm/clients/edit-client-cr-authority-offices', ct.id],
      {
        queryParams: {
          mode: 'view',
          clientId: this.clientIdParam,
        },
      }
    );
  }
}
