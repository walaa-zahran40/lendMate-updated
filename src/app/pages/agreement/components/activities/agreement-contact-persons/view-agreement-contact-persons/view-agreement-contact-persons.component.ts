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
import { Store } from '@ngrx/store';
import { Area } from '../../../../../lookups/store/areas/area.model';
import { AreasFacade } from '../../../../../lookups/store/areas/areas.facade';
import { selectAllAreas } from '../../../../../lookups/store/areas/areas.selectors';
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
    { field: 'details', header: 'Details' },
    { field: 'detailsAR', header: 'Details AR' },
    { field: 'AreaName', header: 'Area Name' },
  ];
  showDeleteModal: boolean = false;
  selectedAgreementContactPersonId: number | null = null;
  originalAgreementContactPersons: AgreementContactPerson[] = [];
  filteredAgreementContactPersons: AgreementContactPerson[] = [];
  agreementContactPersons$!: Observable<AgreementContactPerson[]>;
  AreasList$!: Observable<Area[]>;

  constructor(
    private router: Router,
    private facade: AgreementContactPersonsFacade,
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

    this.facade.loadAgreementContactPersonsByClientId(this.clientIdParam);
    this.agreementContactPersons$ = this.facade.items$;

    combineLatest([this.agreementContactPersons$, this.AreasList$])
      .pipe(
        map(([agreementContactPersons, AreasList]) =>
          agreementContactPersons
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
        this.originalAgreementContactPersons = enriched;
        this.filteredAgreementContactPersons = [...enriched];
      });
  }

  onAddAgreementContactPerson() {
    const clientIdParam = this.route.snapshot.paramMap.get('clientId');

    this.router.navigate(['/crm/clients/add-client-addresses'], {
      queryParams: { mode: 'add', clientId: clientIdParam },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteAgreementContactPerson(agreementContactPersonId: any): void {
    console.log(
      '[View] onDeleteAgreementContactPerson() – opening modal for id=',
      agreementContactPersonId
    );
    this.selectedIds = [agreementContactPersonId];
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
      this.originalAgreementContactPersons.filter((agreementContactPerson) =>
        Object.values(agreementContactPerson).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
      );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditAgreementContactPerson(agreementContactPerson: AgreementContactPerson) {
    this.router.navigate(
      ['/crm/clients/edit-client-addresses', agreementContactPerson.id],
      {
        queryParams: {
          mode: 'edit',
          clientId: this.clientIdParam,
        },
      }
    );
  }
  onViewAgreementContactPerson(ct: AgreementContactPerson) {
    this.router.navigate(['/crm/clients/edit-client-addresses', ct.id], {
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
