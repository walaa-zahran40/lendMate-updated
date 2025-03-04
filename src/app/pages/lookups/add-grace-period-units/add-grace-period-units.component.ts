import { Component } from '@angular/core';

@Component({
  selector: 'app-add-grace-period-units',
  standalone: false,
  templateUrl: './add-grace-period-units.component.html',
  styleUrl: './add-grace-period-units.component.scss',
})
export class AddGracePeriodUnitsComponent {
  addGracePeriod() {
    console.log('added');
  }
}
