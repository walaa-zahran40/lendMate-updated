import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Subject,
  Observable,
  forkJoin,
  map,
  takeUntil,
  combineLatest,
  tap,
  filter,
} from 'rxjs';
import { TableComponent } from '../../../../../../shared/components/table/table.component';
import { AgreementContactPerson } from '../../../../store/agreement-contact-persons/agreement-contact-person.model';
import { AgreementContactPersonsFacade } from '../../../../store/agreement-contact-persons/agreement-contact-persons.facade';
import { ClientContactPersonsFacade } from '../../../../../crm/clients/store/client-contact-persons/client-contact-persons.facade';
import { AgreementContactPersonsService } from '../../../../store/agreement-contact-persons/agreement-contact-persons.service';

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
    { field: 'contactPersonId', header: 'Contact Person ID' },
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
    private svc: AgreementContactPersonsService
  ) {}

  ngOnInit() {
    this.clientIdParam = +this.route.snapshot.params['clientId'];
    const agreementIdStr = this.route.snapshot.paramMap.get('agreementId');
    console.log('agreementId raw:', agreementIdStr);
    const agreementId = Number(agreementIdStr);
    console.log(
      'agreementId parsed:',
      agreementId,
      'isNaN?',
      Number.isNaN(agreementId)
    );

    this.facade.loadByAgreementId(agreementId);
    this.agreementContactPersons$ = this.facade.items$;

    this.agreementContactPersons$
      .pipe(
        map((rows: any) => (Array.isArray(rows) ? rows : rows?.items ?? [])),
        tap((rows) => console.log('rows by agreementId', rows)),
        takeUntil(this.destroy$)
      )
      .subscribe((rows) => {
        // filtered = exactly what the API returned
        this.originalAgreementContactPersons = rows;
        this.filteredAgreementContactPersons = [...rows];
      });
  }

  onAddAgreementContactPerson() {
    const id = this.route.snapshot.paramMap.get('id');
    const agreementId = this.route.snapshot.paramMap.get('agreementId');
    const clientId = this.route.snapshot.params['clientId'];
    this.router.navigate([
      `/agreement/activities/wizard-agreement/add-agreement-contact-person/${id}/${agreementId}/${clientId}`,
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
    const id = this.route.snapshot.paramMap.get('id');
    const agreementId = this.route.snapshot.paramMap.get('agreementId');
    const clientId = this.route.snapshot.params['clientId'];
    this.router.navigate(
      [
        '/agreement/activities/wizard-agreement/add-agreement-contact-person',
        agreementContactAgreementContactPerson.id,
        id,
        agreementId,
        clientId,
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
    const id = this.route.snapshot.paramMap.get('id');
    const agreementId = this.route.snapshot.paramMap.get('agreementId');
    const clientId = this.route.snapshot.params['clientId'];
    this.router.navigate(
      [
        '/agreement/activities/wizard-agreement/add-agreement-contact-person',
        ct.id,
        id,
        agreementId,
        clientId,
      ],
      {
        queryParams: {
          mode: 'view',
          clientId: this.clientIdParam,
        },
      }
    );
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
