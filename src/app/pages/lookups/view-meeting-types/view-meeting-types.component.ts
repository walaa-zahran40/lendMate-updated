import { Component } from '@angular/core';
import { PaymentMethods } from '../../../shared/interfaces/payment-methods.interface';

@Component({
  selector: 'app-view-meeting-types',
  standalone: false,
  templateUrl: './view-meeting-types.component.html',
  styleUrl: './view-meeting-types.component.scss',
})
export class ViewMeetingTypesComponent {
  tableDataInside: PaymentMethods[] = [];
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [
      { field: 'code', header: 'Code' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
      },
    ];
  }
}
