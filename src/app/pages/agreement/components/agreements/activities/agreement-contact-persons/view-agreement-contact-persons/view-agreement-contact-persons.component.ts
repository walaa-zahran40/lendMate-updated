import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Observable,
  Subject,
  map,
  combineLatest,
  tap,
  takeUntil,
  of,
} from 'rxjs';
import { TableComponent } from '../../../../../../../shared/components/table/table.component';
import { ClientContactPerson } from '../../../../../../crm/clients/store/client-contact-persons/client-contact-person.model';
import { ClientContactPersonsFacade } from '../../../../../../crm/clients/store/client-contact-persons/client-contact-persons.facade';
import { AgreementContactPerson } from '../../../../../store/agreement-contact-persons/agreement-contact-person.model';
import { AgreementContactPersonsFacade } from '../../../../../store/agreement-contact-persons/agreement-contact-persons.facade';
import { LeasingAgreementsFacade } from '../../../../../store/agreements/agreements.facade';
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

  // show name in the grid
  readonly colsInside = [
    // { field: 'clientName', header: 'Client' }, // ✅ new
    { field: 'contactPersonName', header: 'ContactPerson' }, // 👈 use contactPersonName
  ];

  private destroy$ = new Subject<void>();
  // source streams
  agreementContactPersons$ = of<AgreementContactPerson[]>([]);
  contactPersons$ = of<ClientContactPerson[]>([]);

  constructor(
    private router: Router,
    private facade: AgreementContactPersonsFacade,
    private contactPersonsFacade: ClientContactPersonsFacade,
    private leasingAgreementsFacade: LeasingAgreementsFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // --- read params (support multiple route shapes) ---
    const params = this.route.snapshot.paramMap;
    const leasingRaw =
      params.get('leasingId') ?? // /.../:leasingId
      params.get('id'); // /.../:id (fallback)
    const lmsRaw =
      params.get('agreementId') ?? // /.../:agreementId
      params.get('leasingAgreementId'); // optional/fallback

    this.leasingIdParam = leasingRaw ? Number(leasingRaw) : undefined;
    this.agreementIdParam = lmsRaw ? Number(lmsRaw) : undefined;

    // --- safe defaults so template bindings never see undefined ---
    this.agreementContactPersons$ = of<AgreementContactPerson[]>([]);
    this.contactPersons$ = of<ClientContactPerson[]>([]);

    // We only need the domain agreement (leasing) id to show the list
    if (this.leasingIdParam == null || isNaN(this.leasingIdParam)) {
      console.warn(
        '[Agreement CP] Missing leasingId in route → nothing to load'
      );
      return;
    }

    // --- dictionaries + data ---
    this.contactPersonsFacade.loadAll();
    this.contactPersons$ = this.contactPersonsFacade.items$;

    this.facade.loadByAgreement(this.leasingIdParam);
    this.agreementContactPersons$ = this.facade.selectContactPersonsByAgreement(
      this.leasingIdParam
    );

    // (Optional) load agreements to derive client name if you show it anywhere
    this.leasingAgreementsFacade.loadAll();
    const agreement$ = this.leasingAgreementsFacade.all$.pipe(
      map(
        (list: any[]) =>
          list?.find((m) => m.agreementId === this.leasingIdParam) ?? null
      )
    );

    // --- enrich table rows with contactPersonName and keep filtered copy ---
    combineLatest([
      this.agreementContactPersons$,
      this.contactPersons$,
      agreement$,
    ])
      .pipe(
        map(([rows, contactPersons]) => {
          const dict = new Map<number, ClientContactPerson>(
            (contactPersons ?? []).map((cp) => [cp.id as number, cp])
          );

          const enriched: TableRow[] = (rows ?? []).map((r) => ({
            ...r,
            contactPersonName:
              (dict.get(r.contactPersonId)?.name as string) ??
              (dict.get(r.contactPersonId) as any)?.fullName ??
              `#${r.contactPersonId}`,
          }));

          // newest first
          enriched.sort((a, b) => (b?.id ?? 0) - (a?.id ?? 0));
          return enriched;
        }),
        tap((enriched) => {
          this.originalAgreementContactPersons = enriched;
          this.filteredAgreementContactPersons = [...enriched];
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
    if (this.leasingIdParam == null || this.agreementIdParam == null) return;
    this.router.navigate([
      '/crm/leasing-agreements/agreement-contact-persons/add',
      this.leasingIdParam,
      this.agreementIdParam,
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
