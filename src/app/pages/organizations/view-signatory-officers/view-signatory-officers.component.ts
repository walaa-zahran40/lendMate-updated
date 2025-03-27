import { Component } from '@angular/core';
import { SignatoryOfficers } from '../../../shared/interfaces/signatory-officers.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-signatory-officers',
  standalone: false,
  templateUrl: './view-signatory-officers.component.html',
  styleUrl: './view-signatory-officers.component.scss',
})
export class ViewSignatoryOfficersComponent {
  tableDataInside: SignatoryOfficers[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}

  ngOnInit() {
    this.colsInside = [
      { field: 'code', header: 'Code' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'startDate', header: 'Start Date' },
      { field: 'active', header: 'Active' },
    ];

    this.tableDataInside = [
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'إسم',
        startDate: new Date('10-10-2025'),
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'إسم',
        startDate: new Date('10-10-2025'),
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'إسم',
        startDate: new Date('10-10-2025'),
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'إسم',
        startDate: new Date('10-10-2025'),
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'إسم',
        startDate: new Date('10-10-2025'),
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'إسم',
        startDate: new Date('10-10-2025'),
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'إسم',
        startDate: new Date('10-10-2025'),
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'إسم',
        startDate: new Date('10-10-2025'),
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'إسم',
        startDate: new Date('10-10-2025'),
        active: true,
      },
    ];
  }
  onAdd() {
    this.router.navigate(['/organizations/add-signatory-officer']);
  }
}
