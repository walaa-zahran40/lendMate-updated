import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, Observable, combineLatest, map, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { Area } from '../../store/areas/area.model';
import { AreasFacade } from '../../store/areas/areas.facade';
import { GovernorateFacade } from '../../store/governorates/governorates.facade';
import { selectGovernorates } from '../../store/governorates/governorates.selectors';
import { Governorate } from '../../store/governorates/governorate.model';

@Component({
  selector: 'app-view-areas',
  standalone: false,
  templateUrl: './view-areas.component.html',
  styleUrl: './view-areas.component.scss',
})
export class ViewAreasComponent {
  tableDataInside: Area[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'governorateName', header: 'Governorate Name' },
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
  ];
  showDeleteModal: boolean = false;
  selectedAreaId: number | null = null;
  originalArea: Area[] = [];
  filteredArea: Area[] = [];
  Areas$!: Observable<Area[]>;
  governorateList$!: Observable<Governorate[]>;

  constructor(
    private router: Router,
    private facade: AreasFacade,
    private governorateFacade: GovernorateFacade,
    private store: Store
  ) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');

    // Step 1: Assign observables
    this.Areas$ = this.facade.all$;
    this.governorateList$ = this.governorateFacade.items$;
    console.log('📦 Assigned Areas$ from facade.all$', this.Areas$);

    this.governorateList$ = this.store.select(selectGovernorates);
    console.log(
      '📦 Assigned governorateList$ from selectCountries',
      this.governorateList$
    );

    // Step 2: Dispatch load actions
    this.facade.loadAll();
    console.log('🚀 Dispatched facade.loadAll() for Areas');

    this.governorateFacade.loadAll();
    console.log('🚀 Dispatched governorateFacade.loadAll()');

    // Step 3: Combine and normalize
    combineLatest([this.Areas$, this.governorateList$])
      .pipe(
        map(([areas, governorates]) => {
          console.group('🔄 Mapping Areas with Governorates');
          console.log('📦 Received areas:', areas);
          console.log('📦 Received governorates:', governorates);

          const mapped = areas.map((area) => {
            const govId = area.governorate?.id ?? area.governorateId;

            if (!govId) {
              console.warn(
                `⚠️ Area ${area.id} has no governorateId or embedded governorate.`
              );
            }

            const matchedGovernorate = governorates.find((g) => g.id === govId);

            if (!matchedGovernorate) {
              console.warn(
                `⚠️ Governorate not found for area.id=${area.id} — missing match for governorateId=${govId}`
              );
            } else {
              console.log(
                `✅ Match found: Area ${area.id} → Governorate "${matchedGovernorate.name}"`
              );
            }

            return {
              ...area,
              governorateName: matchedGovernorate?.name || '—',
            };
          });

          const sorted = mapped.sort((a, b) => b.id - a.id);
          console.log('✅ Sorted result:', sorted);
          console.groupEnd();

          return sorted;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (normalizedAreas) => {
          console.group('📤 Final Output to View');
          console.log('✅ normalizedAreas:', normalizedAreas);
          this.filteredArea = normalizedAreas;
          this.originalArea = normalizedAreas;
          console.log('📊 filteredArea:', this.filteredArea);
          console.log('📊 originalArea:', this.originalArea);
          console.groupEnd();
        },
        (error) => {
          console.error('❌ Error in combineLatest subscription:', error);
        }
      );
  }

  onAddArea() {
    this.router.navigate(['/lookups/add-areas']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteArea(AreaId: any): void {
    console.log('[View] onDeleteArea() – opening modal for id=', AreaId);
    this.selectedAreaId = AreaId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedAreaId
    );
    if (this.selectedAreaId !== null) {
      this.facade.delete(this.selectedAreaId);
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
    this.selectedAreaId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredArea = this.originalArea.filter((Areas) =>
      Object.values(Areas).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditArea(Area: Area) {
    this.router.navigate(['/lookups/edit-areas', Area.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewArea(ct: Area) {
    this.router.navigate(['/lookups/edit-areas', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
