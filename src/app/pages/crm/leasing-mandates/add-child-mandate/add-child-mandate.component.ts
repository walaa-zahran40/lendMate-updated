import { Component } from '@angular/core';

@Component({
  selector: 'app-add-child-mandate',
  standalone: false,
  templateUrl: './add-child-mandate.component.html',
  styleUrl: './add-child-mandate.component.scss',
})
export class AddChildMandateComponent {
  saveInfo() {
    console.log('added');
  }
}
