import { Component } from '@angular/core';

@Component({
  selector: 'app-add-assest-type-categories',
  standalone: false,
  templateUrl: './add-assest-type-categories.component.html',
  styleUrl: './add-assest-type-categories.component.scss',
})
export class AddAssestTypeCategoriesComponent {
  addAssestTypeCategories() {
    console.log('added');
  }
}
