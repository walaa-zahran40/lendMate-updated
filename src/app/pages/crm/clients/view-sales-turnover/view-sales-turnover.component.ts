import { Component } from '@angular/core';
import { SalesTurnover } from '../../../../shared/interfaces/sales-turnover.interface';

@Component({
  selector: 'app-view-sales-turnover',
  standalone: false,
  templateUrl: './view-sales-turnover.component.html',
  styleUrl: './view-sales-turnover.component.scss',
})
export class ViewSalesTurnoverComponent {
  tableDataInside: SalesTurnover[] = [];
  colsInside: any[] = [];
  ngOnInit() {
    this.colsInside = [
      { field: 'amount', header: 'Amount' },
      { field: 'date', header: 'Date' },
    ];
    this.tableDataInside = [
      {
        amount: 'Amount',
        date: new Date('10/10/2024'),
      },
      {
        amount: 'Amount',
        date: new Date('10/10/2024'),
      },
      {
        amount: 'Amount',
        date: new Date('10/10/2024'),
      },
      {
        amount: 'Amount',
        date: new Date('10/10/2024'),
      },
    ];
  }
}
