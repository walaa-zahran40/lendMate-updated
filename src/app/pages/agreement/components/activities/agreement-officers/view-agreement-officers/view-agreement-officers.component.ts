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
import { AgreementOfficer } from '../../../../store/agreement-officers/agreement-officer.model';
import { AgreementOfficersFacade } from '../../../../store/agreement-officers/agreement-officers.facade';

@Component({
  selector: 'app-view-agreement-officers',
  standalone: false,
  templateUrl: './view-agreement-officers.component.html',
  styleUrl: './view-agreement-officers.component.scss',
})
export class ViewAgreementOfficersComponent {
  tableDataInside: AgreementOfficer[] = [];
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
  selectedAgreementOfficerId: number | null = null;
  originalAgreementOfficers: AgreementOfficer[] = [];
  filteredAgreementOfficers: AgreementOfficer[] = [];
  agreementOfficers$!: Observable<AgreementOfficer[]>;
  AreasList$!: Observable<Area[]>;

  constructor(
    private router: Router,
    private facade: AgreementOfficersFacade,
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

    this.facade.loadAgreementOfficersByClientId(this.clientIdParam);
    this.agreementOfficers$ = this.facade.items$;

    combineLatest([this.agreementOfficers$, this.AreasList$])
      .pipe(
        map(([agreementOfficers, AreasList]) =>
          agreementOfficers
            .map((address) => ({
              ...address,
            }))
            .sort((a, b) => b.id - a.id)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        this.originalAgreementOfficers = enriched;
        this.filteredAgreementOfficers = [...enriched];
      });
  }

  onAddAgreementOfficer() {
    const clientIdParam = this.route.snapshot.paramMap.get('clientId');

    this.router.navigate(['/crm/clients/add-client-addresses'], {
      queryParams: { mode: 'add', clientId: clientIdParam },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteAgreementOfficer(agreementOfficerId: any): void {
    console.log(
      '[View] onDeleteAgreementOfficer() – opening modal for id=',
      agreementOfficerId
    );
    this.selectedIds = [agreementOfficerId];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedAgreementOfficerId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredAgreementOfficers = this.originalAgreementOfficers.filter(
      (agreementOfficer) =>
        Object.values(agreementOfficer).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditAgreementOfficer(agreementOfficer: AgreementOfficer) {
    this.router.navigate(
      ['/crm/clients/edit-client-addresses', agreementOfficer.id],
      {
        queryParams: {
          mode: 'edit',
          clientId: this.clientIdParam,
        },
      }
    );
  }
  onViewAgreementOfficer(ct: AgreementOfficer) {
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
    this.agreementOfficers$ = this.facade.items$;
  }
  onBulkDelete(ids: number[]) {
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
