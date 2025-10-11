import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, takeUntil, forkJoin, map, tap } from 'rxjs';
import { TableComponent } from '../../../../../../shared/components/table/table.component';
import { AgreementOfficer } from '../../../../store/agreement-officers/agreement-officer.model';
import { AgreementOfficersFacade } from '../../../../store/agreement-officers/agreement-officers.facade';
import { AgreementOfficersService } from '../../../../store/agreement-officers/agreement-officers.service';

@Component({
  selector: 'app-view-agreement-officers',
  standalone: false,
  templateUrl: './view-agreement-officers.component.html',
  styleUrl: './view-agreement-officers.component.scss',
})
export class ViewAgreementOfficersComponent {
  tableDataInside: AgreementOfficer[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;

  private destroy$ = new Subject<void>();

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'id', header: 'ID' },
    { field: 'agreementId', header: 'Agreement ID' },
    { field: 'officerId', header: 'Contact Person ID' },
  ];

  showDeleteModal = false;
  selectedAgreementOfficerId: number | null = null;

  originalAgreementOfficers: AgreementOfficer[] = [];
  filteredAgreementOfficers: AgreementOfficer[] = [];
  clientIdParam!: number;
  agreementOfficers$!: Observable<AgreementOfficer[]>;

  constructor(
    private router: Router,
    private facade: AgreementOfficersFacade,
    private route: ActivatedRoute,
    private svc: AgreementOfficersService
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
    this.agreementOfficers$ = this.facade.items$;

    this.agreementOfficers$
      .pipe(
        map((rows: any) => (Array.isArray(rows) ? rows : rows?.items ?? [])),
        tap((rows) => console.log('rows by agreementId', rows)),
        takeUntil(this.destroy$)
      )
      .subscribe((rows) => {
        // filtered = exactly what the API returned
        this.originalAgreementOfficers = rows;
        this.filteredAgreementOfficers = [...rows];
      });
  }

  onAddAgreementOfficer() {
    const id = this.route.snapshot.paramMap.get('id');
    const agreementId = this.route.snapshot.paramMap.get('agreementId');
    const clientId = this.route.snapshot.params['clientId'];
    this.router.navigate([
      `/agreement/activities/wizard-agreement/add-agreement-officer/${id}/${agreementId}/${clientId}`,
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
    const id = this.route.snapshot.paramMap.get('id');
    const agreementId = this.route.snapshot.paramMap.get('agreementId');
    const clientId = this.route.snapshot.params['clientId'];
    this.router.navigate(
      [
        '/agreement/activities/wizard-agreement/add-agreement-officer',
        agreementContactAgreementOfficer.id,
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
  onViewAgreementOfficer(ct: AgreementOfficer) {
    const id = this.route.snapshot.paramMap.get('id');
    const agreementId = this.route.snapshot.paramMap.get('agreementId');
    const clientId = this.route.snapshot.params['clientId'];
    this.router.navigate(
      [
        '/agreement/activities/wizard-agreement/add-agreement-officer',
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
    this.agreementOfficers$ = this.facade.items$;
  }
  onBulkDelete(ids: number[]) {
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
