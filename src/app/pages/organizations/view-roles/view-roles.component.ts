import { Component } from '@angular/core';
import { Roles } from '../../../shared/interfaces/roles.interface';

@Component({
  selector: 'app-view-roles',
  standalone: false,
  templateUrl: './view-roles.component.html',
  styleUrl: './view-roles.component.scss',
})
export class ViewRolesComponent {
  tableDataInside: Roles[] = [];
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [
      { field: 'id', header: 'ID' },
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'normalizedName', header: 'Arabic Name' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        id: 501,
        code: 344535,
        name: 'Name',
        normalizedName: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        normalizedName: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        normalizedName: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        normalizedName: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        normalizedName: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        normalizedName: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        normalizedName: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        normalizedName: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        normalizedName: 'Name in Arabic',
        active: true,
      },
    ];
  }
}
