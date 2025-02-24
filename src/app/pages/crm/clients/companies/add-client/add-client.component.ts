import { Component } from '@angular/core';

@Component({
  selector: 'app-add-client',
  standalone: false,
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.scss',
})
export class AddClientComponent {
  saveInfo() {
    console.log('saved');
  }
}
