import { Component } from '@angular/core';

@Component({
  selector: 'app-add-products',
  standalone: false,
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.scss',
})
export class AddProductsComponent {
  addProducts() {
    console.log('added');
  }
}
