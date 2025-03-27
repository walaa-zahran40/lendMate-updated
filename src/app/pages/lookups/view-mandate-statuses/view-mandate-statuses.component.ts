import { Component } from '@angular/core';
import { MandateStatuses } from '../../../shared/interfaces/mandate-statuses.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-mandate-statuses',
  standalone: false,
  templateUrl: './view-mandate-statuses.component.html',
  styleUrl: './view-mandate-statuses.component.scss',
})
export class ViewMandateStatusesComponent {
  tableDataInside: MandateStatuses[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}

  ngOnInit() {
    this.colsInside = [
      { field: 'code', header: 'Code' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'isInitial', header: 'IsInitial' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        isInitial: true,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        isInitial: true,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        isInitial: true,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        isInitial: true,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        isInitial: true,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        isInitial: true,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        isInitial: true,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        isInitial: true,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        isInitial: true,
        active: true,
      },
    ];
  }
  onAdd() {
    this.router.navigate(['/lookups/add-mandate-statuses']);
  }
}
