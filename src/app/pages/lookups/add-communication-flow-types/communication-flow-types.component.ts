import { Component } from '@angular/core';

@Component({
  selector: 'app-communication-flow-types',
  standalone: false,
  templateUrl: './communication-flow-types.component.html',
  styleUrl: './communication-flow-types.component.scss',
})
export class AddCommunicationFlowTypesComponent {
  addCommunicationFlowType() {
    console.log('added');
  }
}
