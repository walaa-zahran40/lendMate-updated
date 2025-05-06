import { Component, ViewChild } from '@angular/core';
import { CurrencyExchange } from '../../../../shared/interfaces/currency-exchange.interface';
import { CurrencyExchangeRate } from '../../store/currency-exchange-rates/currency-exchange-rate.model';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
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
  currencyIdParam!: number;

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
    this.currencyIdParam = Number(
      this.route.snapshot.paramMap.get('currencyId')
    );

    // 2) kick off the load
    // 3) point your Observable at the facade

    this.facade.loadByCurrencyId(this.currencyIdParam);
    this.currencyExchangeRates$ = this.facade.items$;

    // 4) now pipe + filter + subscribe
    this.currencyExchangeRates$
      .pipe(
        takeUntil(this.destroy$),
        map((list) =>
          list
            .map((r) => ({ ...r, currency: r.currency?.name || '—' }))
            .sort((a, b) => b.id - a.id)
        )
      )
      .subscribe((formatted) => {
        this.filteredCurrencyExchangeRates = formatted;
        this.originalCurrencyExchangeRates = formatted;
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
