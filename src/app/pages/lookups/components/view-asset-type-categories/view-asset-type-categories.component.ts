import { Component } from '@angular/core';
import { AssetsTypeCategories } from '../../../../shared/interfaces/assest-type-categories.interface';

@Component({
  selector: 'app-view-asset-type-categories',
  standalone: false,
  templateUrl: './view-asset-type-categories.component.html',
  styleUrl: './view-asset-type-categories.component.scss',
})
export class ViewAssetTypeCategoriesComponent {
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
