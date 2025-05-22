import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, takeUntil, tap, map, combineLatest } from 'rxjs';
import { TableComponent } from '../../../../../../../shared/components/table/table.component';
import { Area } from '../../../../../../lookups/store/areas/area.model';
import { Store } from '@ngrx/store';
import { selectAllAreas } from '../../../../../../lookups/store/areas/areas.selectors';
import { AreasFacade } from '../../../../../../lookups/store/areas/areas.facade';
import { ClientCentralBankInfo } from '../../../../store/client-central-bank-info/client-central-bank.model';
import { ClientCentralBankInfoFacade } from '../../../../store/client-central-bank-info/client-central-bank.facade';
import { CompanyTypesFacade } from '../../../../../../lookups/store/company-types/company-types.facade';
import { CompanyType } from '../../../../../../lookups/store/company-types/company-type.model';
import { SMEClientCode } from '../../../../../../lookups/store/sme-client-codes/sme-client-codes.model';
import { selectAllCompanyTypes } from '../../../../../../lookups/store/company-types/company-types.selectors';
import { SMEClientCodesFacade } from '../../../../../../lookups/store/sme-client-codes/sme-client-codes.facade';
import { selectAllSMEClientCodes } from '../../../../../../lookups/store/sme-client-codes/sme-client-codes.selectors';

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
    private companyTypesFacade: CompanyTypesFacade,
    private smeClientCodesFacade: SMEClientCodesFacade,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    const raw = this.route.snapshot.paramMap.get('clientId');
    this.clientIdParam = raw !== null ? Number(raw) : undefined;

    this.companyTypesFacade.loadAll();
    this.companyTypesList$ = this.store.select(selectAllCompanyTypes);
    this.store.dispatch({ type: '[CompanyTypes] Load All' });

    this.smeClientCodesFacade.loadAll();
    this.smeClientCodesList$ = this.store.select(selectAllSMEClientCodes);
    this.store.dispatch({ type: '[SMEClientCodes] Load All' });

    this.facade.loadClientCentralBankInfoByClientId(this.clientIdParam);
    this.clientCentralBankInfo$ = this.facade.items$;

    combineLatest([
      this.clientCentralBankInfo$,
      this.companyTypesList$,
      this.smeClientCodesList$,
    ])
      .pipe(
        map(([clientCentralBankInfo, companyTypesList, smeClientCodesList]) =>
          clientCentralBankInfo
            .map((centralBankinfo) => ({
              ...centralBankinfo,
              CompanyType:
                companyTypesList.find(
                  (c) => c.id === centralBankinfo.companyTypeId
                )?.name || '—',
              SMEClientCode:
                smeClientCodesList.find(
                  (c) => c.id === centralBankinfo.smeClientCodeId
                )?.name || '—',
            }))
            .filter((centralBankinfo) => centralBankinfo.isActive)
            .sort((a, b) => b.id - a.id)
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
    this.selectedClientCentralBankInfoId = clientCentralBankInfoId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedClientCentralBankInfoId
    );
    if (this.selectedClientCentralBankInfoId !== null) {
      this.facade.delete(
        this.selectedClientCentralBankInfoId,
        this.clientIdParam
      );
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
          clientId: this.clientIdParam, // <-- use "currencyId" here
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
          clientId: this.clientIdParam, // <-- use "currencyId" here
        },
      }
    );
  }
}
