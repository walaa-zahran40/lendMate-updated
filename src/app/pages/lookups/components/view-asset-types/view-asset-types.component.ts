import { Component, ViewChild } from '@angular/core';
import {
  combineLatest,
  filter,
  map,
  Observable,
  Subject,
  takeUntil,
  tap,
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
    // 1) kick off load + auto-reload on any AssetType create/update/delete
    this.facade.loadAll();
    this.facade.operationSuccess$
      .pipe(
        filter((op) => op?.entity === 'AssetType'),
        tap(() => this.facade.loadAll()),
        takeUntil(this.destroy$)
      )
      .subscribe();

    // 2) single, ordered pipeline:
    this.facade.all$
      .pipe(
        takeUntil(this.destroy$),

        // (a) log the raw stream
        tap((raw) => console.log('1️⃣ raw assetTypes$', raw)),

        // (b) keep only `isActive`
        map((arr) => arr.filter((a) => a.isActive)),
        tap((active) => console.log('2️⃣ after filter:', active)),

        // (c) inject the category name
        map((active) =>
          active.map((a) => ({
            ...a,
            assetTypeCategory: a.assetTypeCategory?.name ?? '—',
          }))
        ),
        tap((mapped) => console.log('3️⃣ after map:', mapped)),

        // (d) sort newest first
        map((mapped) => [...mapped].sort((a, b) => b.id - a.id)),
        tap((sorted) => console.log('4️⃣ after sort:', sorted))
      )
      .subscribe((final) => {
        this.originalAssetTypes = final;
        this.filteredAssetTypes = [...final];
        console.log('✅ final to table:', final);
      });
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
