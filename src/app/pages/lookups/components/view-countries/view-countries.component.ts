import { Component } from '@angular/core';
import { CountriesLookups } from '../../../../shared/interfaces/countries-lookups.interface';

@Component({
  selector: 'app-view-countries',
  standalone: false,
  templateUrl: './view-countries.component.html',
  styleUrl: './view-countries.component.scss',
})
export class ViewCountriesComponent {
  tableDataInside: CountriesLookups[] = [];
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [
      { field: 'code', header: 'Code' },
      { field: 'countryName', header: 'Country Name' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        code: 501,
        countryName: 'Name',
        nameEN: 'Name in Arabic',
        nameAR: 'code 3',
        active: true,
      },
      {
        code: 501,
        countryName: 'Name',
        nameEN: 'Name in Arabic',
        nameAR: 'code 3',
        active: true,
      },
      {
        code: 501,
        countryName: 'Name',
        nameEN: 'Name in Arabic',
        nameAR: 'code 3',
        active: true,
      },
      {
        code: 501,
        countryName: 'Name',
        nameEN: 'Name in Arabic',
        nameAR: 'code 3',
        active: true,
      },
      {
        code: 501,
        countryName: 'Name',
        nameEN: 'Name in Arabic',
        nameAR: 'code 3',
        active: true,
      },
      {
        code: 501,
        countryName: 'Name',
        nameEN: 'Name in Arabic',
        nameAR: 'code 3',
        active: true,
      },
      {
        code: 501,
        countryName: 'Name',
        nameEN: 'Name in Arabic',
        nameAR: 'code 3',
        active: true,
      },
      {
        code: 501,
        countryName: 'Name',
        nameEN: 'Name in Arabic',
        nameAR: 'code 3',
        active: true,
      },
      {
        code: 501,
        countryName: 'Name',
        nameEN: 'Name in Arabic',
        nameAR: 'code 3',
        active: true,
      },
    ];
  }
}
