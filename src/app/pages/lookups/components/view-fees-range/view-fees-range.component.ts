import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-fees-range',
  standalone: false,
  templateUrl: './view-fees-range.component.html',
  styleUrl: './view-fees-range.component.scss',
})
export class ViewFeesRangeComponent {
  tableDataInside: any;
  colsInside: any[] = [];
  constructor(private router: Router) {}
  ngOnInit() {
    this.colsInside = [
      { field: 'feeTypeName', header: 'Fee Type Name' },
      { field: 'lowerBound', header: 'Lower Bound' },
      { field: 'upperBound', header: 'Upper Bound' },
      { field: 'defaultAmount', header: 'Default Amount' },
      { field: 'defaultPercentage', header: 'Default Percentage' },
      { field: 'criteriaField', header: 'Criteria Field' },
    ];
    this.tableDataInside = [
      {
        feeTypeName: 2,
        lowerBound: 0,
        upperBound: 250000,
        defaultAmount: 1250,
        defaultPercentage: 0,
        criteriaField: 'NFA',
      },
      {
        feeTypeName: 2,
        lowerBound: 0,
        upperBound: 250000,
        defaultAmount: 1250,
        defaultPercentage: 0,
        criteriaField: 'NFA',
      },
      {
        feeTypeName: 2,
        lowerBound: 0,
        upperBound: 250000,
        defaultAmount: 1250,
        defaultPercentage: 0,
        criteriaField: 'NFA',
      },
      {
        feeTypeName: 2,
        lowerBound: 0,
        upperBound: 250000,
        defaultAmount: 1250,
        defaultPercentage: 0,
        criteriaField: 'NFA',
      },
      {
        feeTypeName: 2,
        lowerBound: 0,
        upperBound: 250000,
        defaultAmount: 1250,
        defaultPercentage: 0,
        criteriaField: 'NFA',
      },
      {
        feeTypeName: 2,
        lowerBound: 0,
        upperBound: 250000,
        defaultAmount: 1250,
        defaultPercentage: 0,
        criteriaField: 'NFA',
      },
      {
        feeTypeName: 2,
        lowerBound: 0,
        upperBound: 250000,
        defaultAmount: 1250,
        defaultPercentage: 0,
        criteriaField: 'NFA',
      },
      {
        feeTypeName: 2,
        lowerBound: 0,
        upperBound: 250000,
        defaultAmount: 1250,
        defaultPercentage: 0,
        criteriaField: 'NFA',
      },
      {
        feeTypeName: 2,
        lowerBound: 0,
        upperBound: 250000,
        defaultAmount: 1250,
        defaultPercentage: 0,
        criteriaField: 'NFA',
      },
    ];
  }
  onAddRange() {
    this.router.navigate(['/lookups/add-fees-range']);
  }
}
