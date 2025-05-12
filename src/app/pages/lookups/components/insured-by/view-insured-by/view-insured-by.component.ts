import { Component, ViewChild } from '@angular/core';
import { Observable, Subject, take, takeUntil } from 'rxjs';
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
  ];
  showDeleteModal: boolean = false;
  selectedInsuredById: number | null = null;
  originalInsuredBy: InsuredBy[] = [];
  filteredInsuredBy: InsuredBy[] = [];
  InsuredBy$!: Observable<InsuredBy[]>;

  constructor(private router: Router, private facade: InsuredByFacade) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.InsuredBy$ = this.facade.all$;
    console.log('🟢 before loadAll, current store value:');
    this.InsuredBy$.pipe(take(1)).subscribe((v) =>
      console.log('   store currently has:', v)
    );
    console.log('🟢 Calling loadAll() to fetch InsuredBy');
    this.facade.loadAll();

    this.InsuredBy$?.pipe(takeUntil(this.destroy$))?.subscribe((insured) => {
      // insured is now insured[], not any
      const activeCodes = insured.filter((code) => code.isActive);
      const sorted = [...activeCodes].sort((a, b) => b?.id - a?.id);
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

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedInsuredById
    );
    if (this.selectedInsuredById !== null) {
      this.facade.delete(this.selectedInsuredById);
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
