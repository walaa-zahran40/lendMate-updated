import { Component } from '@angular/core';
import { ClientStatus } from '../../../shared/interfaces/client-status.interface';

@Component({
  selector: 'app-view-client-status',
  standalone: false,
  templateUrl: './view-client-status.component.html',
  styleUrl: './view-client-status.component.scss',
})
export class ViewClientStatusComponent {
  tableDataInside: ClientStatus[] = [];
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [
      { field: 'code', header: 'Code' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'statusIn', header: 'Status In' },
      { field: 'statusOut', header: 'Status Out' },
    ];
    this.tableDataInside = [
      {
        code: 454536,
        nameEN: 'Mohamed',
        nameAR: 'Mohamed',
        statusIn: 'Status',
        statusOut: 'Status',
      },
      {
        code: 454536,
        nameEN: 'Mohamed',
        nameAR: 'Mohamed',
        statusIn: 'Status',
        statusOut: 'Status',
      },
      {
        code: 454536,
        nameEN: 'Mohamed',
        nameAR: 'Mohamed',
        statusIn: 'Status',
        statusOut: 'Status',
      },
      {
        code: 454536,
        nameEN: 'Mohamed',
        nameAR: 'Mohamed',
        statusIn: 'Status',
        statusOut: 'Status',
      },
      {
        code: 454536,
        nameEN: 'Mohamed',
        nameAR: 'Mohamed',
        statusIn: 'Status',
        statusOut: 'Status',
      },
      {
        code: 454536,
        nameEN: 'Mohamed',
        nameAR: 'Mohamed',
        statusIn: 'Status',
        statusOut: 'Status',
      },
      {
        code: 454536,
        nameEN: 'Mohamed',
        nameAR: 'Mohamed',
        statusIn: 'Status',
        statusOut: 'Status',
      },
      {
        code: 454536,
        nameEN: 'Mohamed',
        nameAR: 'Mohamed',
        statusIn: 'Status',
        statusOut: 'Status',
      },
      {
        code: 454536,
        nameEN: 'Mohamed',
        nameAR: 'Mohamed',
        statusIn: 'Status',
        statusOut: 'Status',
      },
    ];
  }
}
