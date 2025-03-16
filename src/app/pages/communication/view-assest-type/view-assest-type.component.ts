import { Component } from '@angular/core';
import { AssestTypeCommunication } from '../../../shared/interfaces/assest-type-communication.interface';

@Component({
  selector: 'app-view-assest-type',
  standalone: false,
  templateUrl: './view-assest-type.component.html',
  styleUrl: './view-assest-type.component.scss',
})
export class ViewAssestTypeComponent {
  tableDataInside: AssestTypeCommunication[] = [];
  colsInside: any[] = [];
  ngOnInit() {
    this.colsInside = [
      { field: 'contactPerson', header: 'Contact Person' },
      { field: 'mustAttend', header: 'Must Attend' },
    ];
    this.tableDataInside = [
      {
        assestType: 122,
        isActive: true,
      },
      {
        assestType: 122,
        isActive: true,
      },
      { assestType: 122, isActive: true },
    ];
  }
}
