import { Component, ViewChild } from '@angular/core';
import { Observable, Subject, takeUntil, forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { BusinessLine } from '../../../store/business-lines/business-line.model';
import { BusinessLinesFacade } from '../../../store/business-lines/business-lines.facade';

@Component({
  selector: 'app-view-businessLines',
  standalone: false,
  templateUrl: './view-business-lines.component.html',
  styleUrl: './view-business-lines.component.scss',
})
export class ViewBusinessLinesComponent {
  tableDataInside: BusinessLine[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'lisenceStartDate', header: 'Lisence Start Date' },
    { field: 'isActive', header: 'Is Active' },
  ];

  showDeleteModal = false;
  selectedbusinessLineId: number | null = null;
  originalBusinessLines: BusinessLine[] = [];
  filteredBusinessLines: BusinessLine[] = [];
  businessLines$!: Observable<BusinessLine[]>;

  constructor(private router: Router, private facade: BusinessLinesFacade) {}

  ngOnInit() {
    console.log('🟢 ngOnInit: start loading businessLines');
    this.facade.loadHistory();
    this.businessLines$ = this.facade.history$;

    this.businessLines$
      ?.pipe(takeUntil(this.destroy$))
      ?.subscribe((business) => {
        // products is now rentStructureType[], not any
        const sorted = [...business].sort((a, b) => b?.id - a?.id);
        this.originalBusinessLines = sorted;
        this.filteredBusinessLines = [...sorted];
      });
  }

  onAddBusinessLine() {
    this.router.navigate(['/lookups/add-business-lines']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteBusinessLine(businessLineId: number): void {
    console.log(
      '[View] onDeleteBusinessLine() – opening modal for id=',
      businessLineId
    );
    this.selectedIds = [businessLineId];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedbusinessLineId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredBusinessLines = this.originalBusinessLines.filter(
      (businessLine) =>
        Object.values(businessLine).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditBusinessLine(businessLine: BusinessLine) {
    this.router.navigate(['/lookups/edit-business-lines', businessLine.id], {
      queryParams: { mode: 'edit' },
    });
  }

  onViewBusinessLine(businessLine: BusinessLine) {
    this.router.navigate(['/lookups/edit-business-lines', businessLine.id], {
      queryParams: { mode: 'view' },
    });
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
    this.businessLines$ = this.facade.all$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
