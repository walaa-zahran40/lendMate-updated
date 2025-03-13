import { Component } from '@angular/core';
import { MandateStatuses } from '../../../shared/interfaces/mandate-statuses.interface';

@Component({
  selector: 'app-view-mandate-statuses',
  standalone: false,
  templateUrl: './view-mandate-statuses.component.html',
  styleUrl: './view-mandate-statuses.component.scss',
})
export class ViewMandateStatusesComponent {
  tableDataInside: MandateStatuses[] = [];
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [
      { field: 'id', header: 'ID' },
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'arabicName', header: 'Arabic Name' },
      { field: 'isInitial', header: 'IsInitial' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        isInitial: true,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        isInitial: true,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        isInitial: true,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        isInitial: true,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        isInitial: true,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        isInitial: true,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        isInitial: true,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        isInitial: true,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        isInitial: true,
        active: true,
      },
    ];
  }
}
