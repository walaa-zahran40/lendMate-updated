import { Component } from '@angular/core';

@Component({
  selector: 'app-add-business-lines',
  standalone: false,
  templateUrl: './add-business-lines.component.html',
  styleUrl: './add-business-lines.component.scss',
})
export class AddBusinessLinesComponent {
  addBusinessLines() {
    console.log('added');
  }
}
