import { Component } from '@angular/core';
import { BranchManagers } from '../../../shared/interfaces/branch-managers.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-branch-managers',
  standalone: false,
  templateUrl: './view-branch-managers.component.html',
  styleUrl: './view-branch-managers.component.scss',
})
export class ViewBranchManagersComponent {
  tableDataInside: BranchManagers[] = [];
  colsInside: any[] = [];

  constructor(private router: Router) {}
  ngOnInit() {
    this.colsInside = [
      { field: 'details', header: 'Details' },
      { field: 'startDate', header: 'Start Date' },
      { field: 'endDate', header: 'End Date' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
    ];
    this.tableDataInside = [
      {
        details: 'Document Name',
        startDate: new Date('12-10-2025'),
        endDate: new Date('12-15-2025'),
        nameEN: 'string',
        nameAR: 'string',
      },
      {
        details: 'Document Name',
        startDate: new Date('12-10-2025'),
        endDate: new Date('12-15-2025'),
        nameEN: 'string',
        nameAR: 'string',
      },
      {
        details: 'Document Name',
        startDate: new Date('12-10-2025'),
        endDate: new Date('12-15-2025'),
        nameEN: 'string',
        nameAR: 'string',
      },
      {
        details: 'Document Name',
        startDate: new Date('12-10-2025'),
        endDate: new Date('12-15-2025'),
        nameEN: 'string',
        nameAR: 'string',
      },
      {
        details: 'Document Name',
        startDate: new Date('12-10-2025'),
        endDate: new Date('12-15-2025'),
        nameEN: 'string',
        nameAR: 'string',
      },
      {
        details: 'Document Name',
        startDate: new Date('12-10-2025'),
        endDate: new Date('12-15-2025'),
        nameEN: 'string',
        nameAR: 'string',
      },
      {
        details: 'Document Name',
        startDate: new Date('12-10-2025'),
        endDate: new Date('12-15-2025'),
        nameEN: 'string',
        nameAR: 'string',
      },
      {
        details: 'Document Name',
        startDate: new Date('12-10-2025'),
        endDate: new Date('12-15-2025'),
        nameEN: 'string',
        nameAR: 'string',
      },
      {
        details: 'Document Name',
        startDate: new Date('12-10-2025'),
        endDate: new Date('12-15-2025'),
        nameEN: 'string',
        nameAR: 'string',
      },
    ];
  }
  onAdd() {
    this.router.navigate(['/lookups/add-branch-managers']);
  }
}
