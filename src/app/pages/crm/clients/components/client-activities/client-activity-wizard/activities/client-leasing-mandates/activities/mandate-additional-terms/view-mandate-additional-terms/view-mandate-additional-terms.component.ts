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
import { TableComponent } from '../../../../../../../../../../../shared/components/table/table.component';
import { MandateAdditionalTerm } from '../../../../../../../../../leasing-mandates/store/mandate-additional-terms/mandate-additional-term.model';
import { MandateAdditionalTermsFacade } from '../../../../../../../../../leasing-mandates/store/mandate-additional-terms/mandate-additional-terms.facade';

@Component({
  selector: 'app-view-mandate-additional-terms',
  standalone: false,
  templateUrl: './view-mandate-additional-terms.component.html',
  styleUrl: './view-mandate-additional-terms.component.scss',
})
export class ViewMandateAdditionalTermsComponent {
  tableDataInside: MandateAdditionalTerm[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  mandateAdditionalTerms$ = this.facade.all$;
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'description', header: 'Description' },
    { field: 'termKey', header: 'Term Key' },
  ];
  showDeleteModal: boolean = false;
  selectedMandateAdditionalTermId: number | null = null;
  originalMandateAdditionalTerms: any[] = [];
  filteredMandateAdditionalTerms: MandateAdditionalTerm[] = [];
  contactPersonsDropdown: any;
  officersDropdown: any[] = [];
  languagesDropdown: any[] = [];
  routeId = this.route.snapshot.params['clientId'];
  leasingRouteId = this.route.snapshot.params['leasingMandatesId'];
  constructor(
    private router: Router,
    private facade: MandateAdditionalTermsFacade,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    console.log('route', this.route.snapshot);
    this.facade.loadById(this.leasingRouteId);
    combineLatest([this.mandateAdditionalTerms$])
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
              const fromMandate = m.clientView?.clientName;

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
        this.originalMandateAdditionalTerms = enriched;
        this.filteredMandateAdditionalTerms = enriched;
      });
  }

  onAddMandateAdditionalTerm() {
    this.router.navigate([
      `/crm/leasing-mandates/add-mandate-additional-term/${this.leasingRouteId}/${this.routeId}`,
    ]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteMandateAdditionalTerm(mandateAdditionalTermsId: number): void {
    this.selectedIds = [mandateAdditionalTermsId];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    this.showDeleteModal = false;
    this.selectedMandateAdditionalTermId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredMandateAdditionalTerms =
      this.originalMandateAdditionalTerms.filter((mandate) =>
        Object.values(mandate).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
      );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditMandateAdditionalTerm(mandate: MandateAdditionalTerm) {
    console.log('mandate', mandate);
    this.router.navigate(
      [
        '/crm/leasing-mandates/edit-mandate-additional-term',
        mandate.id,
        mandate.mandateId,
        mandate.mandate.clientId,
      ],
      {
        queryParams: {
          mode: 'edit',
        },
      }
    );
  }
  onViewMandateAdditionalTerms(mandate: MandateAdditionalTerm) {
    console.log('mandate', mandate);
    this.router.navigate(
      [
        '/crm/leasing-mandates/add-mandate-additional-term',
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
    this.mandateAdditionalTerms$ = this.facade.all$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
