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
} from 'rxjs';
import { TableComponent } from '../../../../../../../../../shared/components/table/table.component';
import { TaxOffice } from '../../../../../../../../lookups/store/tax-offices/tax-office.model';
import { selectAllTaxOffices } from '../../../../../../../../lookups/store/tax-offices/tax-offices.selectors';
import { loadAll } from '../../../../../../store/client-identity-types/client-identity-types.actions';
import { ClientTaxOfficesFacade } from '../../../../../../store/client-tax-office/client-tax-office.facade';
import { ClientTaxOffice } from '../../../../../../store/client-tax-office/client-tax-office.model';

@Component({
  selector: 'app-view-tax-authority-office',
  standalone: false,
  templateUrl: './view-tax-authority-office.component.html',
  styleUrl: './view-tax-authority-office.component.scss',
})
export class ViewTaxAuthorityOfficesComponent {
  tableDataInside: ClientTaxOffice[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  clientIdParam!: any;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'taxCardNumber', header: 'Tax Number' },
    { field: 'expiryDate', header: 'Expiry Date' },
    { field: 'taxOffice', header: 'Tax  Office' },
    { field: 'isActive', header: 'Is Active' },
  ];
  showDeleteModal: boolean = false;
  selectedTaxOfficeId: number | null = null;
  originalTaxOffices: ClientTaxOffice[] = [];
  filteredTaxOffices: ClientTaxOffice[] = [];
  taxOffices$!: Observable<ClientTaxOffice[]>;
  taxOfficesList$!: Observable<TaxOffice[]>;

  constructor(
    private router: Router,
    private facade: ClientTaxOfficesFacade,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    const raw = this.route.snapshot.paramMap.get('clientId');
    this.clientIdParam = raw !== null ? Number(raw) : undefined;
    this.facade.loadClientTaxOfficesByClientId(this.clientIdParam);
    this.taxOffices$ = this.facade.items$;

    this.store.dispatch(loadAll({}));

    this.taxOfficesList$ = this.store.select(selectAllTaxOffices);

    combineLatest([this.taxOffices$, this.taxOfficesList$])
      .pipe(
        map(([taxOffices, taxOfficesList]) =>
          taxOffices
            .map((taxOffice) => ({
              ...taxOffice,
              taxOffice:
                taxOfficesList.find((c) => c.id === taxOffice.id)?.name || '—',
            }))
            .filter((taxOffice) => taxOffice.isActive)
            .sort((a, b) => b.id - a.id)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        this.originalTaxOffices = enriched;
        this.filteredTaxOffices = [...enriched];
      });
  }

  onAddTaxOffice() {
    const clientIdParam = this.route.snapshot.paramMap.get('clientId');

    this.router.navigate(['/crm/clients/add-client-tax-authority-offices'], {
      queryParams: { mode: 'add', clientId: clientIdParam },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteTaxOffice(taxOfficeId: any): void {
    console.log(
      '[View] onDeleteTaxOfficee() – opening modal for id=',
      taxOfficeId
    );
    this.selectedIds = [taxOfficeId];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedTaxOfficeId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredTaxOffices = this.originalTaxOffices.filter((taxOffice) =>
      Object.values(taxOffice).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditTaxOffice(taxOffice: ClientTaxOffice) {
    this.router.navigate(
      ['/crm/clients/edit-client-tax-authority-offices', taxOffice.id],
      {
        queryParams: {
          mode: 'edit',
          clientId: this.clientIdParam, // <-- use "currencyId" here
        },
      }
    );
  }
  onViewTaxOffice(ct: ClientTaxOffice) {
    this.router.navigate(
      ['/crm/clients/edit-client-tax-authority-offices', ct.id],
      {
        queryParams: {
          mode: 'view',
          clientId: this.clientIdParam, // <-- use "currencyId" here
        },
      }
    );
  }
  selectedIds: number[] = [];
  confirmDelete() {
    const deleteCalls = this.selectedIds.map((id) =>
      this.facade.delete(id, this.clientIdParam)
    );

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
    this.taxOffices$ = this.facade.items$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
