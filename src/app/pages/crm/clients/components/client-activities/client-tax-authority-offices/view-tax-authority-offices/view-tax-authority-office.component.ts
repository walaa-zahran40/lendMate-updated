import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, takeUntil, tap, map, combineLatest } from 'rxjs';
import { TableComponent } from '../../../../../../../shared/components/table/table.component';
import { ClientTaxOffice } from '../../../../store/client-tax-office/client-tax-office.model';
import { ClientTaxOfficesFacade } from '../../../../store/client-tax-office/client-tax-office.facade';
import { Store } from '@ngrx/store';
import { loadAll as loadAllOffice } from '../../../../../../lookups/store/authority-offices/authority-offices.actions';
import { TaxOffice } from '../../../../../../lookups/store/tax_offices/tax_office.model';
import { selectAllTaxOffices } from '../../../../../../lookups/store/tax_offices/tax_offices.selectors';
import { loadAll } from '../../../../../../lookups/store/tax_offices/tax_offices.actions';

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
    this.selectedTaxOfficeId = taxOfficeId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedTaxOfficeId
    );
    if (this.selectedTaxOfficeId !== null) {
      this.facade.delete(this.selectedTaxOfficeId, this.clientIdParam);
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
}
