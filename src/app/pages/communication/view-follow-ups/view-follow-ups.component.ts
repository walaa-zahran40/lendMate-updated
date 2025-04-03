import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-follow-ups',
  standalone: false,
  templateUrl: './view-follow-ups.component.html',
  styleUrl: './view-follow-ups.component.scss',
})
export class ViewFollowUpsComponent {
  tableDataInside: any;
  colsInside: any[] = [];
  constructor(private router: Router) {}
  ngOnInit() {
    this.colsInside = [
      { field: 'details', header: 'Details' },
      { field: 'date', header: 'Date' },
      { field: 'communicationType', header: 'Communication Type' },
    ];
    this.tableDataInside = [
      {
        details: 122,
        date: new Date('12-10-2025'),
        communicationType: 'meeting',
      },
      {
        details: 122,
        date: new Date('12-10-2025'),
        communicationType: 'meeting',
      },
      {
        details: 122,
        date: new Date('12-10-2025'),
        communicationType: 'meeting',
      },
    ];
  }
  onAddSide() {
    this.router.navigate(['/communication/wizard']);
  }
}
