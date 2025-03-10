import { Component } from '@angular/core';
import { Address } from '../../../../shared/interfaces/address.interface';

@Component({
  selector: 'app-view-address',
  standalone: false,
  templateUrl: './view-address.component.html',
  styleUrl: './view-address.component.scss',
})
export class ViewAddressComponent {
  tableDataInside: Address[] = [];
  colsInside: any[] = [];
  ngOnInit() {
    this.colsInside = [
      { field: 'detailsEn', header: 'Details EN' },
      { field: 'detailsAr', header: 'Details AR' },
      { field: 'addressTypeId', header: 'Address Type ID' },
      { field: 'areaId', header: 'Area ID' },
      { field: 'isMain', header: 'IsMain' },
      { field: 'isActive', header: 'IsActive' },
    ];
    this.tableDataInside = [
      {
        detailsEn: 'Address English',
        detailsAr: 'Address Arabic',
        addressTypeId: 1345,
        areaId: 2020,
        isMain: true,
        isActive: true,
      },
      {
        detailsEn: 'Address English',
        detailsAr: 'Address Arabic',
        addressTypeId: 1345,
        areaId: 2020,
        isMain: true,
        isActive: true,
      },
      {
        detailsEn: 'Address English',
        detailsAr: 'Address Arabic',
        addressTypeId: 1345,
        areaId: 2020,
        isMain: true,
        isActive: true,
      },
      {
        detailsEn: 'Address English',
        detailsAr: 'Address Arabic',
        addressTypeId: 1345,
        areaId: 2020,
        isMain: true,
        isActive: true,
      },
    ];
  }
}
