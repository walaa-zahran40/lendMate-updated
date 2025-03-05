import { Component } from '@angular/core';

@Component({
  selector: 'app-add-call-action-types',
  standalone: false,
  templateUrl: './add-call-action-types.component.html',
  styleUrl: './add-call-action-types.component.scss',
})
export class AddCallActionTypesComponent {
  addCallActionTypes() {
    console.log('added');
  }
}
