import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, take, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { LicenseProvider } from '../../../store/license-providers/license-provider.model';
import { LicenseProvidersFacade } from '../../../store/license-providers/license-providers.facade';

@Component({
  selector: 'app-view-license-providers',
  standalone: false,
  templateUrl: './view-license-providers.component.html',
  styleUrl: './view-license-providers.component.scss',
})
export class ViewLicenseProvidersComponent {
  tableDataInside: LicenseProvider[] = [];
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
  selectedLicenseProviderId: number | null = null;
  originalLicenseProvider: LicenseProvider[] = [];
  filteredLicenseProvider: LicenseProvider[] = [];
  LicenseProviders$!: Observable<LicenseProvider[]>;

  constructor(private router: Router, private facade: LicenseProvidersFacade) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.LicenseProviders$ = this.facade.history$;
    console.log('🟢 before loadHistory, current store value:');
    this.LicenseProviders$.pipe(take(1)).subscribe((v) =>
      console.log('   store currently has:', v)
    );
    console.log('🟢 Calling loadHistory() to fetch LicenseProviders');
    this.facade.loadHistory();

    this.LicenseProviders$?.pipe(takeUntil(this.destroy$))?.subscribe(
      (license) => {
        // products is now rentStructureType[], not any
        const sorted = [...license].sort((a, b) => b?.id - a?.id);
        this.originalLicenseProvider = sorted;
        this.filteredLicenseProvider = [...sorted];
      }
    );
  }

  onAddLicenseProvider() {
    this.router.navigate(['/lookups/add-license-provider']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteLicenseProvider(LicenseProviderId: any): void {
    console.log(
      '[View] onDeleteLicenseProvider() – opening modal for id=',
      LicenseProviderId
    );
    this.selectedIds = [LicenseProviderId];
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
    this.LicenseProviders$ = this.facade.all$;
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
    this.selectedLicenseProviderId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredLicenseProvider = this.originalLicenseProvider.filter(
      (LicenseProviders) =>
        Object.values(LicenseProviders).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditLicenseProvider(LicenseProvider: LicenseProvider) {
    this.router.navigate(
      ['/lookups/edit-license-provider', LicenseProvider.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }
  onViewLicenseProvider(ct: LicenseProvider) {
    this.router.navigate(['/lookups/edit-license-provider', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
