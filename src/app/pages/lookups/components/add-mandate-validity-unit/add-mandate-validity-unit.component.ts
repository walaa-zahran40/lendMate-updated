import { Component } from '@angular/core';

@Component({
  selector: 'app-add-mandate-validity-unit',
  standalone: false,
  templateUrl: './add-mandate-validity-unit.component.html',
  styleUrl: './add-mandate-validity-unit.component.scss',
})
export class AddMandateValidityUnitComponent {
  addMandateValidityUnit() {
    console.log('added');
  }
}
