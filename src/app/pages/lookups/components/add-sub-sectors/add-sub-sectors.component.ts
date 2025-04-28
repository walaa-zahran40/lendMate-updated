import { Component } from '@angular/core';

@Component({
  selector: 'app-add-sub-sectors',
  standalone: false,
  templateUrl: './add-sub-sectors.component.html',
  styleUrl: './add-sub-sectors.component.scss',
})
export class AddSubSectorsComponent {
  addSubSectors() {
    console.log('added');
  }
}
