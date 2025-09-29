import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject, map, combineLatest, tap, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../../../shared/components/table/table.component';
import { ClientContactPerson } from '../../../../../crm/clients/store/client-contact-persons/client-contact-person.model';
import { AgreementContactPerson } from '../../../../store/agreement-contact-persons/agreement-contact-person.model';
import { AgreementContactPersonsFacade } from '../../../../store/agreement-contact-persons/agreement-contact-persons.facade';
import { LeasingAgreementsFacade } from '../../../../store/agreements/agreements.facade';
import { ClientContactPersonsFacade } from '../../../../../crm/clients/store/client-contact-persons/client-contact-persons.facade';
type TableRow = AgreementContactPerson & { contactPersonName: string }; // 👈 enriched row

@Component({
  selector: 'app-view-agreement-contact-persons',
  standalone: false,
  templateUrl: './view-agreement-contact-persons.component.html',
  styleUrl: './view-agreement-contact-persons.component.scss',
})
export class ViewAgreementContactPersonsComponent {
  @ViewChild('tableRef') tableRef!: TableComponent;

  first2 = 0;
  rows = 10;
  showFilters = false;

  leasingIdParam!: number | undefined; // domain agreementId for API
  agreementIdParam!: number | undefined; // URL helper only

  showDeleteModal = false;
  selectedAgreementContactPersonId: number | null = null;
  selectedIds: number[] = [];

  // enriched lists used by the table + search
  originalAgreementContactPersons: TableRow[] = [];
  filteredAgreementContactPersons: TableRow[] = [];

  // source streams
  agreementContactPersons$!: Observable<AgreementContactPerson[]>;
  contactPersons$!: Observable<ClientContactPerson[]>;

  // show name in the grid
  readonly colsInside = [
    // { field: 'clientName', header: 'Client' }, // ✅ new
    { field: 'contactPersonName', header: 'ContactPerson' }, // 👈 use contactPersonName
  ];
  routeId = this.route.snapshot.params['id'];

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private facade: AgreementContactPersonsFacade,
    private contactPersonsFacade: ClientContactPersonsFacade,
    private leasingAgreementsFacade: LeasingAgreementsFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // load contactPersons list once (for dictionary)
    this.contactPersonsFacade.loadAll();
    this.contactPersons$ = this.contactPersonsFacade.items$;

    // load agreement contactPersons by domain agreementId (= leasingId)
    const agreementIdForApi = this.route.snapshot.params['id'];
    this.facade.loadByAgreement(agreementIdForApi);
    this.agreementContactPersons$ =
      this.facade.selectContactPersonsByAgreement(agreementIdForApi);
    this.leasingAgreementsFacade.loadAll();

    // JOIN: enrich rows with contactPersonName
    const agreement$ = this.leasingAgreementsFacade.all$.pipe(
      map(
        (list: any[]) =>
          list.find((m) => m.agreementId === agreementIdForApi) ?? null
      )
    );
    combineLatest([
      this.agreementContactPersons$,
      this.contactPersons$,
      agreement$,
    ])
      .pipe(
        map(([rows, contactPersons, agreement]): TableRow[] => {
          const contactPersonDict = new Map<number, ClientContactPerson>(
            contactPersons.map((o) => [o.id as number, o])
          );
          const clientName =
            agreement?.clientView?.clientName ??
            agreement?.clientView?.clientNameAr ??
            '';

          return [...rows]
            .map((r) => ({
              ...r,
              contactPersonName:
                (contactPersonDict.get(r.contactPersonId)?.name as string) ??
                (contactPersonDict.get(r.contactPersonId) as any)?.fullName ??
                `#${r.contactPersonId}`,
              clientName, // ✅ same client for all rows in this agreement
            }))
            .sort((a, b) => (b?.id ?? 0) - (a?.id ?? 0));
        }),
        tap((sorted) => {
          this.originalAgreementContactPersons = sorted;
          this.filteredAgreementContactPersons = [...sorted];
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ——— navigation (unchanged) ———
  onAddAgreementContactPerson() {
    this.router.navigate([
      `/agreement/activities/add-agreement-contact-person/${this.routeId}`,
    ]);
  }
  onEditAgreementContactPerson(contactPerson: AgreementContactPerson) {
    if (this.leasingIdParam == null || this.agreementIdParam == null) return;
    this.router.navigate([
      '/crm/leasing-agreements/agreement-contact-persons/edit',
      this.leasingIdParam,
      this.agreementIdParam,
      contactPerson.id,
    ]);
  }

  onViewAgreementContactPerson(contactPerson: AgreementContactPerson) {
    if (this.leasingIdParam == null || this.agreementIdParam == null) return;
    this.router.navigate([
      '/crm/leasing-agreements/agreement-contact-persons/view',
      this.leasingIdParam,
      this.agreementIdParam,
      contactPerson.id,
    ]);
  }

  onDeleteAgreementContactPerson(id: number): void {
    this.selectedIds = [id];
    this.showDeleteModal = true;
  }

  onBulkDelete(ids: number[]) {
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  confirmDelete() {
    this.selectedIds.forEach((id) => this.facade.delete(id));
    this.showDeleteModal = false;
    this.selectedIds = [];
    if (this.leasingIdParam != null)
      this.facade.loadByAgreement(this.leasingIdParam); // use domain id
  }

  resetDeleteModal() {
    this.showDeleteModal = false;
    this.selectedAgreementContactPersonId = null;
    this.selectedIds = [];
  }

  onSearch(keyword: string) {
    const lower = keyword?.toLowerCase() ?? '';
    if (!lower) {
      this.filteredAgreementContactPersons = [
        ...this.originalAgreementContactPersons,
      ];
      return;
    }
    this.filteredAgreementContactPersons =
      this.originalAgreementContactPersons.filter((row) =>
        Object.values(row).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
      );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  refreshCalls() {
    if (this.leasingIdParam != null)
      this.facade.loadByAgreement(this.leasingIdParam);
  }
}
