import { Component } from '@angular/core';

@Component({
  selector: 'app-add-asset-type-categories',
  standalone: false,
  templateUrl: './add-asset-type-categories.component.html',
  styleUrl: './add-asset-type-categories.component.scss',
})
export class AddAssetTypeCategoriesComponent {
  addAssestTypeCategories() {
    console.log('added');
  }
}
