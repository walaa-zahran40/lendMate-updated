import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, combineLatest, takeUntil, tap, map, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../../../shared/components/table/table.component';
import { MandateOfficer } from '../../../../store/mandate-officers/mandate-officer.model';
import { MandateOfficersFacade } from '../../../../store/mandate-officers/mandate-officers.facade';

@Component({
  selector: 'app-view-mandate-officers',
  standalone: false,
  templateUrl: './view-mandate-officers.component.html',
  styleUrl: './view-mandate-officers.component.scss',
})
export class ViewMandateOfficersComponent {
  tableDataInside: MandateOfficer[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  mandateOfficers$ = this.facade.all$;
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'mandateId', header: 'Mandate' },
    { field: 'officerId', header: 'Officer' },
  ];
  showDeleteModal: boolean = false;
  selectedMandateOfficerId: number | null = null;
  originalMandateOfficers: any[] = [];
  filteredMandateOfficers: MandateOfficer[] = [];
  contactPersonsDropdown: any;
  officersDropdown: any[] = [];
  languagesDropdown: any[] = [];
  routeId = this.route.snapshot.params['leasingId'];
  leasingRouteId = this.route.snapshot.params['leasingMandatesId'];
  constructor(
    private router: Router,
    private facade: MandateOfficersFacade,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    console.log('route', this.route.snapshot);
    this.facade.loadById(this.leasingRouteId);
    combineLatest([this.mandateOfficers$])
      .pipe(
        takeUntil(this.destroy$),

        // 1️⃣ Log the raw mandates array
        tap(([mandates]) => {
          console.group('🚀 combineLatest payload');
          console.log('Mandates:', mandates);
          console.groupEnd();
        }),

        // 2️⃣ Now map & flatten clientName out of clientView
        map(([mandates]) =>
          mandates
            .slice()
            .sort((a, b) => b.id! - a.id!)
            .map((m) => {
              return {
                ...m,
              };
            })
        ),

        // 3️⃣ Log the enriched array
        tap((enriched) => console.log('Enriched tableDataInside:', enriched))
      )
      .subscribe((enriched) => {
        this.tableDataInside = enriched;
        this.originalMandateOfficers = enriched;
        this.filteredMandateOfficers = enriched;
      });
  }

  onAddMandateOfficer() {
    this.router.navigate([
      `/crm/leasing-mandates/add-mandate-officer/${this.routeId}/${this.leasingRouteId}`,
    ]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteMandateOfficer(mandateOfficersId: number): void {
    this.selectedIds = [mandateOfficersId];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    this.showDeleteModal = false;
    this.selectedMandateOfficerId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredMandateOfficers = this.originalMandateOfficers.filter(
      (mandate) =>
        Object.values(mandate).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditMandateOfficer(mandate: MandateOfficer) {
    console.log('mandate', mandate);
    this.router.navigate(
      [
        '/crm/leasing-mandates/edit-mandate-officer',
        mandate.id,
        mandate.mandateId,
      ],
      {
        queryParams: {
          mode: 'edit',
        },
      }
    );
  }
  onViewMandateOfficers(mandate: MandateOfficer) {
    console.log('mandate', mandate);
    this.router.navigate(
      [
        '/crm/leasing-mandates/add-mandate-officer',
        mandate.id,
        mandate.mandateId,
      ],
      {
        queryParams: {
          mode: 'view',
        },
      }
    );
  }
  selectedIds: number[] = [];
  confirmDelete() {
    const deleteCalls = this.selectedIds.map((id) => this.facade.delete(id));

    forkJoin(deleteCalls).subscribe({
      next: () => {
        this.selectedIds = [];
        this.showDeleteModal = false; // CLOSE MODAL HERE
        this.refreshCalls();
      },
      error: (err) => {
        this.showDeleteModal = false; // STILL CLOSE IT
      },
    });
  }

  refreshCalls() {
    this.facade.loadAll();
    this.mandateOfficers$ = this.facade.all$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
