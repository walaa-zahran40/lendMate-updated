import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Observable, map, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../../../../../shared/components/table/table.component';
import { CompanyType } from '../../../../../../../../lookups/store/company-types/company-type.model';
import { SMEClientCode } from '../../../../../../../../lookups/store/sme-client-codes/sme-client-code.model';
import { ClientCentralBankInfoFacade } from '../../../../../../store/client-central-bank-info/client-central-banks.facade';
import { ClientCentralBankInfo } from '../../../../../../store/client-central-bank-info/client-central-bank.model';
import { ClientCentralBankInfoListData } from '../../../../../../resolvers/client-central-bank-info-list.resolver';

@Component({
  selector: 'app-view-central-bank-info',
  standalone: false,
  templateUrl: './view-central-bank-info.component.html',
  styleUrl: './view-central-bank-info.component.scss',
})
export class ViewClientCentralBankInfoComponent {
  tableDataInside: ClientCentralBankInfo[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  clientIdParam!: any;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'balanceSheetdate', header: 'Balance Sheet Date' },
    { field: 'capital', header: 'Capital' },
    { field: 'iScoreSectore', header: 'iScore Sector' },
    { field: 'SMEClientCode', header: 'SME Client Code' },
    { field: 'CompanyType', header: 'Company Type' },
  ];
  showDeleteModal: boolean = false;
  selectedClientCentralBankInfoId: number | null = null;
  originalClientCentralBankInfo: ClientCentralBankInfo[] = [];
  filteredClientCentralBankInfo: ClientCentralBankInfo[] = [];
  clientCentralBankInfo$!: Observable<ClientCentralBankInfo[]>;
  companyTypesList$!: Observable<CompanyType[]>;
  smeClientCodesList$!: Observable<SMEClientCode[]>;

  constructor(
    private router: Router,
    private facade: ClientCentralBankInfoFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const data = this.route.snapshot.data[
      'list'
    ] as ClientCentralBankInfoListData;
    this.clientIdParam = data.clientId;

    // Build lookup maps once from resolver
    const idToCompany = new Map(data.companyTypes.map((t) => [t.id, t.name]));
    const idToSME = new Map(data.smeClientCodes.map((t) => [t.id, t.name]));

    // First paint (no flicker)
    const firstRender = (data.items ?? [])
      .map((it) => ({
        ...it,
        CompanyType: idToCompany.get(it.companyTypeId) ?? '—',
        SMEClientCode: idToSME.get(it.smeClientCodeId) ?? '—',
      }))
      .filter((it) => it.isActive)
      .sort((a, b) => (b.id ?? 0) - (a.id ?? 0));

    this.originalClientCentralBankInfo = firstRender;
    this.filteredClientCentralBankInfo = [...firstRender];

    // Subscribe to store and keep the table in sync (re-enrich with maps)
    this.facade.loadByClientId(this.clientIdParam);
    this.clientCentralBankInfo$ = this.facade.items$;

    this.clientCentralBankInfo$
      .pipe(
        map((items) =>
          (items ?? [])
            .filter((it) => it.clientId === this.clientIdParam)
            .map((it) => ({
              ...it,
              CompanyType: idToCompany.get(it.companyTypeId) ?? '—',
              SMEClientCode: idToSME.get(it.smeClientCodeId) ?? '—',
            }))
            .filter((it) => it.isActive)
            .sort((a, b) => (b.id ?? 0) - (a.id ?? 0))
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        this.originalClientCentralBankInfo = enriched;
        this.filteredClientCentralBankInfo = [...enriched];
      });
  }

  onAddClientCentralBankInfo() {
    const clientIdParam = this.route.snapshot.paramMap.get('clientId');

    this.router.navigate(['/crm/clients/add-client-central-bank-info'], {
      queryParams: { mode: 'add', clientId: clientIdParam },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteClientCentralBankInfo(clientCentralBankInfoId: any): void {
    console.log(
      '[View] onDeleteClientCentralBankInfo() – opening modal for id=',
      clientCentralBankInfoId
    );
    this.selectedIds = [clientCentralBankInfoId];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedClientCentralBankInfoId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredClientCentralBankInfo =
      this.originalClientCentralBankInfo.filter((clientCentralBankInfo) =>
        Object.values(clientCentralBankInfo).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
      );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditClientCentralBankInfo(clientCentralBankInfo: ClientCentralBankInfo) {
    this.router.navigate(
      ['/crm/clients/edit-client-central-bank-info', clientCentralBankInfo.id],
      {
        queryParams: {
          mode: 'edit',
          clientId: this.clientIdParam,
        },
      }
    );
  }
  onViewClientCentralBankInfo(ct: ClientCentralBankInfo) {
    this.router.navigate(
      ['/crm/clients/edit-client-central-bank-info', ct.id],
      {
        queryParams: {
          mode: 'view',
          clientId: this.clientIdParam,
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
        this.showDeleteModal = false;
        this.refreshCalls();
      },
      error: () => {
        this.showDeleteModal = false;
      },
    });
  }

  refreshCalls() {
    this.facade.loadAll();
    this.clientCentralBankInfo$ = this.facade.items$;
  }
  onBulkDelete(ids: number[]) {
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
