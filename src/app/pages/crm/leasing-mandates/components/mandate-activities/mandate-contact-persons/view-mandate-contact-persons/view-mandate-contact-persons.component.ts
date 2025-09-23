import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject, map, combineLatest, tap, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../../../../shared/components/table/table.component';
import { MandatesFacade } from '../../../../store/leasing-mandates/leasing-mandates.facade';
import { MandateContactPerson } from '../../../../store/mandate-contact-persons/mandate-contact-person.model';
import { MandateContactPersonsFacade } from '../../../../store/mandate-contact-persons/mandate-contact-persons.facade';
import { ClientContactPersonsFacade } from '../../../../../clients/store/client-contact-persons/client-contact-persons.facade';
import { ClientContactPerson } from '../../../../../clients/store/client-contact-persons/client-contact-person.model';
type TableRow = MandateContactPerson & { contactPersonName: string }; // 👈 enriched row

@Component({
  selector: 'app-view-mandate-contact-persons',
  standalone: false,
  templateUrl: './view-mandate-contact-persons.component.html',
  styleUrl: './view-mandate-contact-persons.component.scss',
})
export class ViewMandateContactPersonsComponent {
  @ViewChild('tableRef') tableRef!: TableComponent;

  first2 = 0;
  rows = 10;
  showFilters = false;

  leasingIdParam!: number | undefined; // domain mandateId for API
  mandateIdParam!: number | undefined; // URL helper only

  showDeleteModal = false;
  selectedMandateContactPersonId: number | null = null;
  selectedIds: number[] = [];

  // enriched lists used by the table + search
  originalMandateContactPersons: TableRow[] = [];
  filteredMandateContactPersons: TableRow[] = [];

  // source streams
  mandateContactPersons$!: Observable<MandateContactPerson[]>;
  contactPersons$!: Observable<ClientContactPerson[]>;

  // show name in the grid
  readonly colsInside = [
    // { field: 'clientName', header: 'Client' }, // ✅ new
    { field: 'contactPersonName', header: 'ContactPerson' }, // 👈 use contactPersonName
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private facade: MandateContactPersonsFacade,
    private contactPersonsFacade: ClientContactPersonsFacade,
    private leasingMandatesFacade: MandatesFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const leasingRaw = this.route.snapshot.paramMap.get('leasingId');
    const lmsRaw = this.route.snapshot.paramMap.get('leasingMandatesId');

    this.leasingIdParam = leasingRaw !== null ? Number(leasingRaw) : undefined; // e.g. 41
    this.mandateIdParam = lmsRaw !== null ? Number(lmsRaw) : undefined; // e.g. 2102

    if (
      this.leasingIdParam == null ||
      isNaN(this.leasingIdParam) ||
      this.mandateIdParam == null ||
      isNaN(this.mandateIdParam)
    )
      return;

    // load contactPersons list once (for dictionary)
    this.contactPersonsFacade.loadAll();
    this.contactPersons$ = this.contactPersonsFacade.items$;

    // load mandate contactPersons by domain mandateId (= leasingId)
    const mandateIdForApi = this.leasingIdParam;
    this.facade.loadByMandate(mandateIdForApi);
    this.mandateContactPersons$ =
      this.facade.selectContactPersonsByMandate(mandateIdForApi);
    this.leasingMandatesFacade.loadAll();

    // JOIN: enrich rows with contactPersonName
    const mandate$ = this.leasingMandatesFacade.all$.pipe(
      map(
        (list: any[]) =>
          list.find((m) => m.mandateId === mandateIdForApi) ?? null
      )
    );
    combineLatest([this.mandateContactPersons$, this.contactPersons$, mandate$])
      .pipe(
        map(([rows, contactPersons, mandate]): TableRow[] => {
          const contactPersonDict = new Map<number, ClientContactPerson>(
            contactPersons.map((o) => [o.id as number, o])
          );
          const clientName =
            mandate?.clientView?.clientName ??
            mandate?.clientView?.clientNameAr ??
            '';

          return [...rows]
            .map((r) => ({
              ...r,
              contactPersonName:
                (contactPersonDict.get(r.contactPersonId)?.name as string) ??
                (contactPersonDict.get(r.contactPersonId) as any)?.fullName ??
                `#${r.contactPersonId}`,
              clientName, // ✅ same client for all rows in this mandate
            }))
            .sort((a, b) => (b?.id ?? 0) - (a?.id ?? 0));
        }),
        tap((sorted) => {
          this.originalMandateContactPersons = sorted;
          this.filteredMandateContactPersons = [...sorted];
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
  onAddMandateContactPerson() {
    if (this.leasingIdParam == null || this.mandateIdParam == null) return;
    this.router.navigate([
      '/crm/leasing-mandates/mandate-contact-persons/add',
      this.leasingIdParam,
      this.mandateIdParam,
    ]);
  }

  onEditMandateContactPerson(contactPerson: MandateContactPerson) {
    if (this.leasingIdParam == null || this.mandateIdParam == null) return;
    this.router.navigate([
      '/crm/leasing-mandates/mandate-contact-persons/edit',
      this.leasingIdParam,
      this.mandateIdParam,
      contactPerson.id,
    ]);
  }

  onViewMandateContactPerson(contactPerson: MandateContactPerson) {
    if (this.leasingIdParam == null || this.mandateIdParam == null) return;
    this.router.navigate([
      '/crm/leasing-mandates/mandate-contact-persons/view',
      this.leasingIdParam,
      this.mandateIdParam,
      contactPerson.id,
    ]);
  }

  onDeleteMandateContactPerson(id: number): void {
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
      this.facade.loadByMandate(this.leasingIdParam); // use domain id
  }

  resetDeleteModal() {
    this.showDeleteModal = false;
    this.selectedMandateContactPersonId = null;
    this.selectedIds = [];
  }

  onSearch(keyword: string) {
    const lower = keyword?.toLowerCase() ?? '';
    if (!lower) {
      this.filteredMandateContactPersons = [
        ...this.originalMandateContactPersons,
      ];
      return;
    }
    this.filteredMandateContactPersons =
      this.originalMandateContactPersons.filter((row) =>
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
      this.facade.loadByMandate(this.leasingIdParam);
  }
}
