import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Observable, combineLatest, of, map, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../../../../../../shared/components/table/table.component';
import { PhoneType } from '../../../../../../../../lookups/store/phone-types/phone-type.model';
import { PhoneTypesFacade } from '../../../../../../../../lookups/store/phone-types/phone-types.facade';
import { ClientPhoneNumber } from '../../../../../../store/client-phone-numbers/client-phone-number.model';
import { ClientPhoneNumbersFacade } from '../../../../../../store/client-phone-numbers/client-phone-numbers.facade';
import { ClientPhoneNumbersListData } from '../../../../../../resolvers/client-phone-numbers-list.resolver';

@Component({
  selector: 'app-view-phone-number',
  standalone: false,
  templateUrl: './view-phone-number.component.html',
  styleUrl: './view-phone-number.component.scss',
})
export class ViewPhoneNumberComponent implements OnInit, OnDestroy {
  tableDataInside: ClientPhoneNumber[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();
  clientIdParam!: any;

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'phoneTypeName', header: 'phone Type' },
    { field: 'phoneNumber', header: 'phone Number' },
  ];

  showDeleteModal = false;
  selectedClientPhoneNumberId: number | null = null;
  originalClientPhoneNumbers: ClientPhoneNumber[] = [];
  filteredClientPhoneNumbers: ClientPhoneNumber[] = [];

  clientPhoneNumbers$!: Observable<ClientPhoneNumber[]>;
  phoneTypes$!: Observable<PhoneType[]>;

  constructor(
    private router: Router,
    private facade: ClientPhoneNumbersFacade,
    private phoneNumberTypesFacade: PhoneTypesFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const data = this.route.snapshot.data[
      'list'
    ] as ClientPhoneNumbersListData | null;

    // ✅ clientId — resolver first, then fallback to param
    const rawParam = this.route.snapshot.paramMap.get('clientId');
    this.clientIdParam =
      data?.clientId ?? (rawParam !== null ? Number(rawParam) : undefined);

    if (!Number.isFinite(this.clientIdParam)) {
      console.error('[View] Missing/invalid clientId');
      return;
    }

    // … now safe to use clientIdParam below
    const idToType = new Map(
      (data?.phoneTypes ?? []).map((pt) => [pt.id, pt.name])
    );
    const firstRender = (data?.items ?? [])
      .map((it) => ({
        ...it,
        phoneTypeName: idToType.get(it.phoneTypeId) ?? '—',
      }))
      .filter((it) => it.isActive)
      .sort((a, b) => b.id - a.id);

    this.originalClientPhoneNumbers = firstRender;
    this.filteredClientPhoneNumbers = [...firstRender];

    this.facade.loadByClientId(this.clientIdParam);
    this.clientPhoneNumbers$ = this.facade.items$;

    combineLatest([this.clientPhoneNumbers$, of(data?.phoneTypes ?? [])])
      .pipe(
        map(([items, phoneTypes]) => {
          const idToType2 = new Map(phoneTypes.map((pt) => [pt.id, pt.name]));
          return (items ?? [])
            .filter((it) => it.clientId === this.clientIdParam)
            .map((it) => ({
              ...it,
              phoneTypeName: idToType2.get(it.phoneTypeId!) ?? '—',
            }))
            .filter((it) => it.isActive)
            .sort((a, b) => b.id! - a.id!);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        this.originalClientPhoneNumbers = enriched;
        this.filteredClientPhoneNumbers = [...enriched];
      });
  }

  onAddClientPhoneNumber() {
    console.log('edioyt', this.clientIdParam);
    const routeId = this.route.snapshot.paramMap.get('clientId');
    this.router.navigate(['crm/clients/add-phone-number', routeId], {
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

  onDeleteClientPhoneNumber(payload: number | ClientPhoneNumber) {
    const id = typeof payload === 'number' ? payload : payload?.id;
    console.log(
      '[View] onDelete click → payload:',
      payload,
      'resolved id:',
      id
    );
    if (!id) return;
    this.selectedIds = [id];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    this.showDeleteModal = false;
    this.selectedClientPhoneNumberId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredClientPhoneNumbers = this.originalClientPhoneNumbers.filter(
      (clientSales) =>
        Object.values(clientSales).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditClientPhoneNumber(clientSales: ClientPhoneNumber) {
    console.log('edioyt', this.clientIdParam);
    this.router.navigate(['crm/clients/edit-phone-number', clientSales.id], {
      queryParams: {
        mode: 'edit',
        clientId: this.clientIdParam, // <-- use "clientId" here
      },
    });
  }

  onViewClientPhoneNumber(clientSales: ClientPhoneNumber) {
    this.router.navigate(['crm/clients/edit-phone-number', clientSales.id], {
      queryParams: {
        mode: 'view',
        clientId: this.clientIdParam, // <-- and here
      },
    });
  }
  selectedIds: number[] = [];
  confirmDelete() {
    if (!this.selectedIds.length || !Number.isFinite(this.clientIdParam))
      return;

    console.log(
      '[View] confirmDelete() → ids:',
      this.selectedIds,
      'clientId:',
      this.clientIdParam
    );

    // Dispatch one action per id (or make a bulk action if your API supports it)
    this.selectedIds.forEach((id) => {
      console.log('[View] dispatch delete for id=', id);
      this.facade.delete(id, this.clientIdParam);
    });

    // UX: close modal immediately; list will refresh via effects
    this.showDeleteModal = false;
    this.selectedIds = [];
  }

  refreshCalls() {
    this.facade.loadAll();
    this.clientPhoneNumbers$ = this.facade.items$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
