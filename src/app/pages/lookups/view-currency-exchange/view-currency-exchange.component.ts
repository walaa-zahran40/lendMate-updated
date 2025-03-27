import { Component } from '@angular/core';
import { CurrencyExchange } from '../../../shared/interfaces/currency-exchange.interface';

@Component({
  selector: 'app-view-currency-exchange',
  standalone: false,
  templateUrl: './view-currency-exchange.component.html',
  styleUrl: './view-currency-exchange.component.scss',
})
export class ViewCurrencyExchangeComponent {
  tableDataInside: CurrencyExchange[] = [];
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [
      { field: 'exchangeDate', header: 'Exchange Date' },
      { field: 'exchangeRate', header: 'Exchange Rate' },
    ];
    this.tableDataInside = [
      {
        exchangeDate: new Date('2021-01-01'),
        exchangeRate: 50,
        nameEN: 'sss',
        nameAR: 'ssss',
      },
      {
        exchangeDate: new Date('2021-01-01'),
        exchangeRate: 50,
        nameEN: 'sss',
        nameAR: 'ssss',
      },
      {
        exchangeDate: new Date('2021-01-01'),
        exchangeRate: 50,
        nameEN: 'sss',
        nameAR: 'ssss',
      },
      {
        exchangeDate: new Date('2021-01-01'),
        exchangeRate: 50,
        nameEN: 'sss',
        nameAR: 'ssss',
      },
      {
        exchangeDate: new Date('2021-01-01'),
        exchangeRate: 50,
        nameEN: 'sss',
        nameAR: 'ssss',
      },
      {
        exchangeDate: new Date('2021-01-01'),
        exchangeRate: 50,
        nameEN: 'sss',
        nameAR: 'ssss',
      },
      {
        exchangeDate: new Date('2021-01-01'),
        exchangeRate: 50,
        nameEN: 'sss',
        nameAR: 'ssss',
      },
      {
        exchangeDate: new Date('2021-01-01'),
        exchangeRate: 50,
        nameEN: 'sss',
        nameAR: 'ssss',
      },
      {
        exchangeDate: new Date('2021-01-01'),
        exchangeRate: 50,
        nameEN: 'sss',
        nameAR: 'ssss',
      },
    ];
  }
}
