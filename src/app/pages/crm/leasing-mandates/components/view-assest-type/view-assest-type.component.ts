import { Component } from '@angular/core';
import { AssestType } from '../../../../../shared/interfaces/assest-type.interface';

@Component({
  selector: 'app-view-assest-type',
  standalone: false,
  templateUrl: './view-assest-type.component.html',
  styleUrl: './view-assest-type.component.scss',
})
export class ViewAssestTypeComponent {
  tableDataInside: AssestType[] = [];
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'assestName', header: 'Assest Name' },
      { field: 'assestType', header: 'Assest Type' },
    ];
    this.tableDataInside = [
      {
        nameEN: 'name en',
        nameAR: 'name ar',
        assestName: 'Name',
        assestType: 'Type',
      },
      {
        nameEN: 'name en',
        nameAR: 'name ar',
        assestName: 'Name',
        assestType: 'Type',
      },
      {
        nameEN: 'name en',
        nameAR: 'name ar',
        assestName: 'Name',
        assestType: 'Type',
      },
      {
        nameEN: 'name en',
        nameAR: 'name ar',
        assestName: 'Name',
        assestType: 'Type',
      },
      {
        nameEN: 'name en',
        nameAR: 'name ar',
        assestName: 'Name',
        assestType: 'Type',
      },
      {
        nameEN: 'name en',
        nameAR: 'name ar',
        assestName: 'Name',
        assestType: 'Type',
      },
    ];
  }
}
