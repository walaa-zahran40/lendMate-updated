import { Component } from '@angular/core';
import { Currencies } from '../../../../shared/interfaces/currencies.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-currencies',
  standalone: false,
  templateUrl: './view-currencies.component.html',
  styleUrl: './view-currencies.component.scss',
})
export class ViewCurrenciesComponent {
  tableDataInside: Currencies[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}
  ngOnInit() {
    this.colsInside = [
      { field: 'code', header: 'Code' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'iso', header: 'ISO' },
      { field: 'currency', header: 'Currency' },
    ];
    this.tableDataInside = [
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        iso: 'USD',
        currency: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        iso: 'USD',
        currency: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        iso: 'USD',
        currency: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        iso: 'USD',
        currency: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        iso: 'USD',
        currency: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        iso: 'USD',
        currency: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        iso: 'USD',
        currency: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        iso: 'USD',
        currency: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        iso: 'USD',
        currency: true,
      },
    ];
  }
  onAddCurrency() {
    this.router.navigate(['/lookups/add-currencies']);
  }
}
