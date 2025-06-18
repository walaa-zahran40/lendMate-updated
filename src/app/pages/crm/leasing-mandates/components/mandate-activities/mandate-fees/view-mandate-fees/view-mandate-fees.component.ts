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
import { TableComponent } from '../../../../../../../shared/components/table/table.component';
import { MandateFee } from '../../../../store/mandate-fees/mandate-fee.model';
import { MandateFeesFacade } from '../../../../store/mandate-fees/mandate-fees.facade';

@Component({
  selector: 'app-view-mandate-fees',
  standalone: false,
  templateUrl: './view-mandate-fees.component.html',
  styleUrl: './view-mandate-fees.component.scss',
})
export class ViewMandateFeesComponent {
  tableDataInside: MandateFee[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  mandateFees$ = this.facade.all$;
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'description', header: 'Description' },
    { field: 'termKey', header: 'Term Key' },
  ];
  showDeleteModal: boolean = false;
  selectedMandateFeeId: number | null = null;
  originalMandateFees: any[] = [];
  filteredMandateFees: MandateFee[] = [];
  contactPersonsDropdown: any;
  officersDropdown: any[] = [];
  languagesDropdown: any[] = [];
  routeId = this.route.snapshot.params['leasingId'];
  leasingRouteId = this.route.snapshot.params['leasingMandatesId'];
  constructor(
    private router: Router,
    private facade: MandateFeesFacade,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    console.log('route', this.route.snapshot);
    this.facade.loadById(this.routeId);
    combineLatest([this.mandateFees$])
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
        this.originalMandateFees = enriched;
        this.filteredMandateFees = enriched;
      });
  }

  onAddMandateFee() {
    this.router.navigate([
      `/crm/leasing-mandates/add-mandate-fee/${this.routeId}/${this.leasingRouteId}`,
    ]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteMandateFee(mandateFeesId: number): void {
    this.selectedIds = [mandateFeesId];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    this.showDeleteModal = false;
    this.selectedMandateFeeId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredMandateFees = this.originalMandateFees.filter((mandate) =>
      Object.values(mandate).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditMandateFee(mandate: MandateFee) {
    console.log('mandate', mandate);
    this.router.navigate(
      ['/crm/leasing-mandates/edit-mandate-fee', mandate.id, mandate.mandateId],
      {
        queryParams: {
          mode: 'edit',
        },
      }
    );
  }
  onViewMandateFees(mandate: MandateFee) {
    console.log('mandate', mandate);
    this.router.navigate(
      ['/crm/leasing-mandates/add-mandate-fee', mandate.id, mandate.mandateId],
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
    this.mandateFees$ = this.facade.all$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
