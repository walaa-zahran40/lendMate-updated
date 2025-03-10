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
  @Input() tableData: any[] = [];
  @Input() cols: any[] = [];
  @Input() col1Name!: string;
  @Input() col2Name!: string;
  @Input() col3Name!: string;
  @Input() col4Name!: string;
  @Input() col5Name!: string;
  @Input() col6Name!: string;
  @Input() edit!: boolean;
  @Input() delete!: boolean;
  @Input() side!: boolean;
  @Input() checkBox!: boolean;
  @Input() uppercase!: string;
  @Input() viewClientTable!: boolean;
  @Input() viewUploadDocumentsTable!: boolean;
  @Input() viewAddressTable!: boolean;
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
