import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  Subject,
  Observable,
  filter,
  forkJoin,
  combineLatest,
  map,
  tap,
  shareReplay,
} from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Asset, AssetViewModel } from '../../../store/assets/asset.model';
import { AssetsFacade } from '../../../store/assets/assets.facade';
import { AssetTypesFacade } from '../../../../lookups/store/asset-types/asset-types.facade';
interface AssetRowVM extends Asset {
  assetTypeName: string;
  assetTypeCode: string | null; // <-- STRING code like "IT_EQUIP"
}

@Component({
  selector: 'app-view-assets',
  standalone: false,
  templateUrl: './view-assets.component.html',
  styleUrl: './view-assets.component.scss',
})
export class ViewAssetsComponent {
  tableDataInside: Asset[] = [];
  private destroy$ = new Subject<void>();
  rows: number = 10;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'assetTypeName', header: 'Asset Type' },
    { field: 'description', header: 'Description (EN)' },
    { field: 'descriptionAr', header: 'الوصف (AR)' },
    { field: 'dateAcquired', header: 'Date Acquired' },
    { field: 'isActive', header: 'Active' },
  ];

  selectedAssetId: number | null = null;
  allAssets: AssetRowVM[] = [];
  filteredAssets: Asset[] = [];
  history: Asset[] = [];
  assets$!: Observable<Asset[]>;
  showFilters = false;
  first2 = 0;
  showDeleteModal = false;

  constructor(
    private router: Router,
    private facade: AssetsFacade,
    private assetTypesFacade: AssetTypesFacade
  ) {}
  ngOnInit() {
    this.facade.loadAll();
    this.assetTypesFacade.loadAll();

    this.assets$ = combineLatest([
      this.facade.all$, // Asset[]
      this.assetTypesFacade.all$, // AssetType[]
    ]).pipe(
      filter(
        ([assets, types]) => Array.isArray(assets) && Array.isArray(types)
      ),
      map(([assets, types]) => {
        const nameMap = new Map(types.map((t) => [t.id, t.name]));
        const codeMap = new Map(types.map((t) => [t.id, t.code])); // <-- add this
        const vm = assets.map((a) => ({
          ...a,
          assetTypeName: nameMap.get(a.assetTypeId) ?? '-',
          assetTypeCode: codeMap.get(a.assetTypeId) ?? null, // <-- add this
        }));
        return vm; // AssetViewModel[]
      }),
      tap((vm) => {
        this.allAssets = vm; // <-- needed for onSearch
        this.filteredAssets = vm; // <-- drives the table
      }),
      shareReplay(1)
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onAddAsset() {
    this.router.navigate(['/purchasing/assets/add-asset']);
  }
  onDeleteAsset(assetId: any): void {
    console.log('[View] onDeleteAsset() – opening modal for id=', assetId);
    this.selectedIds = [assetId];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedAssetId = null;
  }
  onSearch(term: string) {
    const q = (term || '').toLowerCase().trim();
    this.filteredAssets = !q
      ? this.allAssets.slice()
      : this.allAssets.filter(
          (a) =>
            (a.description ?? '').toLowerCase().includes(q) ||
            (a.descriptionAr ?? '').toLowerCase().includes(q) ||
            (a.assetTypeName ?? '').toLowerCase().includes(q)
        );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditAsset(asset: AssetViewModel) {
    this.router.navigate(['/purchasing/assets/edit-asset', asset.id], {
      queryParams: { mode: 'edit', typeCode: asset.assetTypeCode },
    });
  }

  onViewAsset(asset: AssetViewModel) {
    this.router.navigate(['/purchasing/assets/edit-asset', asset.id], {
      queryParams: { mode: 'view', typeCode: asset.assetTypeCode },
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
    this.assets$ = this.facade.all$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
