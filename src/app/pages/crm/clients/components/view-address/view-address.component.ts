import { Component } from '@angular/core';
import { Address } from '../../../../../shared/interfaces/address.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-address',
  standalone: false,
  templateUrl: './view-address.component.html',
  styleUrl: './view-address.component.scss',
})
export class ViewAddressComponent {
  tableDataInside: Address[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}

  ngOnInit() {
    this.colsInside = [
      { field: 'clientNameEN', header: 'Client Name EN' },
      { field: 'clientNameAR', header: 'Client Name AR' },
      { field: 'detailsEn', header: 'Details EN' },
      { field: 'detailsAr', header: 'Details AR' },
      { field: 'addressTypeName', header: 'Address Type Name' },
      { field: 'areaName', header: 'Area Name' },
      { field: 'isMain', header: 'IsMain' },
      { field: 'isActive', header: 'IsActive' },
    ];
    this.tableDataInside = [
      {
        clientNameEN: 'clientNameEN',
        clientNameAR: 'clientNameAR',
        detailsEn: 'Address English',
        detailsAr: 'Address Arabic',
        addressTypeName: '1345',
        areaName: '2020',
        isMain: true,
        isActive: true,
      },
      {
        clientNameEN: 'clientNameEN',
        clientNameAR: 'clientNameAR',
        detailsEn: 'Address English',
        detailsAr: 'Address Arabic',
        addressTypeName: '1345',
        areaName: '2020',
        isMain: true,
        isActive: true,
      },
      {
        clientNameEN: 'clientNameEN',
        clientNameAR: 'clientNameAR',
        detailsEn: 'Address English',
        detailsAr: 'Address Arabic',
        addressTypeName: '1345',
        areaName: '2020',
        isMain: true,
        isActive: true,
      },
      {
        clientNameEN: 'clientNameEN',
        clientNameAR: 'clientNameAR',
        detailsEn: 'Address English',
        detailsAr: 'Address Arabic',
        addressTypeName: '1345',
        areaName: '2020',
        isMain: true,
        isActive: true,
      },
    ];
  }
  onAddAddress() {
    this.router.navigate(['/crm/clients/add-address']);
  }
}
