import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, take, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { Sector } from '../../store/sectors/sector.model';
import { SectorsFacade } from '../../store/sectors/sectors.facade';

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
  ];
  showDeleteModal: boolean = false;
  selectedSectorId: number | null = null;
  originalSector: Sector[] = [];
  filteredSector: Sector[] = [];
  Sectors$!: Observable<Sector[]>;

  constructor(private router: Router, private facade: SectorsFacade) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.Sectors$ = this.facade.all$;
    console.log('🟢 before loadAll, current store value:');
    this.Sectors$.pipe(take(1)).subscribe((v) =>
      console.log('   store currently has:', v)
    );
    console.log('🟢 Calling loadAll() to fetch Sectors');
    this.facade.loadAll();

    this.Sectors$?.pipe(takeUntil(this.destroy$))?.subscribe((sectors) => {
      // sMEClientCodes is now SMEClientCode[], not any
      const activeCodes = sectors.filter((code) => code.isActive);
      const sorted = [...activeCodes].sort((a, b) => b?.id - a?.id);
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

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedSectorId
    );
    if (this.selectedSectorId !== null) {
      this.facade.delete(this.selectedSectorId);
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
