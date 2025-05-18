import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, Observable, combineLatest, map, takeUntil, filter, tap, of } from 'rxjs';
import { TableComponent } from '../../../../../../shared/components/table/table.component';
import { ClientPhoneNumber } from '../../../store/client-phone-numbers/client-phone-number.model';
import { ClientPhoneNumbersFacade } from '../../../store/client-phone-numbers/client-phone-numbers.facade';
import { PhoneTypesFacade } from '../../../../../lookups/store/phone-types/phone-types.facade';
import { PhoneType } from '../../../../../lookups/store/phone-types/phone-type.model';


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
    { field: 'phoneNumber', header: 'phone Number' }
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
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    // 1) grab the param
    const raw = this.route.snapshot.paramMap.get('clientId');
    this.clientIdParam = raw !== null ? Number(raw) : undefined;
    console.log('[View] ngOnInit → clientIdParam =', this.clientIdParam);

    this.facade.loadByClientId(this.clientIdParam);
    this.clientPhoneNumbers$ = this.facade.items$;

    this.phoneNumberTypesFacade.loadAll();
    this.phoneTypes$ = this.phoneNumberTypesFacade.all$;

    if (this.clientIdParam == null || isNaN(this.clientIdParam)) {
      console.error(
        '❌ Missing or invalid clientIdParam! Cannot load exchange rates.'
      );
      return;
    }

    combineLatest([
  this.clientPhoneNumbers$ ?? of([]),
  this.phoneTypes$ ?? of([])
])
.pipe(
  map(([clientPhoneNumbers, phoneTypes]) => {
    console.log('📦 Raw clientPhoneNumbers:', clientPhoneNumbers);
    console.log('📦 Raw phoneTypes:', phoneTypes);

    return clientPhoneNumbers
      .map((ss) => {
        const matchedPhoneType = phoneTypes.find(
          (pt) => pt.id === ss.phoneTypeId
        );

        return {
          ...ss,
          phoneTypeName: matchedPhoneType?.name ?? '—',
        };
      })
      .filter((ft) => ft.isActive)
      .sort((a, b) => b.id - a.id);
  }),
  takeUntil(this.destroy$)
)
.subscribe((result) => {
  console.log('✅ Final result:', result);
  this.filteredClientPhoneNumbers = result;
  this.originalClientPhoneNumbers = result;
});
  }

  onAddClientPhoneNumber() {
   console.log('edioyt', this.clientIdParam);
   const routeId=this.route.snapshot.paramMap.get('clientId')
    this.router.navigate(
      ['crm/clients/add-phone-number', routeId],
      {
        queryParams: {
          mode: 'add',
          clientId: this.clientIdParam, // <-- use "clientId" here
        },
      }
    );
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteClientPhoneNumber(clientPhoneNumberId: number): void {
    console.log(
      '[View] onDeleteClientPhoneNumber() – opening modal for id=',
      clientPhoneNumberId
    );
    this.selectedClientPhoneNumberId = clientPhoneNumberId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.selectedClientPhoneNumberId != null) {
      this.facade.delete(this.selectedClientPhoneNumberId, this.clientIdParam);
    }
    this.resetDeleteModal();
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
    this.router.navigate(
      ['crm/clients/edit-phone-number', clientSales.id],
      {
        queryParams: {
          mode: 'edit',
          clientId: this.clientIdParam, // <-- use "clientId" here
        },
      }
    );
  }

  onViewClientPhoneNumber(clientSales: ClientPhoneNumber) {
console.log('route',this.route.snapshot)
    this.router.navigate(
      ['crm/clients/edit-phone-number', clientSales.id],
      {
        queryParams: {
          mode: 'view',
          clientId: this.clientIdParam, // <-- and here
        },
      }
    );
  }
}
