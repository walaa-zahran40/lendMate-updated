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
      { field: 'id', header: 'ID' },
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'arabicName', header: 'Arabic Name' },
      { field: 'governorateId', header: 'Governorate ID' },
      { field: 'address', header: 'Address' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        governorateId: 10,
        address: 50,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        governorateId: 10,
        address: 50,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        governorateId: 10,
        address: 50,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        governorateId: 10,
        address: 50,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        governorateId: 10,
        address: 50,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        governorateId: 10,
        address: 50,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        governorateId: 10,
        address: 50,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        governorateId: 10,
        address: 50,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        governorateId: 10,
        address: 50,
        active: true,
      },
    ];
  }
}
