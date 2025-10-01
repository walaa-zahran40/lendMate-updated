import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Subject,
  Observable,
  takeUntil,
  forkJoin,
  combineLatest,
  map,
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
    { field: 'details', header: 'Details' },
    { field: 'detailsAR', header: 'Details AR' },
    { field: 'AreaName', header: 'Area Name' },
  ];
  showDeleteModal: boolean = false;
  selectedAgreementRegistrationId: number | null = null;
  originalAgreementRegistrations: AgreementRegistration[] = [];
  filteredAgreementRegistrations: AgreementRegistration[] = [];
  agreementRegistrations$!: Observable<AgreementRegistration[]>;
  AreasList$!: Observable<Area[]>;

  constructor(
    private router: Router,
    private facade: AgreementRegistrationsFacade,
    private areaFacade: AreasFacade,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    const raw = this.route.snapshot.paramMap.get('clientId');
    this.clientIdParam = raw !== null ? Number(raw) : undefined;

    this.areaFacade.loadAll();
    this.AreasList$ = this.store.select(selectAllAreas);
    this.store.dispatch({ type: '[Areas] Load All' });

    this.facade.loadAgreementRegistrationsByClientId(this.clientIdParam);
    this.agreementRegistrations$ = this.facade.items$;

    combineLatest([this.agreementRegistrations$, this.AreasList$])
      .pipe(
        map(([agreementRegistrations, AreasList]) =>
          agreementRegistrations
            .map((address) => ({
              ...address,
              AreaName:
                AreasList.find((c) => c.id === address.areaId)?.name || '—',
            }))
            .filter((address) => address.isActive)
            .sort((a, b) => b.id - a.id)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        this.originalAgreementRegistrations = enriched;
        this.filteredAgreementRegistrations = [...enriched];
      });
  }

  onAddAgreementRegistration() {
    const clientIdParam = this.route.snapshot.paramMap.get('clientId');

    this.router.navigate(['/crm/clients/add-client-registrations'], {
      queryParams: { mode: 'add', clientId: clientIdParam },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteAgreementRegistration(agreementRegistrationId: any): void {
    console.log(
      '[View] onDeleteAgreementRegistration() – opening modal for id=',
      agreementRegistrationId
    );
    this.selectedIds = [agreementRegistrationId];
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
      this.originalAgreementRegistrations.filter((agreementRegistration) =>
        Object.values(agreementRegistration).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
      );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditAgreementRegistration(agreementRegistration: AgreementRegistration) {
    this.router.navigate(
      ['/crm/clients/edit-client-registrations', agreementRegistration.id],
      {
        queryParams: {
          mode: 'edit',
          clientId: this.clientIdParam,
        },
      }
    );
  }
  onViewAgreementRegistration(ct: AgreementRegistration) {
    this.router.navigate(['/crm/clients/edit-client-registrations', ct.id], {
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
