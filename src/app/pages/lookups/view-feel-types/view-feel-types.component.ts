import { Component } from '@angular/core';
import { FeelTypes } from '../../../shared/interfaces/feel-types.interface';

@Component({
  selector: 'app-view-feel-types',
  standalone: false,
  templateUrl: './view-feel-types.component.html',
  styleUrl: './view-feel-types.component.scss',
})
export class ViewFeelTypesComponent {
  tableDataInside: FeelTypes[] = [];
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [
      { field: 'id', header: 'ID' },
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'arabicName', header: 'Arabic Name' },
      { field: 'amount', header: 'Amount ' },
      { field: 'percentage', header: 'Percentage' },
      { field: 'isPercentage', header: 'IsPercentage' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        amount: 100,
        percentage: 100,
        isPercentage: 'Yes',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        amount: 100,
        percentage: 100,
        isPercentage: 'Yes',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        amount: 100,
        percentage: 100,
        isPercentage: 'Yes',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        amount: 100,
        percentage: 100,
        isPercentage: 'Yes',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        amount: 100,
        percentage: 100,
        isPercentage: 'Yes',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        amount: 100,
        percentage: 100,
        isPercentage: 'Yes',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        amount: 100,
        percentage: 100,
        isPercentage: 'Yes',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        amount: 100,
        percentage: 100,
        isPercentage: 'Yes',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        amount: 100,
        percentage: 100,
        isPercentage: 'Yes',
        active: true,
      },
    ];
  }
}
