import { Component } from '@angular/core';
import { SalesTurnover } from '../../../../shared/interfaces/sales-turnover.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-sales-turnover',
  standalone: false,
  templateUrl: './view-sales-turnover.component.html',
  styleUrl: './view-sales-turnover.component.scss',
})
export class ViewSalesTurnoverComponent {
  tableDataInside: SalesTurnover[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}
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
  addSales() {
    this.router.navigate(['/crm/clients/add-sales-turnover']);
  }
}
