import { Component } from '@angular/core';
import { FollowUpPoints } from '../../../shared/interfaces/followup-points.interface';

@Component({
  selector: 'app-view-follow-up-points',
  standalone: false,
  templateUrl: './view-follow-up-points.component.html',
  styleUrl: './view-follow-up-points.component.scss',
})
export class ViewFollowUpPointsComponent {
  tableDataInside: FollowUpPoints[] = [];
  colsInside: any[] = [];
  ngOnInit() {
    this.colsInside = [
      { field: 'topic', header: 'Topic' },
      { field: 'details', header: 'Details' },
      { field: 'dueDate', header: 'Due Date' },
      { field: 'actualDate', header: 'Actual Date' },
    ];
    this.tableDataInside = [
      {
        topic: 454536,
        details: 'Mohamed',
        dueDate: new Date('12-10-2025'),
        actualDate: new Date('12-10-2025'),
      },
      {
        topic: 454536,
        details: 'Mohamed',
        dueDate: new Date('12-10-2025'),
        actualDate: new Date('12-10-2025'),
      },
      {
        topic: 454536,
        details: 'Mohamed',
        dueDate: new Date('12-10-2025'),
        actualDate: new Date('12-10-2025'),
      },
    ];
  }
}
