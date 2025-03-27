import { Component } from '@angular/core';
import { AssetsTypeCategories } from '../../../shared/interfaces/assest-type-categories.interface';

@Component({
  selector: 'app-view-assest-type-categories',
  standalone: false,
  templateUrl: './view-assest-type-categories.component.html',
  styleUrl: './view-assest-type-categories.component.scss',
})
export class ViewAssestTypeCategoriesComponent {
  tableDataInside: AssetsTypeCategories[] = [];
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [
      { field: 'code', header: 'Code' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'limit', header: 'Limit' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        limit: 0.2,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        limit: 0.2,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        limit: 0.2,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        limit: 0.2,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        limit: 0.2,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        limit: 0.2,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        limit: 0.2,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        limit: 0.2,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        limit: 0.2,
        active: true,
      },
    ];
  }
}
