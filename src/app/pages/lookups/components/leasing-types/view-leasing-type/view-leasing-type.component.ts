import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, take, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { LeasingType } from '../../../store/leasing-types/leasing-type.model';
import { LeasingTypesFacade } from '../../../store/leasing-types/leasing-types.facade';

@Component({
  selector: 'app-view-leasing-type',
  standalone: false,
  templateUrl: './view-leasing-type.component.html',
  styleUrl: './view-leasing-type.component.scss',
})
export class ViewLeasingTypeComponent {
  tableDataInside: LeasingType[] = [];
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
  selectedLeasingTypeId: number | null = null;
  originalLeasingType: LeasingType[] = [];
  filteredLeasingType: LeasingType[] = [];
  LeasingTypes$!: Observable<LeasingType[]>;

  constructor(private router: Router, private facade: LeasingTypesFacade) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.LeasingTypes$ = this.facade.history$;
    console.log('🟢 before loadHistory, current store value:');
    this.LeasingTypes$.pipe(take(1)).subscribe((v) =>
      console.log('   store currently has:', v)
    );
    console.log('🟢 Calling loadHistory() to fetch LeasingTypes');
    this.facade.loadHistory();

    this.LeasingTypes$?.pipe(takeUntil(this.destroy$))?.subscribe((leasing) => {
      // products is now rentStructureType[], not any
      const sorted = [...leasing].sort((a, b) => b?.id - a?.id);
      this.originalLeasingType = sorted;
      this.filteredLeasingType = [...sorted];
    });
  }

  onAddLeasingType() {
    this.router.navigate(['/lookups/add-leasing-types']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteLeasingType(LeasingTypeId: any): void {
    console.log(
      '[View] onDeleteLeasingType() – opening modal for id=',
      LeasingTypeId
    );
    this.selectedIds = [LeasingTypeId];
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
    this.LeasingTypes$ = this.facade.all$;
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
    this.selectedLeasingTypeId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredLeasingType = this.originalLeasingType.filter((LeasingTypes) =>
      Object.values(LeasingTypes).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditLeasingType(LeasingType: LeasingType) {
    this.router.navigate(['/lookups/edit-leasing-types', LeasingType.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewLeasingType(ct: LeasingType) {
    this.router.navigate(['/lookups/edit-leasing-types', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
