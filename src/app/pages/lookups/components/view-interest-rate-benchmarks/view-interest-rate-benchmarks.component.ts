import { Component, ViewChild } from '@angular/core';
import { CompanyTypes } from '../../../../shared/interfaces/company-types.interface';
import { InterestRateBenchMark } from '../../store/interest-rate-benchmarks/interest-rate-benchmark.model';
import { Router } from '@angular/router';
import { Subject, Observable, take, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { InterestRateBenchMarksFacade } from '../../store/interest-rate-benchmarks/interest-rate-benchmarks.facade';

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
    this.InterestRateBenchmarks$ = this.facade.all$;
    console.log('🟢 before loadAll, current store value:');
    this.InterestRateBenchmarks$.pipe(take(1)).subscribe((v) =>
      console.log('   store currently has:', v)
    );
    console.log('🟢 Calling loadAll() to fetch InterestRateBenchMarks');
    this.facade.loadAll();

    this.InterestRateBenchmarks$?.pipe(takeUntil(this.destroy$)).subscribe(
      (InterestRateBenchmarks) => {
        console.log(
          '🟢 subscribe: received InterestRateBenchMarks array:',
          InterestRateBenchmarks
        );

        // preserve immutability, then sort by id descending
        const sorted = [...InterestRateBenchmarks].sort((a, b) => b.id - a.id);
        console.log('🟢 sorted (by id desc):', sorted);

        this.originalInterestRateBenchMark = sorted;
        console.log(
          '🟢 originalInterestRateBenchMark set to:',
          this.originalInterestRateBenchMark
        );

        this.filteredInterestRateBenchmarks = [...sorted];
        console.log(
          '🟢 filteredInterestRateBenchmarks set to:',
          this.filteredInterestRateBenchmarks
        );
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

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedInterestRateBenchMarkId
    );
    if (this.selectedInterestRateBenchMarkId !== null) {
      this.facade.delete(this.selectedInterestRateBenchMarkId);
      console.log('[View] confirmDelete() – facade.delete() called');
    } else {
      console.warn('[View] confirmDelete() – no id to delete');
    }
    this.resetDeleteModal();
  }
  cancelDelete() {
    this.resetDeleteModal();
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
