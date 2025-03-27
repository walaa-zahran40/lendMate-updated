import { Component } from '@angular/core';
import { Calls } from '../../../shared/interfaces/calls.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-call',
  standalone: false,
  templateUrl: './view-call.component.html',
  styleUrl: './view-call.component.scss',
})
export class ViewCallComponent {
  tableDataInside: Calls[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}

  ngOnInit() {
    this.colsInside = [
      { field: 'code', header: 'Code' },
      { field: 'topic', header: 'Topic' },
      { field: 'callType', header: 'Call Type' },
      { field: 'date', header: 'Date' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
    ];
    this.tableDataInside = [
      {
        code: 122,
        topic: 'Test',
        callType: 1,
        date: new Date('12-22-2024'),
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        code: 122,
        topic: 'Test',
        callType: 1,
        date: new Date('12-22-2024'),
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        code: 122,
        topic: 'Test',
        callType: 1,
        date: new Date('12-22-2024'),
        nameEN: 'name en',
        nameAR: 'name ar',
      },
    ];
  }
  onAddSide() {
    this.router.navigate(['/communication/wizard']);
  }
}
