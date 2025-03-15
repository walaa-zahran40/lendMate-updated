import { Component } from '@angular/core';
import { ClientStatuses } from '../../../shared/interfaces/client-statuses.interface';

@Component({
  selector: 'app-view-client-statuses',
  standalone: false,
  templateUrl: './view-client-statuses.component.html',
  styleUrl: './view-client-statuses.component.scss',
})
export class ViewClientStatusesComponent {
  tableDataInside: ClientStatuses[] = [];
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [
      { field: 'id', header: 'ID' },
      { field: 'code', header: 'Code' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'initial', header: 'Initial' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        id: 501,
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        initial: 0.2,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        initial: 0.2,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        initial: 0.2,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        initial: 0.2,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        initial: 0.2,
        active: true,
      },
    ];
  }
}
