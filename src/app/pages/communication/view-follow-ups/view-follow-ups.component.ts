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
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
    ];
    this.tableDataInside = [
      {
        details: 122,
        date: new Date('12-10-2025'),
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        details: 122,
        date: new Date('12-10-2025'),
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        details: 122,
        date: new Date('12-10-2025'),
        nameEN: 'name en',
        nameAR: 'name ar',
      },
    ];
  }
  onAddSide() {
    this.router.navigate(['/communication/wizard']);
  }
}
