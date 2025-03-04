import { Component } from '@angular/core';

@Component({
  selector: 'app-add-company-types',
  standalone: false,
  templateUrl: './add-company-types.component.html',
  styleUrl: './add-company-types.component.scss',
})
export class AddCompanyTypesComponent {
  addCompanyTypes() {
    console.log('added');
  }
}
