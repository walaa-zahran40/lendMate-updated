import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, filter, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Asset } from '../../../store/assets/asset.model';
import { AssetsFacade } from '../../../store/assets/assets.facade';

@Component({
  selector: 'app-view-assets',
  standalone: false,
  templateUrl: './view-assets.component.html',
  styleUrl: './view-assets.component.scss',
})
export class ViewAssetsComponent {
  tableDataInside: Asset[] = [];
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
  selectedAssetId: number | null = null;
  originalAssets: Asset[] = [];
  filteredAssets: Asset[] = [];
  assets$!: Observable<Asset[]>;
  history: Asset[] = [];

  constructor(private router: Router, private facade: AssetsFacade) {}
  ngOnInit() {
    // Load History
    this.facade.loadAll();
    this.assets$ = this.facade.all$;

    // Optionally bind filtered list
    this.facade.all$
      .pipe(filter((data) => !!data && data.length > 0))
      .subscribe((data) => {
        this.filteredAssets = data;
      });
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
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredAssets = this.originalAssets.filter((asset) =>
      Object.values(asset).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
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
