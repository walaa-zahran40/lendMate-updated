import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, Observable, combineLatest, map, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../../../../../../shared/components/table/table.component';
import { AuthorityOffice } from '../../../../../../../../lookups/store/authority-offices/authority-office.model';
import { selectAllAuthorityOffices } from '../../../../../../../../lookups/store/authority-offices/authority-offices.selectors';
import { ClientCRAuthorityOfficesFacade } from '../../../../../../store/client-cr-authority-office/client-cr-authority-office.facade';
import { ClientCRAuthorityOffice } from '../../../../../../store/client-cr-authority-office/client-cr-authority-office.model';
import { loadAll as loadAllAuthorityOffice } from '../../../../../../../../lookups/store/authority-offices/authority-offices.actions';

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
    const raw = this.route.snapshot.paramMap.get('clientId');
    this.clientIdParam = raw !== null ? Number(raw) : undefined;
    this.facade.loadClientCRAuthorityOfficesByClientId(this.clientIdParam);
    this.cRAuthorityOffices$ = this.facade.items$;

    this.store.dispatch(loadAllAuthorityOffice({}));

    this.authorityOfficesList$ = this.store.select(selectAllAuthorityOffices);

    combineLatest([this.cRAuthorityOffices$, this.authorityOfficesList$])
      .pipe(
        map(([cRAuthorityOffices, authorityOfficesList]) =>
          cRAuthorityOffices
            .map((authorityOffice) => ({
              ...authorityOffice,
              crAuthorityOffice:
                authorityOfficesList.find((c) => c.id === authorityOffice.id)
                  ?.name || '—',
            }))
            // .filter((authorityOffice) => authorityOffice.isActive)
            .sort((a, b) => b.id - a.id)
        ),
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
    this.selectedCRAuthorityOfficeId = cRAuthorityOfficeId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedCRAuthorityOfficeId
    );
    if (this.selectedCRAuthorityOfficeId !== null) {
      this.facade.delete(this.selectedCRAuthorityOfficeId, this.clientIdParam);
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
          clientId: this.clientIdParam, // <-- use "currencyId" here
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
          clientId: this.clientIdParam, // <-- use "currencyId" here
        },
      }
    );
  }
}
