import { Component } from '@angular/core';

@Component({
  selector: 'app-add-call-types',
  standalone: false,
  templateUrl: './add-call-types.component.html',
  styleUrl: './add-call-types.component.scss',
})
export class AddCallTypesComponent {
  addCallTypes() {
    console.log('added');
  }
}
