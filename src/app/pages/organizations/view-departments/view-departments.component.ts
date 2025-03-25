import { Component } from '@angular/core';
import { SubSector } from '../../../shared/interfaces/sub-sector.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-departments',
  standalone: false,
  templateUrl: './view-departments.component.html',
  styleUrl: './view-departments.component.scss',
})
export class ViewDepartmentsComponent {
  tableDataInside: SubSector[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}

  ngOnInit() {
    this.colsInside = [
      { field: 'id', header: 'ID' },
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'arabicName', header: 'Arabic Name' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        active: true,
      },
    ];
  }
  onAdd() {
    this.router.navigate(['/organizations/add-department']);
  }
}
