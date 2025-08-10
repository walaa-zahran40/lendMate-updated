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
import {
  Asset,
  AssetType,
  AssetViewModel,
} from '../../../store/assets/asset.model';
import { AssetsFacade } from '../../../store/assets/assets.facade';
import { AssetTypesFacade } from '../../../../lookups/store/asset-types/asset-types.facade';

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
  allAssets: AssetViewModel[] = [];
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
    // Load History
    this.facade.loadAll();
    this.assetTypesFacade.loadAll(); // loads asset types

    this.assets$ = this.facade.all$;

    this.assets$ = combineLatest([
      this.facade.all$, // Asset[]
      this.assetTypesFacade.all$, // AssetType[]
    ]).pipe(
      filter(([assets, types]) => !!assets?.length && !!types?.length),
      map(([assets, types]) => {
        const typeMap = new Map(types.map((t) => [t.id, t.name]));
        return assets.map((a) => ({
          ...a,
          assetTypeName: typeMap.get(a.assetTypeId) ?? '-',
        }));
      }),
      tap((data) => (this.filteredAssets = data)),
      shareReplay(1)
    );
  }

  onAddAsset() {
    this.router.navigate(['/purchasing/assets/add-asset']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
    if (!q) {
      this.filteredAssets = this.allAssets.slice();
      return;
    }
    this.filteredAssets = this.allAssets.filter(
      (a) =>
        (a.code ?? '').toLowerCase().includes(q) ||
        (a.description ?? '').toLowerCase().includes(q) ||
        (a.descriptionAr ?? '').toLowerCase().includes(q) ||
        (a.assetTypeName ?? '').toLowerCase().includes(q)
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditAsset(asset: Asset) {
    this.router.navigate(['/purchasing/assets/edit-asset', asset.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewAsset(ct: Asset) {
    this.router.navigate(['/purchasing/assets/edit-asset', ct.id], {
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
    this.assets$ = this.facade.all$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
