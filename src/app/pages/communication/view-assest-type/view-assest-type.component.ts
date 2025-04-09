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
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'assestType', header: 'Assest Type' },
      { field: 'isActive', header: 'isActive' },
    ];
    this.tableDataInside = [
      {
        nameEN: 'name en',
        nameAR: 'name ar',
        assestType: 122,
        isActive: true,
      },
      {
        nameEN: 'name en',
        nameAR: 'name ar',
        assestType: 122,
        isActive: true,
      },
      {
        nameEN: 'name en',
        nameAR: 'name ar',
        assestType: 122,
        isActive: true,
      },
    ];
  }
}
