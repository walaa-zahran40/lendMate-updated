import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Observable,
  Subject,
  combineLatest,
  filter,
  forkJoin,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { TableComponent } from '../../../../../../../shared/components/table/table.component';
import { MandateFee } from '../../../../store/mandate-fees/mandate-fee.model';
import { MandateFeesFacade } from '../../../../store/mandate-fees/mandate-fees.facade';
import { FeeTypesFacade } from '../../../../../../lookups/store/fee-types/fee-types.facade';

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
  mandateFees$!: Observable<MandateFee[]>;
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'feeTypeName', header: 'Fee Type' },
    { field: 'actualAmount', header: 'Actual Amount' },
    { field: 'actualPercentage', header: 'Actual Percentage' },
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
    private route: ActivatedRoute,
    private feeTypesFacade: FeeTypesFacade
  ) {}

  ngOnInit() {
    console.log('route', this.route.snapshot);

    this.routeId = +this.route.snapshot.params['leasingId'];
    this.leasingRouteId = +this.route.snapshot.params['leasingMandatesId'];

    this.feeTypesFacade.loadAll();
    const feeTypes$ = this.feeTypesFacade.all$;

    // 🔁 Keep loading mandate fees until data comes
    this.facade.loadByMandateId(this.routeId);
    this.mandateFees$ = this.facade.items$;

    // 👇 Retry if data is not present
    this.mandateFees$
      .pipe(
        takeUntil(this.destroy$),
        filter((fees) => !!fees && fees.length > 0), // 👈 Wait until data is there
        switchMap((mandates) =>
          combineLatest([this.mandateFees$, feeTypes$]).pipe(
            map(([mandates, feeTypes]) =>
              mandates
                .slice()
                .sort((a, b) => b.id! - a.id!)
                .map((m) => ({
                  ...m,
                  feeTypeName:
                    feeTypes.find((ft) => ft.id === m.feeTypeId)?.name ||
                    'Unknown',
                }))
            )
          )
        ),

        tap((enriched) => {
          console.log('Final enriched mandate fees:', enriched);
          this.tableDataInside = enriched;
          this.originalMandateFees = enriched;
          this.filteredMandateFees = enriched;
        })
      )
      .subscribe();
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
      [
        '/crm/leasing-mandates/edit-mandate-fee',
        mandate.id,
        this.route.snapshot.params['leasingId'],
        this.route.snapshot.params['leasingMandatesId'],
      ],
      {
        queryParams: {
          mode: 'edit',
          leasingMandateId: this.route.snapshot.params['leasingMandatesId'],
        },
      }
    );
  }
  onViewMandateFees(mandate: MandateFee) {
    console.log('mandate', mandate);
    this.router.navigate(
      [
        '/crm/leasing-mandates/edit-mandate-fee',
        mandate.id,
        this.route.snapshot.params['leasingId'],
        this.route.snapshot.params['leasingMandatesId'],
      ],
      {
        queryParams: { mode: 'view' },
      }
    );
  }
  selectedIds: number[] = [];
  confirmDelete() {
    const deleteCalls = this.selectedIds.map((id) =>
      this.facade.delete(id, this.routeId)
    );

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
    this.mandateFees$ = this.facade.items$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
