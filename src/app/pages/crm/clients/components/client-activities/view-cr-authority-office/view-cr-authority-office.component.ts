import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, takeUntil, tap, map } from 'rxjs';
import { TableComponent } from '../../../../../../shared/components/table/table.component';
import { ClientCRAuthorityOffice } from '../../../store/client-cr-authority-office/client-cr-authority-office.model';
import { ClientCRAuthorityOfficesFacade } from '../../../store/client-cr-authority-office/client-cr-authority-office.facade';

@Component({
  selector: 'app-view-cr-authority-office',
  standalone: false,
  templateUrl: './view-cr-authority-office.component.html',
  styleUrl: './view-cr-authority-office.component.scss',
})
export class ViewCRAuthorityOfficeesComponent {
  tableDataInside: ClientCRAuthorityOffice[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  clientIdParam!: any;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'details', header: 'Details' },
    { field: 'detailsAR', header: 'Details AR' },
    { field: 'client', header: 'Branch' },
  ];
  showDeleteModal: boolean = false;
  selectedCRAuthorityOfficeId: number | null = null;
  originalCRAuthorityOffices: ClientCRAuthorityOffice[] = [];
  filteredCRAuthorityOffices: ClientCRAuthorityOffice[] = [];
  cRAuthorityOffices$!: Observable<ClientCRAuthorityOffice[]>;

  constructor(
    private router: Router,
    private facade: ClientCRAuthorityOfficesFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const raw = this.route.snapshot.paramMap.get('clientId');
    this.clientIdParam = raw !== null ? Number(raw) : undefined;
    this.facade.loadClientCRAuthorityOfficesByClientId(this.clientIdParam);
    this.cRAuthorityOffices$ = this.facade.items$;

    this.cRAuthorityOffices$
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
        this.filteredCRAuthorityOffices = formatted;
        this.originalCRAuthorityOffices = formatted;
        console.log(
          '[View] subscribe → filteredCurrencyExchangeRates =',
          this.filteredCRAuthorityOffices
        );
      });
  }

  onAddCRAuthorityOfficee() {
    const clientIdParam = this.route.snapshot.paramMap.get('clientId');

    this.router.navigate(['/organizations/add-client-addresses'], {
      queryParams: { mode: 'add', clientId: clientIdParam },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteCRAuthorityOfficee(cRAuthorityOfficeId: any): void {
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
  onEditCRAuthorityOfficee(cRAuthorityOffice: ClientCRAuthorityOffice) {
    this.router.navigate(
      ['/organizations/edit-client-addresses', cRAuthorityOffice.id],
      {
        queryParams: {
          mode: 'edit',
          clientId: this.clientIdParam, // <-- use "currencyId" here
        },
      }
    );
  }
  onViewCRAuthorityOfficee(ct: ClientCRAuthorityOffice) {
    this.router.navigate(['/organizations/edit-client-addresses', ct.id], {
      queryParams: {
        mode: 'view',
        clientId: this.clientIdParam, // <-- use "currencyId" here
      },
    });
  }
}
