import { Component } from '@angular/core';
import { ClientStatuses } from '../../../../shared/interfaces/client-statuses.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-client-statuses',
  standalone: false,
  templateUrl: './view-client-statuses.component.html',
  styleUrl: './view-client-statuses.component.scss',
})
export class ViewClientStatusesComponent {
  tableDataInside: ClientStatuses[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}

  ngOnInit() {
    this.colsInside = [
      { field: 'code', header: 'Code' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'initial', header: 'Initial' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        initial: 0.2,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        initial: 0.2,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        initial: 0.2,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        initial: 0.2,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        initial: 0.2,
        active: true,
      },
    ];
  }
  addClient() {
    this.router.navigate(['/lookups/add-client-statuses']);
  }
}
