import { Component, Input } from '@angular/core';
import { Client } from '../../interfaces/client.interface';
import { PageEvent } from '../../interfaces/page-event.interface';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() tableData: Client[] = [];
  @Input() cols: any[] = [];
  checked: boolean = false;
  first2: number = 0;

  rows2: number = 10;
  options = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 120, value: 120 },
  ];
  rowsPerPageOptions = [5, 10, 15, 20];
  rows = 10;
  currentPage = 0; // Page index starts from 0
  totalRecords: any;
  constructor() {}

  ngOnInit() {
    this.totalRecords = this.tableData.length;
  }
  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.rows);
  }
  // Handle pagination event
  onPageChange(event: any) {
    this.currentPage = event.first / event.rows; // Calculate page index
    this.rows = event.rows; // Update rows per page
  }
}
