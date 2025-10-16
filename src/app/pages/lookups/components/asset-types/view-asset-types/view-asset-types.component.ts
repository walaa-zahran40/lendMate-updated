import { Component, ViewChild } from '@angular/core';
import { filter, map, Observable, Subject, takeUntil, forkJoin } from 'rxjs';
import { Router } from '@angular/router';

import { TableComponent } from '../../../../../shared/components/table/table.component';
import { AssetType } from '../../../store/asset-types/asset-type.model';
import { AssetTypesFacade } from '../../../store/asset-types/asset-types.facade';

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
    { field: 'isActive', header: 'Is Active' },
  ];

  showDeleteModal = false;
  selectedAssetTypeId: number | null = null;
  originalAssetTypes: AssetType[] = [];
  filteredAssetTypes: AssetType[] = [];
  assetTypes$!: Observable<AssetType[]>;

  constructor(private router: Router, private facade: AssetTypesFacade) {}

  ngOnInit(): void {
    // 1️⃣ Kick off loading AssetType history
    this.facade.loadHistory(); // ⬅️ Replace `loadAll()` with `loadHistory()`

    this.assetTypes$ = this.facade.history$;
    this.assetTypes$
      .pipe(
        filter((arr) => arr.length > 0), // ⬅️ ignore the initial empty array
        takeUntil(this.destroy$)
      )
      .subscribe((assetTypes) => {
        console.log('🟢 Loaded asset types:', assetTypes);
        const sorted = [...assetTypes].sort((a, b) => b?.id - a?.id);
        this.originalAssetTypes = sorted;
        this.filteredAssetTypes = [...sorted];
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
    this.selectedIds = [assetTypesId];
    this.showDeleteModal = true;
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
    this.assetTypes$ = this.facade.all$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
