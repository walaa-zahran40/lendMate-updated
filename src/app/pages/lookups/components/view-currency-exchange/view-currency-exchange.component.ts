import { Component, ViewChild } from '@angular/core';
import { CurrencyExchange } from '../../../../shared/interfaces/currency-exchange.interface';
import { CurrencyExchangeRate } from '../../store/currency-exchange-rates/currency-exchange-rate.model';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { CurrencyExchangeRatesFacade } from '../../store/currency-exchange-rates/currency-exchange-rates.facade';


@Component({
  selector: 'app-view-currency-exchange',
  standalone: false,
  templateUrl: './view-currency-exchange.component.html',
  styleUrl: './view-currency-exchange.component.scss',
})
export class ViewCurrencyExchangeComponent {
  tableDataInside: CurrencyExchangeRate[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();


  @ViewChild('tableRef') tableRef!: TableComponent;
  
  readonly colsInside = [
    { field: 'currency', header: 'Currency' },
    { field: 'exchangeDate', header: 'Exchange Date' },
    { field: 'exchangeRate', header: 'Exchange Rate' }
  ];

  showDeleteModal = false;
  selectedCurrencyExchangeRateId: number | null = null;
  originalCurrencyExchangeRates: CurrencyExchangeRate[] = [];
  filteredCurrencyExchangeRates: CurrencyExchangeRate[] = [];
  currencyExchangeRates$!: Observable<CurrencyExchangeRate[]>;

  constructor(private router: Router, private facade: CurrencyExchangeRatesFacade) {}

  ngOnInit() {
    this.facade.loadAll();
    this.currencyExchangeRates$ = this.facade.items$;
    this.currencyExchangeRates$.pipe(takeUntil(this.destroy$)).subscribe((currencyExchangeRates) => {
      const sorted = [...currencyExchangeRates].sort((a, b) => b.id - a.id);
      this.originalCurrencyExchangeRates = sorted;
      this.filteredCurrencyExchangeRates = [...sorted];
    });

    combineLatest([this.currencyExchangeRates$])
      .pipe(
        map(([currencyExchangeRates]) => {
          const mapped = currencyExchangeRates.map((ss) => {
            const currency = ss.currency?.name || '—';
            return {
              ...ss,
              currency: currency,
            };
          });

          const sorted = mapped.sort((a, b) => b.id - a.id);
          console.log('✅ Sorted mapped currencyExchangeRates:', sorted);
          return sorted;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (normalizedCurrencyExchangeRates) => {
          console.log(
            '🟢 Final normalizedCurrencyExchangeRates emitted to view:',
            normalizedCurrencyExchangeRates
          );
          this.filteredCurrencyExchangeRates = normalizedCurrencyExchangeRates;
          this.originalCurrencyExchangeRates = normalizedCurrencyExchangeRates;
        },
        (error) => {
          console.error('❌ Error in combineLatest subscription:', error);
        }
      );
  }

  onAddCurrencyExchangeRate() {
    this.router.navigate(['/lookups/add-currency-exchange-rates']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteCurrencyExchangeRate(currencyExchangeRatesId: number): void {
    console.log(
      '[View] onDeleteCurrencyExchangeRate() – opening modal for id=',
      currencyExchangeRatesId
    );
    this.selectedCurrencyExchangeRateId = currencyExchangeRatesId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedCurrencyExchangeRateId
    );
    if (this.selectedCurrencyExchangeRateId !== null) {
      this.facade.delete(this.selectedCurrencyExchangeRateId);
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
    this.showDeleteModal = false;
    this.selectedCurrencyExchangeRateId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredCurrencyExchangeRates = this.originalCurrencyExchangeRates.filter((currencyExchangeRate) =>
      Object.values(currencyExchangeRate).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditCurrencyExchangeRate(currencyExchangeRate: CurrencyExchangeRate) {
    this.router.navigate(['/lookups/edit-currency-exchange-rates', currencyExchangeRate.id], {
      queryParams: { mode: 'edit' },
    });
  }

  onViewCurrencyExchangeRate(currencyExchangeRate: CurrencyExchangeRate) {
    this.router.navigate(['/lookups/edit-currency-exchange-rates', currencyExchangeRate.id], {
      queryParams: { mode: 'view' },
    });
  }
}