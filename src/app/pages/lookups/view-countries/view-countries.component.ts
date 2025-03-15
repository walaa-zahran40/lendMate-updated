import { Component } from '@angular/core';
import { CountriesLookups } from '../../../shared/interfaces/countries-lookups.interface';

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
      { field: 'id', header: 'ID' },
      { field: 'countryName', header: 'Country Name' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'code2', header: 'Code2' },
      { field: 'code3', header: 'Code3' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        id: 501,
        countryName: 344535,
        nameAR: 'Name',
        code2: 'Name in Arabic',
        code3: 'code 3',
        active: true,
      },
      {
        id: 501,
        countryName: 344535,
        nameAR: 'Name',
        code2: 'Name in Arabic',
        code3: 'code 3',
        active: true,
      },
      {
        id: 501,
        countryName: 344535,
        nameAR: 'Name',
        code2: 'Name in Arabic',
        code3: 'code 3',
        active: true,
      },
      {
        id: 501,
        countryName: 344535,
        nameAR: 'Name',
        code2: 'Name in Arabic',
        code3: 'code 3',
        active: true,
      },
      {
        id: 501,
        countryName: 344535,
        nameAR: 'Name',
        code2: 'Name in Arabic',
        code3: 'code 3',
        active: true,
      },
      {
        id: 501,
        countryName: 344535,
        nameAR: 'Name',
        code2: 'Name in Arabic',
        code3: 'code 3',
        active: true,
      },
      {
        id: 501,
        countryName: 344535,
        nameAR: 'Name',
        code2: 'Name in Arabic',
        code3: 'code 3',
        active: true,
      },
      {
        id: 501,
        countryName: 344535,
        nameAR: 'Name',
        code2: 'Name in Arabic',
        code3: 'code 3',
        active: true,
      },
      {
        id: 501,
        countryName: 344535,
        nameAR: 'Name',
        code2: 'Name in Arabic',
        code3: 'code 3',
        active: true,
      },
    ];
  }
}
