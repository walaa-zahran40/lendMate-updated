import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, tap, map, Observable } from 'rxjs';
import { TableComponent } from '../../../../../../../shared/components/table/table.component';
import { MandateOfficer } from '../../../../store/mandate-officers/mandate-officer.model';
import { MandateOfficersFacade } from '../../../../store/mandate-officers/mandate-officers.facade';

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

  // route params
  leasingIdParam!: number | undefined; // NEW
  mandateIdParam!: number | undefined;

  showDeleteModal = false;
  selectedMandateOfficerId: number | null = null;
  selectedIds: number[] = [];

  originalMandateOfficers: MandateOfficer[] = [];
  filteredMandateOfficers: MandateOfficer[] = [];

  mandateOfficers$!: Observable<MandateOfficer[]>;

  readonly colsInside = [
    { field: 'mandateId', header: 'Mandate' },
    { field: 'officerId', header: 'Officer' },
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private facade: MandateOfficersFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const leasingRaw = this.route.snapshot.paramMap.get('leasingId');
    const lmsRaw = this.route.snapshot.paramMap.get('leasingMandatesId');

    this.leasingIdParam = leasingRaw !== null ? Number(leasingRaw) : undefined; // e.g. 41
    this.mandateIdParam = lmsRaw !== null ? Number(lmsRaw) : undefined; // e.g. 2102 (for URL only)

    if (
      this.leasingIdParam == null ||
      isNaN(this.leasingIdParam) ||
      this.mandateIdParam == null ||
      isNaN(this.mandateIdParam)
    )
      return;

    // ✅ Use leasingId for API calls because backend expects mandateId
    const mandateIdForApi = this.leasingIdParam;

    this.facade.loadByMandate(mandateIdForApi);
    this.mandateOfficers$ =
      this.facade.selectOfficersByMandate(mandateIdForApi);

    this.mandateOfficers$.pipe(/* ... */).subscribe((sorted) => {
      this.originalMandateOfficers = sorted;
      this.filteredMandateOfficers = [...sorted];
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // —— Routing updated to match new config ——

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
      officer.id, // :mandateOfficerId
    ]);
  }

  onViewMandateOfficer(officer: MandateOfficer) {
    if (this.leasingIdParam == null || this.mandateIdParam == null) return;
    this.router.navigate([
      '/crm/leasing-mandates/mandate-officers/view',
      this.leasingIdParam,
      this.mandateIdParam,
      officer.id, // :mandateOfficerId
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
    if (this.mandateIdParam != null)
      this.facade.loadByMandate(this.mandateIdParam);
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
    if (this.mandateIdParam != null)
      this.facade.loadByMandate(this.mandateIdParam);
  }
}
