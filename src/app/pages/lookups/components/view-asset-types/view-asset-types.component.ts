import { Component, ViewChild } from '@angular/core';
import {
  combineLatest,
  filter,
  map,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { Router } from '@angular/router';

import { TableComponent } from '../../../../shared/components/table/table.component';
import { AssetType } from '../../store/asset-types/asset-type.model';
import { AssetTypesFacade } from '../../store/asset-types/asset-types.facade';

@Component({
  selector: 'app-view-asset-types',
  standalone: false,
  templateUrl: './view-asset-types.component.html',
  styleUrl: './view-asset-types.component.scss',
})
export class ViewAssetTypesComponent {
  tableDataInside: AssetType[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'assetTypeCategory', header: 'Category' },
  ];

  showDeleteModal = false;
  selectedAssetTypeId: number | null = null;
  originalAssetTypes: AssetType[] = [];
  filteredAssetTypes: AssetType[] = [];
  assetTypes$!: Observable<AssetType[]>;

  constructor(private router: Router, private facade: AssetTypesFacade) {}

  ngOnInit() {
    this.facade.loadAll();
    this.assetTypes$ = this.facade.all$;
    this.facade.operationSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter((success) => success?.entity === 'AssetType')
      )
      .subscribe(() => {
        this.facade.loadAll(); // refresh after any create/update/delete
      });
    this.assetTypes$.pipe(takeUntil(this.destroy$)).subscribe((assetTypes) => {
      console.log('asseyyu[e', assetTypes);
      const sorted = [...assetTypes].sort((a, b) => b.id - a.id);
      this.originalAssetTypes = sorted;
      this.filteredAssetTypes = [...sorted];
    });

    combineLatest([this.assetTypes$])
      .pipe(
        map(([assetTypes]) => {
          console.log('assettypessss', assetTypes);
          const mapped = assetTypes.map((ss) => {
            const assetTypeCategory = ss.assetTypeCategory?.name || '—';
            console.log(
              `🔍 Mapping Area ID ${ss.id} → Governorate Name: ${assetTypeCategory}`
            );
            return {
              ...ss,
              assetTypeCategory: assetTypeCategory, // or call it `categoryName` if more accurate
            };
          });

          const sorted = mapped.sort((a, b) => b.id - a.id);
          console.log('✅ Sorted mapped assetTypes:', sorted);
          return sorted;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (normalizedAssetTypes) => {
          console.log(
            '🟢 Final normalizedAssetTypes emitted to view:',
            normalizedAssetTypes
          );
          this.filteredAssetTypes = normalizedAssetTypes;
          this.originalAssetTypes = normalizedAssetTypes;
        },
        (error) => {
          console.error('❌ Error in combineLatest subscription:', error);
        }
      );
  }

  onAddAssetType() {
    this.router.navigate(['/lookups/add-asset-types']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteAssetType(assetTypesId: number): void {
    console.log(
      '[View] onDeleteAssetType() – opening modal for id=',
      assetTypesId
    );
    this.selectedAssetTypeId = assetTypesId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedAssetTypeId
    );
    if (this.selectedAssetTypeId !== null) {
      this.facade.delete(this.selectedAssetTypeId);
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
    this.selectedAssetTypeId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredAssetTypes = this.originalAssetTypes.filter((assetTypes) =>
      Object.values(assetTypes).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditAssetType(assetTypes: AssetType) {
    this.router.navigate(['/lookups/edit-asset-types', assetTypes.id], {
      queryParams: { mode: 'edit' },
    });
  }

  onViewAssetType(assetTypes: AssetType) {
    this.router.navigate(['/lookups/edit-asset-types', assetTypes.id], {
      queryParams: { mode: 'view' },
    });
  }
}
