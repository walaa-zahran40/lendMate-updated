import { Component } from '@angular/core';
import { Calls } from '../../../shared/interfaces/calls.interface';

@Component({
  selector: 'app-view-call',
  standalone: false,
  templateUrl: './view-call.component.html',
  styleUrl: './view-call.component.scss',
})
export class ViewCallComponent {
  tableDataInside: Calls[] = [];
  colsInside: any[] = [];
  ngOnInit() {
    this.colsInside = [
      { field: 'id', header: 'ID' },
      { field: 'topic', header: 'Topic' },
      { field: 'clientId', header: 'Client Name' },
      { field: 'callType', header: 'Call Type' },
      { field: 'date', header: 'Date' },
    ];
    this.tableDataInside = [
      {
        id: 122,
        topic: 'Test',
        clientId: 'Walaa',
        callType: 1,
        date: new Date('12-22-2024'),
      },
      {
        id: 122,
        topic: 'Test',
        clientId: 'Walaa',
        callType: 1,
        date: new Date('12-22-2024'),
      },
      {
        id: 122,
        topic: 'Test',
        clientId: 'Walaa',
        callType: 1,
        date: new Date('12-22-2024'),
      },
    ];
  }
}
