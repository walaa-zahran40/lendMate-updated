import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Subject,
  Observable,
  forkJoin,
  map,
  startWith,
  takeUntil,
  tap,
  combineLatest,
} from 'rxjs';
import { TableComponent } from '../../../../../../shared/components/table/table.component';
import { AgreementContactPerson } from '../../../../store/agreement-contact-persons/agreement-contact-person.model';
import { AgreementContactPersonsFacade } from '../../../../store/agreement-contact-persons/agreement-contact-persons.facade';
import { ClientContactPersonsFacade } from '../../../../../crm/clients/store/client-contact-persons/client-contact-persons.facade';

@Component({
  selector: 'app-view-agreement-contact-persons',
  standalone: false,
  templateUrl: './view-agreement-contact-persons.component.html',
  styleUrl: './view-agreement-contact-persons.component.scss',
})
export class ViewAgreementContactPersonsComponent {
  tableDataInside: AgreementContactPerson[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;

  private destroy$ = new Subject<void>();

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'id', header: 'ID' },
    { field: 'agreementId', header: 'Agreement ID' },
    { field: 'contactPersonName', header: 'Contact Person' }, // <— use the derived field
  ];

  showDeleteModal = false;
  selectedAgreementContactPersonId: number | null = null;

  originalAgreementContactPersons: AgreementContactPerson[] = [];
  filteredAgreementContactPersons: AgreementContactPerson[] = [];
  clientIdParam!: number;
  agreementContactPersons$!: Observable<AgreementContactPerson[]>;

  constructor(
    private router: Router,
    private facade: AgreementContactPersonsFacade,
    private route: ActivatedRoute,
    private contactPersonsFacade: ClientContactPersonsFacade
  ) {}

  ngOnInit() {
    this.clientIdParam = +this.route.snapshot.params['clientId'];
    const agreementId = Number(this.route.snapshot.paramMap.get('agreementId'));
    // 1) Wire the stream FIRST
    //    Use whichever your facade exposes: all$ or items$
    this.agreementContactPersons$ = this.facade.items$; // or: this.facade.items$
    const clientContacts$ = this.contactPersonsFacade.items$; // Client contacts list
    this.facade.loadAll();
    this.contactPersonsFacade.loadByClientId(this.clientIdParam); // or loadByClientId(...) if you have clientId

    // 3) Join and enrich rows with contact person names
    combineLatest([this.agreementContactPersons$, clientContacts$])
      .pipe(
        map(([acpRows, contacts]) => {
          // Build a name map: id -> display name
          const nameMap = new Map<number, string>(
            contacts.map((c: any) => {
              // adapt to your model; try common fields and fall back
              const name = c.name ?? String(c.id);
              return [c.id, name];
            })
          );

          // Filter rows by agreementId, then project contactPersonName
          const enriched = acpRows
            .filter((r) => r.agreementId === agreementId)
            .map((r) => ({
              ...r,
              contactPersonName:
                nameMap.get(r.contactPersonId!) ?? String(r.contactPersonId),
            }));

          return enriched;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        this.originalAgreementContactPersons = enriched;
        this.filteredAgreementContactPersons = [...enriched];
      });
  }

  onAddAgreementContactPerson() {
    const id = this.route.snapshot.paramMap.get('id');
    const agreementId = this.route.snapshot.paramMap.get('agreementId');
    this.router.navigate([
      `/agreement/activities/wizard-agreement/add-agreement-contact-person/${id}/${agreementId}`,
    ]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteAgreementContactPerson(
    agreementContactAgreementContactPersonId: any
  ): void {
    console.log(
      '[View] onDeleteAgreementContactPerson() – opening modal for id=',
      agreementContactAgreementContactPersonId
    );
    this.selectedIds = [agreementContactAgreementContactPersonId];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedAgreementContactPersonId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredAgreementContactPersons =
      this.originalAgreementContactPersons.filter(
        (agreementContactAgreementContactPerson) =>
          Object.values(agreementContactAgreementContactPerson).some((val) =>
            val?.toString().toLowerCase().includes(lower)
          )
      );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditAgreementContactPerson(
    agreementContactAgreementContactPerson: AgreementContactPerson
  ) {
    this.router.navigate(
      [
        '/crm/clients/edit-agreement-files',
        agreementContactAgreementContactPerson.id,
      ],
      {
        queryParams: {
          mode: 'edit',
          clientId: this.clientIdParam,
        },
      }
    );
  }
  onViewAgreementContactPerson(ct: AgreementContactPerson) {
    this.router.navigate(['/crm/clients/edit-agreement-files', ct.id], {
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
    this.agreementContactPersons$ = this.facade.items$;
  }
  onBulkDelete(ids: number[]) {
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
