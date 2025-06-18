import { Component, ViewChild } from '@angular/core';
import {
  combineLatest,
  forkJoin,
  map,
  Observable,
  pipe,
  Subject,
  takeUntil,
} from 'rxjs';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Governorate } from '../../../store/governorates/governorate.model';
import { GovernoratesFacade } from '../../../store/governorates/governorates.facade';
import { Country } from '../../../store/countries/country.model';
import { Store } from '@ngrx/store';
import { selectAllCountries } from '../../../store/countries/countries.selectors';

@Component({
  selector: 'app-view-governorates',
  standalone: false,
  templateUrl: './view-governorates.component.html',
  styleUrl: './view-governorates.component.scss',
})
export class ViewGovernoratesComponent {
  tableDataInside: Governorate[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'aramex', header: 'Aramex' },
    { field: 'isActive', header: 'Is Active' },
  ];
  showDeleteModal: boolean = false;
  selectedGovernorateId: number | null = null;
  originalGovernorates: Governorate[] = [];
  filteredGovernorates: Governorate[] = [];
  governorates$!: Observable<Governorate[]>;
  countriesList$!: Observable<Country[]>;

  constructor(
    private router: Router,
    private facade: GovernoratesFacade,
    private store: Store
  ) {}
  ngOnInit() {
    this.governorates$ = this.facade.history$;
    this.countriesList$ = this.store.select(selectAllCountries);
    this.facade.loadHistory();
    this.store.dispatch({ type: '[Countries] Load History' });

    combineLatest([this.governorates$, this.countriesList$])
      .pipe(
        map(([governorates, countries]) =>
          governorates
            .map((gov) => ({
              ...gov,
              countryName:
                countries.find((c) => c.id === gov.countryId)?.name || '—',
            }))
            .sort((a, b) => b.id - a.id)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        this.originalGovernorates = enriched;
        this.filteredGovernorates = [...enriched];
      });
  }

  onAddGovernorate() {
    this.router.navigate(['/lookups/add-governorate']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteGovernorate(governorateId: any): void {
    console.log(
      '[View] onDeleteGovernorate() – opening modal for id=',
      governorateId
    );
    this.selectedIds = [governorateId];
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
    this.governorates$ = this.facade.all$;
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
    this.selectedGovernorateId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredGovernorates = this.originalGovernorates.filter(
      (governorate) =>
        Object.values(governorate).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditGovernorate(governorate: Governorate) {
    this.router.navigate(['/lookups/edit-governorate', governorate.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewGovernorate(ct: Governorate) {
    this.router.navigate(['/lookups/edit-governorate', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
