import { Component } from '@angular/core';
import { PaymentMethods } from '../../../../shared/interfaces/payment-methods.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-payment-types',
  standalone: false,
  templateUrl: './view-payment-types.component.html',
  styleUrl: './view-payment-types.component.scss',
})
export class ViewPaymentTypesComponent {
  tableDataInside: PaymentMethods[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}

  ngOnInit() {
    this.colsInside = [
      { field: 'code', header: 'Code' },
      { field: 'nameEN', header: 'Name AR' },
      { field: 'nameAR', header: 'Name EN' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        code: 344535,
        nameEN: 'Mohamed',
        nameAR: 'Type',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Mohamed',
        nameAR: 'Type',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Mohamed',
        nameAR: 'Type',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Mohamed',
        nameAR: 'Type',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Mohamed',
        nameAR: 'Type',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Mohamed',
        nameAR: 'Type',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Mohamed',
        nameAR: 'Type',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Mohamed',
        nameAR: 'Type',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Mohamed',
        nameAR: 'Type',
        active: true,
      },
    ];
  }

  onAdd() {
    this.router.navigate(['/lookups/add-payment-types']);
  }
}
