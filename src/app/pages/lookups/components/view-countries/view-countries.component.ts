import { Component, ViewChild } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { CountriesFacade } from '../../store/countries/countries.facade';
import { Country } from '../../store/countries/country.model';

@Component({
  selector: 'app-view-countries',
  standalone: false,
  templateUrl: './view-countries.component.html',
  styleUrl: './view-countries.component.scss',
})
export class ViewCountriesComponent {
  tableDataInside: Country[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'code2', header: 'Code2' },
    { field: 'code3', header: 'Code3' },
  ];
  showDeleteModal: boolean = false;
  selectedCountryId: number | null = null;
  originalCountries: Country[] = [];
  filteredCountries: Country[] = [];
  countries$!: Observable<Country[]>;

  constructor(private router: Router, private facade: CountriesFacade) {}
  ngOnInit() {
    this.facade.loadAll();
    this.countries$ = this.facade.items$;

    this.countries$
      ?.pipe(takeUntil(this.destroy$))
      .subscribe((countries) => {
        // countries is now Country[], not any
        const sorted = [...countries].sort((a, b) => b.id - a.id);
        this.originalCountries = sorted;
        this.filteredCountries = [...sorted];
      });
  }

  onAddCountry() {
    this.router.navigate(['/lookups/add-countries']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteCountry(countryId: any): void {
    console.log(
      '[View] onDeleteCountry() – opening modal for id=',
      countryId
    );
    this.selectedCountryId = countryId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedCountryId
    );
    if (this.selectedCountryId !== null) {
      this.facade.delete(this.selectedCountryId);
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
    this.selectedCountryId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredCountries = this.originalCountries.filter(
      (country) =>
        Object.values(country).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditCountry(country: Country) {
    this.router.navigate(['/lookups/edit-countries', country.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewCountry(ct: Country) {
    this.router.navigate(['/lookups/edit-countries', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
