import { Component } from '@angular/core';
import { FeelTypes } from '../../../../shared/interfaces/feel-types.interface';

@Component({
  selector: 'app-view-fee-types',
  standalone: false,
  templateUrl: './view-fee-types.component.html',
  styleUrl: './view-fee-types.component.scss',
})
export class ViewFeeTypesComponent {
  tableDataInside: FeelTypes[] = [];
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [
      { field: 'code', header: 'Code' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'amount', header: 'Amount ' },
      { field: 'percentage', header: 'Percentage' },
      { field: 'isPercentage', header: 'IsPercentage' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        amount: 100,
        percentage: 100,
        isPercentage: 'Yes',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        amount: 100,
        percentage: 100,
        isPercentage: 'Yes',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        amount: 100,
        percentage: 100,
        isPercentage: 'Yes',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        amount: 100,
        percentage: 100,
        isPercentage: 'Yes',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        amount: 100,
        percentage: 100,
        isPercentage: 'Yes',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        amount: 100,
        percentage: 100,
        isPercentage: 'Yes',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        amount: 100,
        percentage: 100,
        isPercentage: 'Yes',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        amount: 100,
        percentage: 100,
        isPercentage: 'Yes',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        amount: 100,
        percentage: 100,
        isPercentage: 'Yes',
        active: true,
      },
    ];
  }
}
