import { Component } from '@angular/core';

@Component({
  selector: 'app-add-page-operation',
  standalone: false,
  templateUrl: './add-page-operation.component.html',
  styleUrl: './add-page-operation.component.scss',
})
export class AddPageOperationComponent {
  addPageOperation() {
    console.log('added');
  }
}
