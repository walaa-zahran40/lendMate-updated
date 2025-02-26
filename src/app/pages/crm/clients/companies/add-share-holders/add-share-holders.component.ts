import { Component } from '@angular/core';

@Component({
  selector: 'app-add-share-holders',
  standalone: false,
  templateUrl: './add-share-holders.component.html',
  styleUrl: './add-share-holders.component.scss',
})
export class AddShareHoldersComponent {
  addShareHolder() {
    console.log('added');
  }
}
