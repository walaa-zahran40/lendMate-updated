import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CurrencyExchange } from '../../../../../shared/interfaces/currency-exchange.interface';
import { CurrencyExchangeRate } from '../../../store/currency-exchange-rates/currency-exchange-rate.model';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { combineLatest, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyExchangeRatesFacade } from '../../../store/currency-exchange-rates/currency-exchange-rates.facade';

@Component({
  selector: 'app-view-currency-exchange',
  standalone: false,
  templateUrl: './view-currency-exchange.component.html',
  styleUrl: './view-currency-exchange.component.scss',
})
export class ViewCurrencyExchangeComponent implements OnInit, OnDestroy {
  tableDataInside: CurrencyExchangeRate[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();
  currencyIdParam!: any;

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'currency', header: 'Currency' },
    { field: 'exchangeDate', header: 'Exchange Date' },
    { field: 'exchangeRate', header: 'Exchange Rate' },
  ];

  showDeleteModal = false;
  selectedCurrencyExchangeRateId: number | null = null;
  originalCurrencyExchangeRates: CurrencyExchangeRate[] = [];
  filteredCurrencyExchangeRates: CurrencyExchangeRate[] = [];
  currencyExchangeRates$!: Observable<CurrencyExchangeRate[]>;

  constructor(
    private router: Router,
    private facade: CurrencyExchangeRatesFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // 1) grab the param
    const raw = this.route.snapshot.paramMap.get('currencyId');
    this.currencyIdParam = raw !== null ? Number(raw) : undefined;
    console.log('[View] ngOnInit → currencyIdParam =', this.currencyIdParam);
    // 2) guard: if missing or NaN, error out
    if (this.currencyIdParam == null || isNaN(this.currencyIdParam)) {
      console.error(
        '❌ Missing or invalid currencyIdParam! Cannot load exchange rates.'
      );
      return;
    }
    // 2) dispatch the load (CORRECT: pass the number directly)
    this.facade.loadCurrencyExchangeRatesByCurrencyId(this.currencyIdParam);
    // 3) hook up the stream
    this.currencyExchangeRates$ = this.facade.items$;

    this.currencyExchangeRates$
      .pipe(
        takeUntil(this.destroy$),
        map((list) =>
          list
            .map((r) => ({ ...r, currency: r.currency?.name || '—' }))
            .sort((a, b) => b.id - a.id)
        )
      )
      .subscribe((currencies) => {
        const activeCodes = currencies.filter((code) => code.isActive);
        const sorted = [...activeCodes].sort((a, b) => b?.id - a?.id);
        this.originalCurrencyExchangeRates = sorted;
        this.filteredCurrencyExchangeRates = [...sorted];
      });
  }

  onAddCurrencyExchangeRate() {
    const currencyIdParam = this.route.snapshot.paramMap.get('currencyId');

    this.router.navigate(['/lookups/add-currency-exchange-rates'], {
      queryParams: { mode: 'add', currencyId: currencyIdParam },
    });
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
    if (this.selectedCurrencyExchangeRateId != null) {
      this.facade.delete(
        this.selectedCurrencyExchangeRateId,
        this.currencyIdParam
      );
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
    this.filteredCurrencyExchangeRates =
      this.originalCurrencyExchangeRates.filter((currencyExchangeRate) =>
        Object.values(currencyExchangeRate).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
      );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditCurrencyExchangeRate(exchange: CurrencyExchangeRate) {
    console.log('edioyt', this.currencyIdParam);
    this.router.navigate(
      ['/lookups/edit-currency-exchange-rates', exchange.id],
      {
        queryParams: {
          mode: 'edit',
          currencyId: this.currencyIdParam, // <-- use "currencyId" here
        },
      }
    );
  }

  onViewCurrencyExchangeRate(exchange: CurrencyExchangeRate) {
    this.router.navigate(
      ['/lookups/edit-currency-exchange-rates', exchange.id],
      {
        queryParams: {
          mode: 'view',
          currencyId: this.currencyIdParam, // <-- and here
        },
      }
    );
  }
}
