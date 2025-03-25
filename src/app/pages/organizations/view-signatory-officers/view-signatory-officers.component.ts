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
      { field: 'id', header: 'ID' },
      { field: 'code', header: 'Code' },
      { field: 'officerName', header: 'Name' },
      { field: 'startDate', header: 'Arabic Name' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        id: 501,
        code: 344535,
        officerName: 'Name',
        startDate: new Date('10-10-2025'),
        active: true,
      },
      {
        id: 501,
        code: 344535,
        officerName: 'Name',
        startDate: new Date('10-10-2025'),
        active: true,
      },
      {
        id: 501,
        code: 344535,
        officerName: 'Name',
        startDate: new Date('10-10-2025'),
        active: true,
      },
      {
        id: 501,
        code: 344535,
        officerName: 'Name',
        startDate: new Date('10-10-2025'),
        active: true,
      },
      {
        id: 501,
        code: 344535,
        officerName: 'Name',
        startDate: new Date('10-10-2025'),
        active: true,
      },
      {
        id: 501,
        code: 344535,
        officerName: 'Name',
        startDate: new Date('10-10-2025'),
        active: true,
      },
      {
        id: 501,
        code: 344535,
        officerName: 'Name',
        startDate: new Date('10-10-2025'),
        active: true,
      },
      {
        id: 501,
        code: 344535,
        officerName: 'Name',
        startDate: new Date('10-10-2025'),
        active: true,
      },
      {
        id: 501,
        code: 344535,
        officerName: 'Name',
        startDate: new Date('10-10-2025'),
        active: true,
      },
    ];
  }
  onAdd() {
    this.router.navigate(['/organizations/add-signatory-officer']);
  }
}
