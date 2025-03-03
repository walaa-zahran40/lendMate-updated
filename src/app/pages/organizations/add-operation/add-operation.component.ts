import { Component } from '@angular/core';

@Component({
  selector: 'app-add-operation',
  standalone: false,
  templateUrl: './add-operation.component.html',
  styleUrl: './add-operation.component.scss',
})
export class AddOperationComponent {
  addOperation() {
    console.log('added');
  }
}
