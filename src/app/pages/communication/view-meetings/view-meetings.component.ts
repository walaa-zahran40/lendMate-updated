import { Component } from '@angular/core';
import { Meetings } from '../../../shared/interfaces/meetings.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-meetings',
  standalone: false,
  templateUrl: './view-meetings.component.html',
  styleUrl: './view-meetings.component.scss',
})
export class ViewMeetingsComponent {
  tableDataInside: Meetings[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}
  ngOnInit() {
    this.colsInside = [
      { field: 'code', header: 'Code' },
      { field: 'topic', header: 'Topic' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'startDate', header: 'Start Date' },
      { field: 'endDate', header: 'End Date' },
    ];
    this.tableDataInside = [
      {
        id: 122,
        topic: 'topic',
        nameEN: '134',
        nameAR: 'name ar',
        startDate: new Date('10-2-2023'),
        endDate: new Date('10-10-2023'),
      },
      {
        id: 122,
        topic: 'topic',
        nameEN: '134',
        nameAR: 'name ar',
        startDate: new Date('10-2-2023'),
        endDate: new Date('10-10-2023'),
      },
      {
        id: 122,
        topic: 'topic',
        nameEN: '134',
        nameAR: 'name ar',
        startDate: new Date('10-2-2023'),
        endDate: new Date('10-10-2023'),
      },
      {
        id: 122,
        topic: 'topic',
        nameEN: '134',
        nameAR: 'name ar',
        startDate: new Date('10-2-2023'),
        endDate: new Date('10-10-2023'),
      },
    ];
  }
  onAddMeeting() {
    this.router.navigate(['/communication/add-meeting']);
  }
}
