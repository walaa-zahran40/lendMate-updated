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
  clientIdParam: any;
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
    private facade: AgreementContactPersonsFacade
  ) {}

  ngOnInit(): void {
    this.facade.loadAll();
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
