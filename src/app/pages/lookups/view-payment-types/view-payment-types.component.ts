import { Component } from '@angular/core';
import { PaymentMethods } from '../../../shared/interfaces/payment-methods.interface';
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
      { field: 'id', header: 'ID' },
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Mohamed' },
      { field: 'arabicName', header: 'Arabic Name' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        id: 501,
        code: 344535,
        name: 'Mohamed',
        arabicName: 'Type',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Mohamed',
        arabicName: 'Type',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Mohamed',
        arabicName: 'Type',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Mohamed',
        arabicName: 'Type',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Mohamed',
        arabicName: 'Type',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Mohamed',
        arabicName: 'Type',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Mohamed',
        arabicName: 'Type',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Mohamed',
        arabicName: 'Type',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Mohamed',
        arabicName: 'Type',
        active: true,
      },
    ];
  }

  onAdd() {
    this.router.navigate(['/lookups/add-payment-types']);
  }
}
