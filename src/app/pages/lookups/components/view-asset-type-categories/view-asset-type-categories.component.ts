import { Component, ViewChild } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { AssetTypeCategory } from '../../store/asset-type-categories/asset-type-category.model';
import { AssetTypeCategoriesFacade } from '../../store/asset-type-categories/asset-type-categories.facade';
import { TableComponent } from '../../../../shared/components/table/table.component';

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

  ngOnInit() {
    console.log('🟢 ngOnInit: start loading assetTypeCategories');
    this.facade.loadAll();
    this.assetTypeCategories$ = this.facade.items$;

    this.assetTypeCategories$
      .pipe(takeUntil(this.destroy$))
      .subscribe((assetTypeCategories) => {
        const sorted = [...assetTypeCategories].sort((a, b) => b.id - a.id);
        console.log('🟢 sorted assetTypeCategories:', sorted);
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

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedAssetTypeCategoryId
    );
    if (this.selectedAssetTypeCategoryId !== null) {
      this.facade.delete(this.selectedAssetTypeCategoryId);
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
}
