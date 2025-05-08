import { Component, ViewChild } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { BusinessLine } from '../../store/business-lines/business-line.model';
import { BusinessLinesFacade } from '../../store/business-lines/business-lines.facade';

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
  ];

  showDeleteModal = false;
  selectedbusinessLineId: number | null = null;
  originalBusinessLines: BusinessLine[] = [];
  filteredBusinessLines: BusinessLine[] = [];
  businessLines$!: Observable<BusinessLine[]>;

  constructor(private router: Router, private facade: BusinessLinesFacade) {}

  ngOnInit() {
    console.log('🟢 ngOnInit: start loading businessLines');
    this.facade.loadAll();
    this.businessLines$ = this.facade.all$;

    this.businessLines$
      .pipe(takeUntil(this.destroy$))
      .subscribe((businessLines) => {
        const sorted = [...businessLines].sort((a, b) => b.id - a.id);
        console.log('🟢 sorted businessLines:', sorted);
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
    this.selectedbusinessLineId = businessLineId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedbusinessLineId
    );
    if (this.selectedbusinessLineId !== null) {
      this.facade.delete(this.selectedbusinessLineId);
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
}
