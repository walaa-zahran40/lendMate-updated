import { Component } from '@angular/core';

@Component({
  selector: 'app-add-call',
  standalone: false,
  templateUrl: './add-call.component.html',
  styleUrl: './add-call.component.scss',
})
export class AddCallComponent {
  saveInfo() {
    console.log('added');
  }
}
