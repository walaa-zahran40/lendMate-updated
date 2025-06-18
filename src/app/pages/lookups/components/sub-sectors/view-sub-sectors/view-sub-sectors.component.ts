import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  Subject,
  Observable,
  take,
  takeUntil,
  filter,
  tap,
  forkJoin,
} from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { SubSector } from '../../../store/sub-sectors/sub-sector.model';
import { SubSectorsFacade } from '../../../store/sub-sectors/sub-sectors.facade';
import { Store } from '@ngrx/store';
import { selectAllSectors } from '../../../store/sectors/sectors.selectors';
import { Sector } from '../../../store/sectors/sector.model';
import { map, combineLatest } from 'rxjs';
import { SectorsFacade } from '../../../store/sectors/sectors.facade';

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
    { field: 'isActive', header: 'Is Active' },
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
    private sectorFacade: SectorsFacade
  ) {}
  ngOnInit() {
    // 1) kick off both loads
    this.facade.loadHistory();
    this.sectorFacade.loadAll();

    // 2) pull the raw streams
    this.SubSectors$ = this.facade.history$;
    this.sectorsList$ = this.sectorFacade.all$;

    // 3) whenever either list changes, rebuild your display list
    combineLatest([this.SubSectors$, this.sectorsList$])
      .pipe(
        // wait until the sectors are actually loaded
        filter(([subs, sectors]) => sectors.length > 0),
        map(([subs, sectors]) =>
          subs
            .map((ss) => ({
              ...ss,
              sectorName:
                sectors.find((s) => s.id === ss.sectorId)?.name ?? '—',
            }))
            .sort((a, b) => b.id - a.id)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((list) => {
        this.originalSubSector = list;
        this.filteredSubSector = [...list];
      });

    // 4) after any create/update/delete, re-load
    this.facade.operationSuccess$
      .pipe(
        // only react to the SubSector entity
        filter((op) => op?.entity === 'SubSector'),
        // you could further narrow to op.operation === 'create' if you like
        tap(() => this.facade.loadHistory()),
        takeUntil(this.destroy$)
      )
      .subscribe();
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
    this.selectedIds = [SubSectorId];
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
    this.SubSectors$ = this.facade.all$;
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
