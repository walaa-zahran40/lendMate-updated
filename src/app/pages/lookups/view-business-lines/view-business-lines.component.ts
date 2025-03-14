import { Component } from '@angular/core';
import { BusinessLines } from '../../../shared/interfaces/business-lines.interface';

@Component({
  selector: 'app-view-business-lines',
  standalone: false,
  templateUrl: './view-business-lines.component.html',
  styleUrl: './view-business-lines.component.scss',
})
export class ViewBusinessLinesComponent {
  tableDataInside: BusinessLines[] = [];
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [{ field: 'details', header: 'Details' }];
    this.tableDataInside = [
      {
        id: 453565,
        code: 4656565,
        name: 'walaa zahran',
        arabicName: 'walaa zahran',
        licenseDate: new Date('12-10-2025'),
        active: true,
      },
      {
        id: 453565,
        code: 4656565,
        name: 'walaa zahran',
        arabicName: 'walaa zahran',
        licenseDate: new Date('12-10-2025'),
        active: true,
      },
      {
        id: 453565,
        code: 4656565,
        name: 'walaa zahran',
        arabicName: 'walaa zahran',
        licenseDate: new Date('12-10-2025'),
        active: true,
      },
      {
        id: 453565,
        code: 4656565,
        name: 'walaa zahran',
        arabicName: 'walaa zahran',
        licenseDate: new Date('12-10-2025'),
        active: true,
      },
      {
        id: 453565,
        code: 4656565,
        name: 'walaa zahran',
        arabicName: 'walaa zahran',
        licenseDate: new Date('12-10-2025'),
        active: true,
      },
      {
        id: 453565,
        code: 4656565,
        name: 'walaa zahran',
        arabicName: 'walaa zahran',
        licenseDate: new Date('12-10-2025'),
        active: true,
      },
      {
        id: 453565,
        code: 4656565,
        name: 'walaa zahran',
        arabicName: 'walaa zahran',
        licenseDate: new Date('12-10-2025'),
        active: true,
      },
      {
        id: 453565,
        code: 4656565,
        name: 'walaa zahran',
        arabicName: 'walaa zahran',
        licenseDate: new Date('12-10-2025'),
        active: true,
      },
      {
        id: 453565,
        code: 4656565,
        name: 'walaa zahran',
        arabicName: 'walaa zahran',
        licenseDate: new Date('12-10-2025'),
        active: true,
      },
    ];
  }
}
