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
} from 'rxjs';
import { TableComponent } from '../../../../../../shared/components/table/table.component';
import { AgreementContactPerson } from '../../../../store/agreement-contact-persons/agreement-contact-person.model';
import { AgreementContactPersonsFacade } from '../../../../store/agreement-contact-persons/agreement-contact-persons.facade';

@Component({
  selector: 'app-view-agreement-contact-persons',
  standalone: false,
  templateUrl: './view-agreement-contact-persons.component.html',
  styleUrl: './view-agreement-contact-persons.component.scss',
})
export class ViewAgreementContactPersonsComponent {
  tableDataInside: AgreementContactPerson[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  clientIdParam!: any;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'filePath', header: 'Agreemnt File Path' },
    { field: 'expiryDate', header: 'Agreement Expiry Date' },
  ];
  showDeleteModal: boolean = false;
  selectedAgreementContactPersonId: number | null = null;
  originalAgreementContactPersons: AgreementContactPerson[] = [];
  filteredAgreementContactPersons: AgreementContactPerson[] = [];
  agreementContactPersons$!: Observable<AgreementContactPerson[]>;
  routeId = this.route.snapshot.params['id'];
  constructor(
    private router: Router,
    private facade: AgreementContactPersonsFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // make sure it's a number
    const agreementId = Number(this.route.snapshot.params['id']);
    this.facade.loadOne(agreementId);

    this.agreementContactPersons$ = this.facade.items$.pipe(
      // Debug what comes through
      tap((raw) => console.log('[DEBUG] agreementContactPersons$ raw →', raw)),

      // Always yield an array, even if the slice is not ready yet
      startWith([] as AgreementContactPerson[]),

      // If the facade sometimes emits a wrapped response { items, totalCount }
      map((res: any) => (Array.isArray(res) ? res : res?.items ?? []))
    );

    this.agreementContactPersons$
      .pipe(
        map((list) => [...list].sort((a, b) => b.id - a.id)),
        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        this.originalAgreementContactPersons = enriched;
        this.filteredAgreementContactPersons = [...enriched];
      });
  }

  onAddAgreementContactPerson() {
    const id = this.route.snapshot.paramMap.get('id');

    this.router.navigate([
      `/agreement/activities/wizard-agreement/add-agreement-contact-person/${id}`,
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
