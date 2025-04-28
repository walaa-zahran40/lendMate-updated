import { Component } from '@angular/core';

@Component({
  selector: 'app-add-governorates',
  standalone: false,
  templateUrl: './add-governorates.component.html',
  styleUrl: './add-governorates.component.scss',
})
export class AddGovernoratesComponent {
  addGovernorates() {
    console.log('added');
  }
}
