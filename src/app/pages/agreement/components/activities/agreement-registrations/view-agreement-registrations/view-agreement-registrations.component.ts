import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Subject,
  Observable,
  takeUntil,
  forkJoin,
  combineLatest,
  map,
  startWith,
  tap,
} from 'rxjs';
import { TableComponent } from '../../../../../../shared/components/table/table.component';
import { Area } from '../../../../../lookups/store/areas/area.model';
import { AreasFacade } from '../../../../../lookups/store/areas/areas.facade';
import { selectAllAreas } from '../../../../../lookups/store/areas/areas.selectors';
import { Store } from '@ngrx/store';
import { AgreementRegistration } from '../../../../store/agreement-registrations/agreement-registration.model';
import { AgreementRegistrationsFacade } from '../../../../store/agreement-registrations/agreement-registrations.facade';

@Component({
  selector: 'app-view-agreement-registrations',
  standalone: false,
  templateUrl: './view-agreement-registrations.component.html',
  styleUrl: './view-agreement-registrations.component.scss',
})
export class ViewAgreementRegistrationsComponent {
  tableDataInside: AgreementRegistration[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  clientIdParam!: any;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'id', header: 'ID' },
    { field: 'agreementId', header: 'Agreement ID' },
    { field: 'registrationId', header: 'Registration ID' },
  ];
  showDeleteModal: boolean = false;
  selectedAgreementRegistrationId: number | null = null;
  originalAgreementRegistrations: AgreementRegistration[] = [];
  filteredAgreementRegistrations: AgreementRegistration[] = [];
  agreementRegistrations$!: Observable<AgreementRegistration[]>;
  routeId = this.route.snapshot.params['id'];
  constructor(
    private router: Router,
    private facade: AgreementRegistrationsFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // make sure it's a number
    const agreementId = Number(this.route.snapshot.params['id']);
    this.facade.loadOne(agreementId);

    this.agreementRegistrations$ = this.facade.items$.pipe(
      startWith([] as AgreementRegistration[]),
      tap((arr) =>
        console.log('[DEBUG] agreementRegistrations$ len →', arr.length)
      )
    );

    this.agreementRegistrations$
      .pipe(
        map((list) => [...list].sort((a, b) => b.id - a.id)),
        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        this.originalAgreementRegistrations = enriched;
        this.filteredAgreementRegistrations = [...enriched];
      });
  }

  onAddAgreementRegistration() {
    const id = this.route.snapshot.paramMap.get('id');

    this.router.navigate([
      `/agreement/activities/wizard-agreement/add-agreement-registration/${id}`,
    ]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteAgreementRegistration(
    agreementContactAgreementRegistrationId: any
  ): void {
    console.log(
      '[View] onDeleteAgreementRegistration() – opening modal for id=',
      agreementContactAgreementRegistrationId
    );
    this.selectedIds = [agreementContactAgreementRegistrationId];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedAgreementRegistrationId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredAgreementRegistrations =
      this.originalAgreementRegistrations.filter(
        (agreementContactAgreementRegistration) =>
          Object.values(agreementContactAgreementRegistration).some((val) =>
            val?.toString().toLowerCase().includes(lower)
          )
      );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditAgreementRegistration(
    agreementContactAgreementRegistration: AgreementRegistration
  ) {
    this.router.navigate(
      [
        '/crm/clients/edit-agreement-files',
        agreementContactAgreementRegistration.id,
      ],
      {
        queryParams: {
          mode: 'edit',
          clientId: this.clientIdParam,
        },
      }
    );
  }
  onViewAgreementRegistration(ct: AgreementRegistration) {
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
    this.agreementRegistrations$ = this.facade.items$;
  }
  onBulkDelete(ids: number[]) {
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
