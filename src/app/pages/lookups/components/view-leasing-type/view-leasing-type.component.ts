import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, take, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { LeasingType } from '../../store/leasing-types/leasing-type.model';
import { LeasingTypesFacade } from '../../store/leasing-types/leasing-types.facade';

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
  ];
  showDeleteModal: boolean = false;
  selectedLeasingTypeId: number | null = null;
  originalLeasingType: LeasingType[] = [];
  filteredLeasingType: LeasingType[] = [];
  LeasingTypes$!: Observable<LeasingType[]>;

  constructor(private router: Router, private facade: LeasingTypesFacade) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.LeasingTypes$ = this.facade.all$;
    console.log('🟢 before loadAll, current store value:');
    this.LeasingTypes$.pipe(take(1)).subscribe((v) =>
      console.log('   store currently has:', v)
    );
    console.log('🟢 Calling loadAll() to fetch LeasingTypes');
    this.facade.loadAll();

    this.LeasingTypes$?.pipe(takeUntil(this.destroy$)).subscribe(
      (LeasingTypes) => {
        console.log('🟢 subscribe: received LeasingTypes array:', LeasingTypes);

        // preserve immutability, then sort by id descending
        const sorted = [...LeasingTypes].sort((a, b) => b.id - a.id);
        console.log('🟢 sorted (by id desc):', sorted);

        this.originalLeasingType = sorted;
        console.log('🟢 originalLeasingType set to:', this.originalLeasingType);

        this.filteredLeasingType = [...sorted];
        console.log('🟢 filteredLeasingType set to:', this.filteredLeasingType);
      }
    );
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
    this.selectedLeasingTypeId = LeasingTypeId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedLeasingTypeId
    );
    if (this.selectedLeasingTypeId !== null) {
      this.facade.delete(this.selectedLeasingTypeId);
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
