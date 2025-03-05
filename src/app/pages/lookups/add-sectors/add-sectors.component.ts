import { Component } from '@angular/core';

@Component({
  selector: 'app-add-sectors',
  standalone: false,
  templateUrl: './add-sectors.component.html',
  styleUrl: './add-sectors.component.scss',
})
export class AddSectorsComponent {
  addSectors() {
    console.log('added');
  }
}
