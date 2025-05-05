import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, Observable, combineLatest, map, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { Area } from '../../store/areas/area.model';
import { AreasFacade } from '../../store/areas/areas.facade';
import { selectCountries } from '../../store/countries/countries.selectors';
import { Country } from '../../store/countries/country.model';
import { CountriesFacade } from '../../store/countries/countries.facade';

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
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'governorateName', header: 'Governorate Name' },
  ];
  showDeleteModal: boolean = false;
  selectedAreaId: number | null = null;
  originalArea: Area[] = [];
  filteredArea: Area[] = [];
  Areas$!: Observable<Area[]>;
  countriesList$!: Observable<Country[]>;

  constructor(
    private router: Router,
    private facade: AreasFacade,
    private countriesFacade: CountriesFacade,
    private store: Store
  ) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');

    // Step 1: Assign observables
    this.Areas$ = this.facade.all$;
    console.log('📦 Assigned Areas$ from facade.all$', this.Areas$);

    this.countriesList$ = this.store.select(selectCountries);
    console.log(
      '📦 Assigned countriesList$ from selectCountries',
      this.countriesList$
    );

    // Step 2: Dispatch load actions
    this.facade.loadAll();
    console.log('🚀 Dispatched facade.loadAll() for Areas');

    this.countriesFacade.loadAll();
    console.log('🚀 Dispatched countriesFacade.loadAll()');

    // Step 3: Combine and normalize
    combineLatest([this.Areas$])
      .pipe(
        map(([areas]) => {
          const mapped = areas.map((ss) => {
            const governorateName = ss.governorate?.name || '—';
            console.log(
              `🔍 Mapping Area ID ${ss.id} → Governorate Name: ${governorateName}`
            );
            return {
              ...ss,
              governorateName: governorateName, // or call it `governorateName` if more accurate
            };
          });

          const sorted = mapped.sort((a, b) => b.id - a.id);
          console.log('✅ Sorted mapped areas:', sorted);
          return sorted;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (normalizedAreas) => {
          console.log(
            '🟢 Final normalizedAreas emitted to view:',
            normalizedAreas
          );
          this.filteredArea = normalizedAreas;
          this.originalArea = normalizedAreas;
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
