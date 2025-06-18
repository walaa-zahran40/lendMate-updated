import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, combineLatest, forkJoin, Observable } from 'rxjs';
import { map, takeUntil, filter, tap } from 'rxjs/operators';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Area } from '../../../store/areas/area.model';
import { AreasFacade } from '../../../store/areas/areas.facade';
import { GovernoratesFacade } from '../../../store/governorates/governorates.facade';

@Component({
  selector: 'app-view-areas',
  templateUrl: './view-areas.component.html',
  standalone: false,
  styleUrls: ['./view-areas.component.scss'], // ← corrected
})
export class ViewAreasComponent implements OnInit, OnDestroy {
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'governorateName', header: 'Governorate Name' },
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'isActive', header: 'Active' },
  ];
  areas$!: Observable<Area[]>;

  originalArea: Area[] = [];
  filteredArea: Area[] = [];
  showFilters = false;
  showDeleteModal = false;
  selectedAreaId: number | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private areasFacade: AreasFacade,
    private govFacade: GovernoratesFacade
  ) {}

  ngOnInit() {
    // 1) load once
    this.areasFacade.loadHistory();
    this.govFacade.loadAll();

    // 2) on any create/update/delete → reload
    this.areasFacade.operationSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter(
          (op) =>
            op?.entity === 'Area' &&
            ['create', 'update', 'delete'].includes(op.operation)
        ),
        tap(() => this.areasFacade.loadHistory())
      )
      .subscribe();

    // 3) combine, filter active, map governorateName, sort desc, emit
    combineLatest([this.areasFacade.history$, this.govFacade.all$])
      .pipe(
        takeUntil(this.destroy$),
        map(([areas, govs]) =>
          areas
            // Remove isActive filter here since it's historical
            .map((a) => ({
              ...a,
              governorateName:
                govs.find(
                  (g) => g.id === (a.governorate?.id ?? a.governorateId)
                )?.name || '—',
            }))
            .sort((a, b) => b.id - a.id)
        )
      )
      .subscribe((normalized) => {
        this.originalArea = normalized;
        this.filteredArea = [...normalized];
      });
  }

  onAddArea() {
    this.router.navigate(['/lookups/add-areas'], {
      queryParams: { mode: 'add' },
    });
  }

  onDeleteArea(id: number) {
    this.selectedIds = [id];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  private resetDeleteModal() {
    this.showDeleteModal = false;
    this.selectedAreaId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredArea = this.originalArea.filter((area) =>
      Object.values(area).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }

  onToggleFilters(show: boolean) {
    this.showFilters = show;
  }

  onEditArea(area: Area) {
    this.router.navigate(['/lookups/edit-areas', area.id], {
      queryParams: { mode: 'edit' },
    });
  }

  onViewArea(area: Area) {
    this.router.navigate(['/lookups/edit-areas', area.id], {
      queryParams: { mode: 'view' },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  selectedIds: number[] = [];
  confirmDelete() {
    const deleteCalls = this.selectedIds.map((id) =>
      this.areasFacade.delete(id)
    );

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
    this.areasFacade.loadAll();
    this.areas$ = this.areasFacade.all$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
