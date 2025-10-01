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
    { field: 'id', header: 'ID' },
    { field: 'agreementId', header: 'Agreement ID' },
    { field: 'officerId', header: 'Officer ID' },
  ];
  showDeleteModal: boolean = false;
  selectedAgreementOfficerId: number | null = null;
  originalAgreementOfficers: AgreementOfficer[] = [];
  filteredAgreementOfficers: AgreementOfficer[] = [];
  agreementOfficers$!: Observable<AgreementOfficer[]>;
  routeId = this.route.snapshot.params['id'];
  constructor(
    private router: Router,
    private facade: AgreementOfficersFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // make sure it's a number
    const agreementId = Number(this.route.snapshot.params['id']);
    this.facade.loadOne(agreementId);

    this.agreementOfficers$ = this.facade.items$.pipe(
      startWith([] as AgreementOfficer[]),
      tap((arr) => console.log('[DEBUG] agreementOfficers$ len →', arr.length))
    );

    this.agreementOfficers$
      .pipe(
        map((list) => [...list].sort((a, b) => b.id - a.id)),
        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        this.originalAgreementOfficers = enriched;
        this.filteredAgreementOfficers = [...enriched];
      });
  }

  onAddAgreementOfficer() {
    const id = this.route.snapshot.paramMap.get('id');

    this.router.navigate([
      `/agreement/activities/wizard-agreement/add-agreement-officer/${id}`,
    ]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteAgreementOfficer(agreementContactAgreementOfficerId: any): void {
    console.log(
      '[View] onDeleteAgreementOfficer() – opening modal for id=',
      agreementContactAgreementOfficerId
    );
    this.selectedIds = [agreementContactAgreementOfficerId];
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
      (agreementContactAgreementOfficer) =>
        Object.values(agreementContactAgreementOfficer).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditAgreementOfficer(agreementContactAgreementOfficer: AgreementOfficer) {
    this.router.navigate(
      [
        '/crm/clients/edit-agreement-files',
        agreementContactAgreementOfficer.id,
      ],
      {
        queryParams: {
          mode: 'edit',
          clientId: this.clientIdParam,
        },
      }
    );
  }
  onViewAgreementOfficer(ct: AgreementOfficer) {
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
    this.agreementOfficers$ = this.facade.items$;
  }
  onBulkDelete(ids: number[]) {
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
