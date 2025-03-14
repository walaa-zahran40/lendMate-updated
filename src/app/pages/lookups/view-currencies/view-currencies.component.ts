import { Component } from '@angular/core';
import { Currencies } from '../../../shared/interfaces/currencies.interface';

@Component({
  selector: 'app-view-currencies',
  standalone: false,
  templateUrl: './view-currencies.component.html',
  styleUrl: './view-currencies.component.scss',
})
export class ViewCurrenciesComponent {
  tableDataInside: Currencies[] = [];
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [
      { field: 'id', header: 'ID' },
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'arabicName', header: 'Arabic Name' },
      { field: 'iso', header: 'ISO' },
      { field: 'currency', header: 'Currency' },
    ];
    this.tableDataInside = [
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        iso: 'USD',
        currency: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        iso: 'USD',
        currency: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        iso: 'USD',
        currency: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        iso: 'USD',
        currency: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        iso: 'USD',
        currency: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        iso: 'USD',
        currency: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        iso: 'USD',
        currency: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        iso: 'USD',
        currency: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        iso: 'USD',
        currency: true,
      },
    ];
  }
}
