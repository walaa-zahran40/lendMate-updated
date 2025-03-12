import { Component } from '@angular/core';
import { AssestType } from '../../../../shared/interfaces/assest-type.interface';

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
      { field: 'assestName', header: 'aName' },
      { field: 'assestType', header: 'aType' },
    ];
    this.tableDataInside = [
      {
        assestName: 'Name',
        assestType: 'Type',
      },
      {
        assestName: 'Name',
        assestType: 'Type',
      },
      {
        assestName: 'Name',
        assestType: 'Type',
      },
      {
        assestName: 'Name',
        assestType: 'Type',
      },
      {
        assestName: 'Name',
        assestType: 'Type',
      },
      {
        assestName: 'Name',
        assestType: 'Type',
      },
    ];
  }
}
