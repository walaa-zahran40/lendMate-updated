import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, take, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Sector } from '../../../store/sectors/sector.model';
import { SectorsFacade } from '../../../store/sectors/sectors.facade';

@Component({
  selector: 'app-view-sectors',
  standalone: false,
  templateUrl: './view-sectors.component.html',
  styleUrl: './view-sectors.component.scss',
})
export class ViewSectorsComponent {
  tableDataInside: Sector[] = [];
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
  selectedSectorId: number | null = null;
  originalSector: Sector[] = [];
  filteredSector: Sector[] = [];
  Sectors$!: Observable<Sector[]>;

  constructor(private router: Router, private facade: SectorsFacade) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.Sectors$ = this.facade.history$;
    console.log('🟢 before loadHistory, current store value:');
    this.Sectors$.pipe(take(1)).subscribe((v) =>
      console.log('   store currently has:', v)
    );
    console.log('🟢 Calling loadHistory() to fetch Sectors');
    this.facade.loadHistory();

    this.Sectors$?.pipe(takeUntil(this.destroy$))?.subscribe((sectors) => {
      // sectors is now Sector[], not any
      const sorted = [...sectors].sort((a, b) => b?.id - a?.id);
      this.originalSector = sorted;
      this.filteredSector = [...sorted];
    });
  }

  onAddSector() {
    this.router.navigate(['/lookups/add-sectors']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteSector(SectorId: any): void {
    console.log('[View] onDeleteSector() – opening modal for id=', SectorId);
    this.selectedSectorId = SectorId;
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
    this.Sectors$ = this.facade.all$;
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
    this.selectedSectorId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredSector = this.originalSector.filter((Sectors) =>
      Object.values(Sectors).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditSector(Sector: Sector) {
    this.router.navigate(['/lookups/edit-sectors', Sector.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewSector(ct: Sector) {
    this.router.navigate(['/lookups/edit-sectors', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
