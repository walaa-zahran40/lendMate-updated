import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Subject,
  Observable,
  combineLatest,
  of,
  map,
  takeUntil,
  forkJoin,
} from 'rxjs';
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
    { field: 'genderId', header: 'Gender' },
    { field: 'phoneNumber', header: 'Phone Number' },
    { field: 'isAuthorizedSign', header: 'Is Authorized Sign' },
    { field: 'isKeyManager', header: 'Is Key Manager' },
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
    const data = this.route.snapshot.data['list'] as {
      clientId: number;
      items: ClientContactPerson[];
      phoneTypes: PhoneType[];
    };

    this.clientIdParam = data.clientId;

    const phoneMap = new Map(data.phoneTypes.map((pt) => [pt.id, pt.name]));

    // 1) First render from resolver
    const first = (data.items ?? [])
      .map((cp) => {
        const phoneNumber = cp.contactPersonPhoneNumbers
          ?.map((p) => p.phoneNumber)
          .join(', ');
        // The table shows "Gender" & phoneNumber; keep simple mapping here
        return { ...cp, phoneNumber };
      })
      .sort((a, b) => (b.id ?? 0) - (a.id ?? 0));

    this.originalClientContactPersons = first;
    this.filteredClientContactPersons = [...first];

    // 2) Store-driven refresh after CRUD
    this.facade.loadByClientId(this.clientIdParam);
    this.clientContactPersons$ = this.facade.items$;

    combineLatest([this.clientContactPersons$, of(data.phoneTypes)])
      .pipe(
        map(([items, pts]) => {
          const mapPT = new Map(pts.map((p) => [p.id, p.name]));
          return (items ?? [])
            .filter((x) => x.clientId === this.clientIdParam)
            .map((x) => ({
              ...x,
              phoneNumber: x.contactPersonPhoneNumbers
                ?.map((p) => p.phoneNumber)
                .join(', '),
              phoneTypeName: x.contactPersonPhoneNumbers
                ?.map((p) => mapPT.get(p.phoneTypeId) ?? '—')
                .join(', '),
            }))
            .sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((res) => {
        this.originalClientContactPersons = res;
        this.filteredClientContactPersons = [...res];
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
    this.selectedIds = [clientContactPersonId];
    this.showDeleteModal = true;
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
        clientId: this.clientIdParam,
      },
    });
  }

  onViewClientContactPerson(clientSales: ClientContactPerson) {
    this.router.navigate(['/crm/clients/add-contact-person', clientSales.id], {
      queryParams: {
        mode: 'view',
        clientId: this.clientIdParam,
      },
    });
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
    this.clientContactPersons$ = this.facade.items$;
  }
  onBulkDelete(ids: number[]) {
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
