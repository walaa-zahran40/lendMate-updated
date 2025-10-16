import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, take, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { LicenseType } from '../../../store/license-types/license-type.model';
import { LicenseTypesFacade } from '../../../store/license-types/license-types.facade';

@Component({
  selector: 'app-view-license-types',
  standalone: false,
  templateUrl: './view-license-types.component.html',
  styleUrl: './view-license-types.component.scss',
})
export class ViewLicenseTypesComponent {
  tableDataInside: LicenseType[] = [];
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
  selectedLicenseTypeId: number | null = null;
  originalLicenseType: LicenseType[] = [];
  filteredLicenseType: LicenseType[] = [];
  LicenseTypes$!: Observable<LicenseType[]>;

  constructor(private router: Router, private facade: LicenseTypesFacade) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.LicenseTypes$ = this.facade.history$;
    console.log('🟢 before loadHistory, current store value:');
    this.LicenseTypes$.pipe(take(1)).subscribe((v) =>
      console.log('   store currently has:', v)
    );
    console.log('🟢 Calling loadHistory() to fetch LicenseTypes');
    this.facade.loadHistory();

    this.LicenseTypes$?.pipe(takeUntil(this.destroy$))?.subscribe((license) => {
      // products is now rentStructureType[], not any
      const sorted = [...license].sort((a, b) => b?.id - a?.id);
      this.originalLicenseType = sorted;
      this.filteredLicenseType = [...sorted];
    });
  }

  onAddLicenseType() {
    this.router.navigate(['/lookups/add-license-type']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteLicenseType(LicenseTypeId: any): void {
    console.log(
      '[View] onDeleteLicenseType() – opening modal for id=',
      LicenseTypeId
    );
    this.selectedIds = [LicenseTypeId];
    this.showDeleteModal = true;
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
    this.LicenseTypes$ = this.facade.all$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedLicenseTypeId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredLicenseType = this.originalLicenseType.filter((LicenseTypes) =>
      Object.values(LicenseTypes).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditLicenseType(LicenseType: LicenseType) {
    this.router.navigate(['/lookups/edit-license-type', LicenseType.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewLicenseType(ct: LicenseType) {
    this.router.navigate(['/lookups/edit-license-type', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
