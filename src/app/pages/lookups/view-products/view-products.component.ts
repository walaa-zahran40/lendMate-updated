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
      { field: 'code', header: 'Code' },
      { field: 'nameEN', header: 'Mohamed' },
      { field: 'nameAR', header: 'Arabic Name' },
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
  addProducts() {
    this.router.navigate(['/lookups/add-products']);
  }
}
