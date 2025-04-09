import { Component } from '@angular/core';
import { TaxOffice } from '../../../shared/interfaces/tax-office.interface';

@Component({
  selector: 'app-view-tax-offices',
  standalone: false,
  templateUrl: './view-tax-offices.component.html',
  styleUrl: './view-tax-offices.component.scss',
})
export class ViewTaxOfficesComponent {
  tableDataInside: TaxOffice[] = [];
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [
      { field: 'code', header: 'Code' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'governorateName', header: 'Governorate Name' },
      { field: 'address', header: 'Address' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        governorateName: '10',
        address: 50,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        governorateName: '10',
        address: 50,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        governorateName: '10',
        address: 50,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        governorateName: '10',
        address: 50,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        governorateName: '10',
        address: 50,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        governorateName: '10',
        address: 50,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        governorateName: '10',
        address: 50,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        governorateName: '10',
        address: 50,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        governorateName: '10',
        address: 50,
        active: true,
      },
    ];
  }
}
