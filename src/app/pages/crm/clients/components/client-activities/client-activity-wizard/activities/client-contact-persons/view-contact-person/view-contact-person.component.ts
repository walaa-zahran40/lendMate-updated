import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Observable, combineLatest, of, map, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../../../../../../shared/components/table/table.component';
import { AddressTypesFacade } from '../../../../../../../../lookups/store/address-types/address-types.facade';
import { PhoneType } from '../../../../../../../../lookups/store/phone-types/phone-type.model';
import { ClientContactPerson } from '../../../../../../store/client-contact-persons/client-contact-person.model';
import { ClientContactPersonsFacade } from '../../../../../../store/client-contact-persons/client-contact-persons.facade';

@Component({
  selector: 'app-view-contact-person',
  standalone: false,
  templateUrl: './view-contact-person.component.html',
  styleUrl: './view-contact-person.component.scss',
})
export class ViewContactPersonComponent implements OnInit, OnDestroy {
  tableDataInside: ClientContactPerson[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();
  clientIdParam!: any;

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'title', header: 'Title' },
    { field: 'titleAR', header: 'Title AR' },
    { field: 'isFinance', header: 'Is Finance' },
  ];

  showDeleteModal = false;
  selectedClientContactPersonId: number | null = null;
  originalClientContactPersons: ClientContactPerson[] = [];
  filteredClientContactPersons: ClientContactPerson[] = [];

  clientContactPersons$!: Observable<ClientContactPerson[]>;
  phoneTypes$!: Observable<PhoneType[]>;

  constructor(
    private router: Router,
    private facade: ClientContactPersonsFacade,
    private addressTypesFacade: AddressTypesFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // 1) grab the param
    const raw = this.route.snapshot.paramMap.get('clientId');
    this.clientIdParam = raw !== null ? Number(raw) : undefined;
    console.log('[View] ngOnInit → clientIdParam =', this.clientIdParam);

    this.facade.loadByClientId(this.clientIdParam);
    this.clientContactPersons$ = this.facade.items$;

    this.addressTypesFacade.loadAll();
    this.phoneTypes$ = this.addressTypesFacade.all$;

    if (this.clientIdParam == null || isNaN(this.clientIdParam)) {
      console.error(
        '❌ Missing or invalid clientIdParam! Cannot load exchange rates.'
      );
      return;
    }

    combineLatest([
      this.clientContactPersons$ ?? of([]),
      this.phoneTypes$ ?? of([]),
    ])
      .pipe(
        map(([clientContactPersons, phoneTypes]) => {
          console.log('📦 Raw clientContactPersons:', clientContactPersons);
          console.log('📦 Raw phoneTypes:', phoneTypes);

          return clientContactPersons
            .map((ss) => {
              const matchedPhoneType = phoneTypes.find(
                (pt) => pt.id === ss.addressTypeId
              );

              return {
                ...ss,
                phoneTypeName: matchedPhoneType?.name ?? '—',
              };
            })
            .sort((a, b) => b.id - a.id);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((result) => {
        console.log('✅ Final result:', result);
        this.filteredClientContactPersons = result;
        this.originalClientContactPersons = result;
      });
  }

  onAddClientContactPerson() {
    console.log('edioyt', this.clientIdParam);
    const routeId = this.route.snapshot.paramMap.get('clientId');
    this.router.navigate(['crm/clients/add-contact-person', routeId], {
      queryParams: {
        mode: 'add',
        clientId: this.clientIdParam,
      },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteClientContactPerson(clientContactPersonId: number): void {
    console.log(
      '[View] onDeleteClientContactPerson() – opening modal for id=',
      clientContactPersonId
    );
    this.selectedClientContactPersonId = clientContactPersonId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.selectedClientContactPersonId != null) {
      this.facade.delete(
        this.selectedClientContactPersonId,
        this.clientIdParam
      );
    }
    this.resetDeleteModal();
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    this.showDeleteModal = false;
    this.selectedClientContactPersonId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredClientContactPersons =
      this.originalClientContactPersons.filter((clientSales) =>
        Object.values(clientSales).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
      );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditClientContactPerson(clientSales: ClientContactPerson) {
    console.log('edioyt', this.clientIdParam);
    this.router.navigate(['/crm/clients/add-contact-person', clientSales.id], {
      queryParams: {
        mode: 'edit',
        clientId: this.clientIdParam, // <-- use "clientId" here
      },
    });
  }

  onViewClientContactPerson(clientSales: ClientContactPerson) {
    console.log('route', this.route.snapshot);
    this.router.navigate(['/crm/clients/add-contact-person', clientSales.id], {
      queryParams: {
        mode: 'view',
        clientId: this.clientIdParam, // <-- and here
      },
    });
  }
}
