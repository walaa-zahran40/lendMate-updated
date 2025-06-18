import { Component, ViewChild } from '@angular/core';
import { Observable, Subject, takeUntil, forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { AssetTypeCategory } from '../../../store/asset-type-categories/asset-type-category.model';
import { AssetTypeCategoriesFacade } from '../../../store/asset-type-categories/asset-type-categories.facade';
import { TableComponent } from '../../../../../shared/components/table/table.component';

@Component({
  selector: 'app-view-asset-type-categories',
  standalone: false,
  templateUrl: './view-asset-type-categories.component.html',
  styleUrl: './view-asset-type-categories.component.scss',
})
export class ViewAssetTypeCategoriesComponent {
  tableDataInside: AssetTypeCategory[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'limit', header: 'Limit' },
    { field: 'isActive', header: 'Is Active' },
  ];

  showDeleteModal = false;
  selectedAssetTypeCategoryId: number | null = null;
  originalAssetTypeCategories: AssetTypeCategory[] = [];
  filteredAssetTypeCategories: AssetTypeCategory[] = [];
  assetTypeCategories$!: Observable<AssetTypeCategory[]>;

  constructor(
    private router: Router,
    private facade: AssetTypeCategoriesFacade
  ) {}

  ngOnInit(): void {
    console.log('🟢 ngOnInit: start loading assetTypeCategory history');

    this.facade.loadHistory(); // ⬅️ New method in facade to dispatch loadAddressTypeHistory

    this.assetTypeCategories$ = this.facade.history$; // ⬅️ Observable for history (not all$)

    this.assetTypeCategories$
      ?.pipe(takeUntil(this.destroy$))
      ?.subscribe((assetTypeCategories) => {
        const sorted = [...assetTypeCategories].sort((a, b) => b?.id - a?.id);
        this.originalAssetTypeCategories = sorted;
        this.filteredAssetTypeCategories = [...sorted];
      });
  }

  onAddAssetTypeCategory() {
    this.router.navigate(['/lookups/add-asset-type-categories']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteAssetTypeCategory(assetTypeCategoriesId: number): void {
    console.log(
      '[View] onDeleteAssetTypeCategory() – opening modal for id=',
      assetTypeCategoriesId
    );
    this.selectedAssetTypeCategoryId = assetTypeCategoriesId;
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    this.showDeleteModal = false;
    this.selectedAssetTypeCategoryId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredAssetTypeCategories = this.originalAssetTypeCategories.filter(
      (assetTypeCategories) =>
        Object.values(assetTypeCategories).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditAssetTypeCategory(assetTypeCategories: AssetTypeCategory) {
    this.router.navigate(
      ['/lookups/edit-asset-type-categories', assetTypeCategories.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }

  onViewAssetTypeCategory(assetTypeCategories: AssetTypeCategory) {
    this.router.navigate(
      ['/lookups/edit-asset-type-categories', assetTypeCategories.id],
      {
        queryParams: { mode: 'view' },
      }
    );
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
    this.assetTypeCategories$ = this.facade.all$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
