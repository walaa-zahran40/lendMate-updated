import { Component, ViewChild } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { Currency } from '../../store/currencies/currency.model';
import { CurrenciesFacade } from '../../store/currencies/currencies.facade';

@Component({
  selector: 'app-view-currencies',
  standalone: false,
  templateUrl: './view-currencies.component.html',
  styleUrl: './view-currencies.component.scss',
})
export class ViewCurrenciesComponent {
  tableDataInside: Currency[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'code', header: 'Code' },
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'iso', header: 'ISO' },
    { field: 'isDefault', header: 'Is Default' },
  ];

  showDeleteModal = false;
  selectedCurrencyId: number | null = null;
  originalCurrencies: Currency[] = [];
  filteredCurrencies: Currency[] = [];
  currencies$!: Observable<Currency[]>;

  constructor(private router: Router, private facade: CurrenciesFacade) {}

  ngOnInit() {
    console.log('🟢 ngOnInit: start loading currencies');
    this.facade.loadAll();
    this.currencies$ = this.facade.items$;

    this.currencies$.pipe(takeUntil(this.destroy$)).subscribe((currencies) => {
      const sorted = [...currencies].sort((a, b) => b.id - a.id);
      console.log('🟢 sorted currencies:', sorted);
      this.originalCurrencies = sorted;
      this.filteredCurrencies = [...sorted];
    });
  }

  onAddCurrency() {
    this.router.navigate(['/lookups/add-currencies']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteCurrency(currencyId: number): void {
    console.log(
      '[View] onDeleteCurrency() – opening modal for id=',
      currencyId
    );
    this.selectedCurrencyId = currencyId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedCurrencyId
    );
    if (this.selectedCurrencyId !== null) {
      this.facade.delete(this.selectedCurrencyId);
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
    this.selectedCurrencyId = null;
  }
  onAddSide(currencyId: any) {
    this.router.navigate(['/lookups/wizard-currencies', currencyId]);
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredCurrencies = this.originalCurrencies.filter((currency) =>
      Object.values(currency).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditCurrency(currency: Currency) {
    this.router.navigate(['/lookups/edit-currencies', currency.id], {
      queryParams: { mode: 'edit' },
    });
  }

  onViewCurrency(currency: Currency) {
    this.router.navigate(['/lookups/edit-currencies', currency.id], {
      queryParams: { mode: 'view' },
    });
  }
}
