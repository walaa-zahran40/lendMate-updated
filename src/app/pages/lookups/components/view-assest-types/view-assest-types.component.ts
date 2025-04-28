import { Component } from '@angular/core';
import { AssestTypes } from '../../../../shared/interfaces/assest-types.interface';

@Component({
  selector: 'app-view-assest-types',
  standalone: false,
  templateUrl: './view-assest-types.component.html',
  styleUrl: './view-assest-types.component.scss',
})
export class ViewAssestTypesComponent {
  tableDataInside: AssestTypes[] = [];
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [
      { field: 'code', header: 'Code' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'category', header: 'Category' },
      { field: 'parent', header: 'Parent' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        category: 'USD',
        parent: 'USD',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        category: 'USD',
        parent: 'USD',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        category: 'USD',
        parent: 'USD',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        category: 'USD',
        parent: 'USD',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        category: 'USD',
        parent: 'USD',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        category: 'USD',
        parent: 'USD',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        category: 'USD',
        parent: 'USD',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        category: 'USD',
        parent: 'USD',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        category: 'USD',
        parent: 'USD',
        active: true,
      },
    ];
  }
}
