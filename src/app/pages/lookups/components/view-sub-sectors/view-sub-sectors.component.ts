import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, take, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { SubSector } from '../../store/sub-sectors/sub-sector.model';
import { SubSectorsFacade } from '../../store/sub-sectors/sub-sectors.facade';
import { Store } from '@ngrx/store';
import { selectAllSectors } from '../../store/sectors/sectors.selectors';
import { Sector } from '../../store/sectors/sector.model';
import { map, combineLatest } from 'rxjs';

@Component({
  selector: 'app-view-sub-sectors',
  standalone: false,
  templateUrl: './view-sub-sectors.component.html',
  styleUrl: './view-sub-sectors.component.scss',
})
export class ViewSubSectorsComponent {
  tableDataInside: SubSector[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'sectorName', header: 'Sector Name' },
  ];
  showDeleteModal: boolean = false;
  selectedSubSectorId: number | null = null;
  originalSubSector: SubSector[] = [];
  filteredSubSector: SubSector[] = [];
  SubSectors$!: Observable<SubSector[]>;
  sectorsList$!: Observable<Sector[]>;

  constructor(
    private router: Router,
    private facade: SubSectorsFacade,
    private store: Store
  ) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.SubSectors$ = this.facade.all$;
    this.sectorsList$ = this.store.select(selectAllSectors); // Add this line
    this.facade.loadAll(); // Ensure sub-sectors load
    this.store.dispatch({ type: '[Sectors API] Load All Sectors' }); // Make sure to dispatch sector loading
    //Select Box
    combineLatest([this.SubSectors$, this.sectorsList$])
      .pipe(
        map(([subSectors, sectors]) =>
          subSectors
            .map((ss) => ({
              ...ss,
              sectorName:
                sectors.find((s) => s.id === ss.sectorId)?.name || '—',
            }))
            .sort((a, b) => b.id - a.id)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((normalizedSubSectors) => {
        console.log('🟢 Normalized SubSectors:', normalizedSubSectors);
        this.filteredSubSector = normalizedSubSectors;
        this.originalSubSector = normalizedSubSectors;
      });
  }

  onAddSubSector() {
    this.router.navigate(['/lookups/add-sub-sectors']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteSubSector(SubSectorId: any): void {
    console.log(
      '[View] onDeleteSubSector() – opening modal for id=',
      SubSectorId
    );
    this.selectedSubSectorId = SubSectorId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedSubSectorId
    );
    if (this.selectedSubSectorId !== null) {
      this.facade.delete(this.selectedSubSectorId);
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
    this.selectedSubSectorId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredSubSector = this.originalSubSector.filter((SubSectors) =>
      Object.values(SubSectors).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditSubSector(SubSector: SubSector) {
    this.router.navigate(['/lookups/edit-sub-sectors', SubSector.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewSubSector(ct: SubSector) {
    this.router.navigate(['/lookups/edit-sub-sectors', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
