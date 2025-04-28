import { Component } from '@angular/core';

@Component({
  selector: 'app-asset-types',
  standalone: false,
  templateUrl: './add-asset-types.component.html',
  styleUrl: './add-asset-types.component.scss',
})
export class AddAssetTypesComponent {
  addAssestTypes() {
    console.log('added');
  }
}
