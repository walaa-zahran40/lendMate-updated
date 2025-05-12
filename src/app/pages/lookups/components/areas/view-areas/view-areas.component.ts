import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, combineLatest } from 'rxjs';
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
  ];

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
    this.areasFacade.loadAll();
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
        tap(() => this.areasFacade.loadAll())
      )
      .subscribe();

    // 3) combine, filter active, map governorateName, sort desc, emit
    combineLatest([this.areasFacade.all$, this.govFacade.all$])
      .pipe(
        takeUntil(this.destroy$),
        map(([areas, govs]) =>
          areas
            .filter((a) => a.isActive)
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
    this.selectedAreaId = id;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.selectedAreaId != null) {
      this.areasFacade.delete(this.selectedAreaId);
    }
    this.resetDeleteModal();
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
}
