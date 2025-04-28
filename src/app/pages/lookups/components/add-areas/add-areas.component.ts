import { Component } from '@angular/core';

@Component({
  selector: 'app-add-areas',
  standalone: false,
  templateUrl: './add-areas.component.html',
  styleUrl: './add-areas.component.scss',
})
export class AddAreasComponent {
  addAreasAddressTypes() {
    console.log('added');
  }
}
