import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Subject,
  combineLatest,
  filter,
  map,
  forkJoin,
  takeUntil,
  tap,
} from 'rxjs';
import { TableComponent } from '../../../../../../shared/components/table/table.component';
import { MandateWorkFlowHistory } from '../../../store/leasing-mandates/leasing-mandate.model';
import { MandatesFacade } from '../../../store/leasing-mandates/leasing-mandates.facade';

@Component({
  selector: 'app-view-mandate-work-flow-history',
  standalone: false,
  templateUrl: './view-mandate-work-flow-history.component.html',
  styleUrl: './view-mandate-work-flow-history.component.scss',
})
export class ViewMandateWorkFlowHistoryComponent {
  tableDataInside: MandateWorkFlowHistory[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  mandateWorkFlowHistoryList$ = this.facade.workflowHistory$;
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'mandateStatusActionName', header: 'Status Action' },
    { field: 'officerName', header: 'Officer' },
    { field: 'comment', header: 'Comments' },
    { field: 'date', header: 'Date' },
  ];
  showDeleteModal: boolean = false;
  selectedMandateAdditionalTermId: number | null = null;
  originalMandateWorkFlowHistory: any[] = [];
  filteredMandateWorkFlowHistory: MandateWorkFlowHistory[] = [];
  contactPersonsDropdown: any;
  officersDropdown: any[] = [];
  languagesDropdown: any[] = [];
  routeId = this.route.snapshot.params['clientId'];
  leasingRouteId = this.route.snapshot.params['leasingMandatesId'];

  mandateWorkFlowHistory: MandateWorkFlowHistory[] = [];
  loading$ = this.facade.loading$;
  constructor(
    private router: Router,
    private facade: MandatesFacade,
    private route: ActivatedRoute
  ) {}
  //   ngOnInit() {
  //   this.facade.loadWorkflowHistory(this.leasingRouteId);

  //   this.facade.workflowHistory$
  //     .pipe(
  //       takeUntil(this.destroy$),
  //       tap((items) => console.log('🚀 Loaded workflow history:', items)),
  //       map((items) =>
  //         items
  //           .slice()
  //           .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  //       )
  //     )
  //     .subscribe((sorted) => {
  //       this.mandateWorkFlowHistory = sorted;
  //     });
  // }

  ngOnInit() {
    this.facade.loadWorkflowHistory(this.leasingRouteId);

    combineLatest([this.mandateWorkFlowHistoryList$])
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
        this.originalMandateWorkFlowHistory = enriched;
        this.filteredMandateWorkFlowHistory = enriched;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredMandateWorkFlowHistory =
      this.originalMandateWorkFlowHistory.filter((mandate) =>
        Object.values(mandate).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
      );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
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
    this.mandateWorkFlowHistoryList$ = this.facade.workflowHistory$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
