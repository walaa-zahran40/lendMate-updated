import { Component } from '@angular/core';
import { Roles } from '../../../../shared/interfaces/roles.interface';

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
      { field: 'code', header: 'Code' },
      { field: 'nameEN', header: 'English Name' },
      { field: 'nameAR', header: 'Arabic Name' },
      { field: 'normalizedName', header: 'Normalized Name' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name',
        normalizedName: 'Name in Arabic',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name',
        normalizedName: 'Name in Arabic',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name',
        normalizedName: 'Name in Arabic',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name',
        normalizedName: 'Name in Arabic',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name',
        normalizedName: 'Name in Arabic',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name',
        normalizedName: 'Name in Arabic',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name',
        normalizedName: 'Name in Arabic',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name',
        normalizedName: 'Name in Arabic',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name',
        normalizedName: 'Name in Arabic',
        active: true,
      },
    ];
  }
}
