import { Component, ViewChild } from '@angular/core';
import { InterestRateBenchMark } from '../../../store/interest-rate-benchmarks/interest-rate-benchmark.model';
import { Router } from '@angular/router';
import { Subject, Observable, take, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { InterestRateBenchMarksFacade } from '../../../store/interest-rate-benchmarks/interest-rate-benchmarks.facade';

@Component({
  selector: 'app-view-interest-rate-benchmarks',
  standalone: false,
  templateUrl: './view-interest-rate-benchmarks.component.html',
  styleUrl: './view-interest-rate-benchmarks.component.scss',
})
export class ViewInterestRateBenchmarksComponent {
  tableDataInside: InterestRateBenchMark[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'isActive', header: 'Is Active' },
  ];
  showDeleteModal: boolean = false;
  selectedInterestRateBenchMarkId: number | null = null;
  originalInterestRateBenchMark: InterestRateBenchMark[] = [];
  filteredInterestRateBenchmarks: InterestRateBenchMark[] = [];
  InterestRateBenchmarks$!: Observable<InterestRateBenchMark[]>;

  constructor(
    private router: Router,
    private facade: InterestRateBenchMarksFacade
  ) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.InterestRateBenchmarks$ = this.facade.history$;
    console.log('🟢 before loadHistory, current store value:');
    this.InterestRateBenchmarks$.pipe(take(1)).subscribe((v) =>
      console.log('   store currently has:', v)
    );
    console.log('🟢 Calling loadHistory() to fetch InterestRateBenchMarks');
    this.facade.loadHistory();

    this.InterestRateBenchmarks$?.pipe(takeUntil(this.destroy$))?.subscribe(
      (interest) => {
        // interest is now interest[], not any
        const sorted = [...interest].sort((a, b) => b?.id - a?.id);
        this.originalInterestRateBenchMark = sorted;
        this.filteredInterestRateBenchmarks = [...sorted];
      }
    );
  }

  onAddInterestRateBenchmark() {
    this.router.navigate(['/lookups/add-interest-rate-benchmarks']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteInterestRateBenchmark(InterestRateBenchMarkId: any): void {
    console.log(
      '[View] onDeleteInterestRateBenchMark() – opening modal for id=',
      InterestRateBenchMarkId
    );
    this.selectedInterestRateBenchMarkId = InterestRateBenchMarkId;
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
  cancelDelete() {
    this.resetDeleteModal();
  }

  refreshCalls() {
    this.facade.loadAll();
    this.InterestRateBenchmarks$ = this.facade.all$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedInterestRateBenchMarkId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredInterestRateBenchmarks =
      this.originalInterestRateBenchMark.filter((InterestRateBenchMarks) =>
        Object.values(InterestRateBenchMarks).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
      );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditInterestRateBenchmark(InterestRateBenchMark: InterestRateBenchMark) {
    this.router.navigate(
      ['/lookups/edit-interest-rate-benchmarks', InterestRateBenchMark.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }
  onViewInterestRateBenchmark(ct: InterestRateBenchMark) {
    this.router.navigate(['/lookups/edit-interest-rate-benchmarks', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
