import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, tap, map, Observable, combineLatest } from 'rxjs';
import { TableComponent } from '../../../../../../../shared/components/table/table.component';
import { Officer } from '../../../../../../organizations/store/officers/officer.model';
import { OfficersFacade } from '../../../../../../organizations/store/officers/officers.facade';
import { MandateOfficer } from '../../../../store/mandate-officers/mandate-officer.model';
import { MandateOfficersFacade } from '../../../../store/mandate-officers/mandate-officers.facade';
import { MandatesFacade } from '../../../../store/leasing-mandates/leasing-mandates.facade';

type TableRow = MandateOfficer & { officerName: string }; // 👈 enriched row

@Component({
  selector: 'app-view-mandate-officers',
  standalone: false,
  templateUrl: './view-mandate-officers.component.html',
  styleUrl: './view-mandate-officers.component.scss',
})
export class ViewMandateOfficersComponent implements OnInit, OnDestroy {
  @ViewChild('tableRef') tableRef!: TableComponent;

  first2 = 0;
  rows = 10;
  showFilters = false;

  leasingIdParam!: number | undefined; // domain mandateId for API
  mandateIdParam!: number | undefined; // URL helper only

  showDeleteModal = false;
  selectedMandateOfficerId: number | null = null;
  selectedIds: number[] = [];

  // enriched lists used by the table + search
  originalMandateOfficers: TableRow[] = [];
  filteredMandateOfficers: TableRow[] = [];

  // source streams
  mandateOfficers$!: Observable<MandateOfficer[]>;
  officers$!: Observable<Officer[]>;

  // show name in the grid
  readonly colsInside = [
    { field: 'clientName', header: 'Client' }, // ✅ new
    { field: 'officerName', header: 'Officer' }, // 👈 use officerName
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private facade: MandateOfficersFacade,
    private officersFacade: OfficersFacade,
    private leasingMandatesFacade: MandatesFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const leasingRaw = this.route.snapshot.paramMap.get('leasingId');
    const lmsRaw = this.route.snapshot.paramMap.get('leasingMandatesId');

    this.leasingIdParam = leasingRaw !== null ? Number(leasingRaw) : undefined; // e.g. 41
    this.mandateIdParam = lmsRaw !== null ? Number(lmsRaw) : undefined; // e.g. 2102

    if (
      this.leasingIdParam == null ||
      isNaN(this.leasingIdParam) ||
      this.mandateIdParam == null ||
      isNaN(this.mandateIdParam)
    )
      return;

    // load officers list once (for dictionary)
    this.officersFacade.loadAll();
    this.officers$ = this.officersFacade.items$;

    // load mandate officers by domain mandateId (= leasingId)
    const mandateIdForApi = this.leasingIdParam;
    this.facade.loadByMandate(mandateIdForApi);
    this.mandateOfficers$ =
      this.facade.selectOfficersByMandate(mandateIdForApi);
    this.leasingMandatesFacade.loadAll();

    // JOIN: enrich rows with officerName
    const mandate$ = this.leasingMandatesFacade.all$.pipe(
      map(
        (list: any[]) =>
          list.find((m) => m.mandateId === mandateIdForApi) ?? null
      )
    );
    combineLatest([this.mandateOfficers$, this.officers$, mandate$])
      .pipe(
        map(([rows, officers, mandate]): TableRow[] => {
          const officerDict = new Map<number, Officer>(
            officers.map((o) => [o.id as number, o])
          );
          const clientName =
            mandate?.clientView?.clientName ??
            mandate?.clientView?.clientNameAr ??
            '';

          return [...rows]
            .map((r) => ({
              ...r,
              officerName:
                (officerDict.get(r.officerId)?.name as string) ??
                (officerDict.get(r.officerId) as any)?.fullName ??
                `#${r.officerId}`,
              clientName, // ✅ same client for all rows in this mandate
            }))
            .sort((a, b) => (b?.id ?? 0) - (a?.id ?? 0));
        }),
        tap((sorted) => {
          this.originalMandateOfficers = sorted;
          this.filteredMandateOfficers = [...sorted];
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ——— navigation (unchanged) ———
  onAddMandateOfficer() {
    if (this.leasingIdParam == null || this.mandateIdParam == null) return;
    this.router.navigate([
      '/crm/leasing-mandates/mandate-officers/add',
      this.leasingIdParam,
      this.mandateIdParam,
    ]);
  }

  onEditMandateOfficer(officer: MandateOfficer) {
    if (this.leasingIdParam == null || this.mandateIdParam == null) return;
    this.router.navigate([
      '/crm/leasing-mandates/mandate-officers/edit',
      this.leasingIdParam,
      this.mandateIdParam,
      officer.id,
    ]);
  }

  onViewMandateOfficer(officer: MandateOfficer) {
    if (this.leasingIdParam == null || this.mandateIdParam == null) return;
    this.router.navigate([
      '/crm/leasing-mandates/mandate-officers/view',
      this.leasingIdParam,
      this.mandateIdParam,
      officer.id,
    ]);
  }

  onDeleteMandateOfficer(id: number): void {
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
      this.facade.loadByMandate(this.leasingIdParam); // use domain id
  }

  resetDeleteModal() {
    this.showDeleteModal = false;
    this.selectedMandateOfficerId = null;
    this.selectedIds = [];
  }

  onSearch(keyword: string) {
    const lower = keyword?.toLowerCase() ?? '';
    if (!lower) {
      this.filteredMandateOfficers = [...this.originalMandateOfficers];
      return;
    }
    this.filteredMandateOfficers = this.originalMandateOfficers.filter((row) =>
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
      this.facade.loadByMandate(this.leasingIdParam);
  }
}
