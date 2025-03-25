import { Component } from '@angular/core';
import { Products } from '../../../shared/interfaces/products.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-products',
  standalone: false,
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.scss',
})
export class ViewProductsComponent {
  tableDataInside: Products[] = [];
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
  addProducts() {
    this.router.navigate(['/lookups/add-products']);
  }
}
