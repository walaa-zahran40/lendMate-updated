import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, combineLatest, of, map, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { FirstClaimStatus } from '../../../store/first-claim-statuses/first-claim-status.model';
import { FirstClaimStatusesFacade } from '../../../store/first-claim-statuses/first-claim-statuses.facade';

@Component({
  selector: 'app-view-first-claim-statuses',
  standalone: false,
  templateUrl: './view-first-claim-statuses.component.html',
  styleUrl: './view-first-claim-statuses.component.scss',
})
export class ViewFirstClaimStatusesComponent {
  tableDataInside: FirstClaimStatus[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'isActive', header: 'Is Active' },
  ];

  showDeleteModal = false;
  selectedFirstClaimStatusId: number | null = null;
  originalFirstClaimStatuses: FirstClaimStatus[] = [];
  filteredFirstClaimStatuses: FirstClaimStatus[] = [];
  firstClaimStatuses$!: any;
  feeCalcList$: any;
  constructor(
    private router: Router,
    private facade: FirstClaimStatusesFacade
  ) {}

  ngOnInit() {
    // Initialize observables
    this.firstClaimStatuses$ = this.facade.firstClaimStatusHistory$;

    // Trigger loading
    this.facade.loadHistory();

    // Combine fee types with their corresponding calculation type names
    combineLatest<[FirstClaimStatus[], any[]]>([
      this.firstClaimStatuses$ ?? of([]),
      this.feeCalcList$ ?? of([]),
    ])
      .pipe(
        map(([firstClaimStatuses]) => {
          console.log('📦 Raw firstClaimStatuses:', firstClaimStatuses);

          return firstClaimStatuses
            .map((ss) => {
              console.log('ss', ss);

              return {
                ...ss,
              };
            })
            .filter((ft) => ft.isActive)
            .sort((a, b) => b.id - a.id);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((result) => {
        console.log('result', result);
        this.filteredFirstClaimStatuses = result;
        this.originalFirstClaimStatuses = result;
      });
  }

  onAddFirstClaimStatus() {
    this.router.navigate(['/lookups/add-first-claim-status']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteFirstClaimStatus(firstClaimStatusesId: number): void {
    this.selectedIds = [firstClaimStatusesId];
    this.showDeleteModal = true;
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
    this.firstClaimStatuses$ = this.facade.all$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    this.showDeleteModal = false;
    this.selectedFirstClaimStatusId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredFirstClaimStatuses = this.originalFirstClaimStatuses.filter(
      (firstClaimStatuses) =>
        Object.values(firstClaimStatuses).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditFirstClaimStatus(firstClaimStatuses: FirstClaimStatus) {
    this.router.navigate(
      ['/lookups/edit-first-claim-status', firstClaimStatuses.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }

  onViewFirstClaimStatus(firstClaimStatuses: FirstClaimStatus) {
    this.router.navigate(
      ['/lookups/edit-first-claim-status', firstClaimStatuses.id],
      {
        queryParams: { mode: 'view' },
      }
    );
  }
}
