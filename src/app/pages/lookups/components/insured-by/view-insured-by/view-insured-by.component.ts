import { Component, ViewChild } from '@angular/core';
import { forkJoin, Observable, Subject, take, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { InsuredBy } from '../../../store/insured-by/insured-by.model';
import { InsuredByFacade } from '../../../store/insured-by/insured-by.facade';

@Component({
  selector: 'app-view-insured-by',
  standalone: false,
  templateUrl: './view-insured-by.component.html',
  styleUrl: './view-insured-by.component.scss',
})
export class ViewInsuredByComponent {
  tableDataInside: InsuredBy[] = [];
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
  selectedInsuredById: number | null = null;
  originalInsuredBy: InsuredBy[] = [];
  filteredInsuredBy: InsuredBy[] = [];
  InsuredBy$!: Observable<InsuredBy[]>;

  constructor(private router: Router, private facade: InsuredByFacade) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.InsuredBy$ = this.facade.history$;
    console.log('🟢 before loadHistory, current store value:');
    this.InsuredBy$.pipe(take(1)).subscribe((v) =>
      console.log('   store currently has:', v)
    );
    console.log('🟢 Calling loadHistory() to fetch InsuredBy');
    this.facade.loadHistory();

    this.InsuredBy$?.pipe(takeUntil(this.destroy$))?.subscribe((insured) => {
      // insured is now insured[], not any
      const sorted = [...insured].sort((a, b) => b?.id - a?.id);
      this.originalInsuredBy = sorted;
      this.filteredInsuredBy = [...sorted];
    });
  }

  onAddInsuredBy() {
    this.router.navigate(['/lookups/add-insured-by']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteInsuredBy(InsuredById: any): void {
    console.log(
      '[View] onDeleteInsuredBy() – opening modal for id=',
      InsuredById
    );
    this.selectedInsuredById = InsuredById;
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
    this.InsuredBy$ = this.facade.all$;
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
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedInsuredById = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredInsuredBy = this.originalInsuredBy.filter((InsuredBy) =>
      Object.values(InsuredBy).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditInsuredBy(InsuredBy: InsuredBy) {
    this.router.navigate(['/lookups/edit-insured-by', InsuredBy.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewInsuredBy(ct: InsuredBy) {
    this.router.navigate(['/lookups/edit-insured-by', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
