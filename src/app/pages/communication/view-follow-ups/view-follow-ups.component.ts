import { Component } from '@angular/core';
import { FollowUps } from '../../../shared/interfaces/follow-ups.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-follow-ups',
  standalone: false,
  templateUrl: './view-follow-ups.component.html',
  styleUrl: './view-follow-ups.component.scss',
})
export class ViewFollowUpsComponent {
  tableDataInside: FollowUps[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}
  ngOnInit() {
    this.colsInside = [
      { field: 'details', header: 'Details' },
      { field: 'date', header: 'Date' },
    ];
    this.tableDataInside = [
      {
        details: 122,
        date: new Date('12-10-2025'),
      },
      {
        details: 122,
        date: new Date('12-10-2025'),
      },
      { details: 122, date: new Date('12-10-2025') },
    ];
  }
  onAddSide() {
    this.router.navigate(['/communication/wizard']);
  }
}
