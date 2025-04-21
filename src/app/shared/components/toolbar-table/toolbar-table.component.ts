import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-toolbar-table',
  standalone: false,
  templateUrl: './toolbar-table.component.html',
  styleUrl: './toolbar-table.component.scss',
})
export class ToolbarTableComponent {
  @Input() title!: string;
  @Input() labelBtn!: string;
  @Input() iconBtn!: string;
  @Input() backIcon!: string;
  @Input() customSpacing!: string;
  @Input() backExists!: boolean;
  @Input() exports!: boolean;
  @Input() btnAdd: boolean = true;
  @Output() toggleFiltersEvent = new EventEmitter<boolean>();
  showFilters = false;
  @Output() exportExcel = new EventEmitter<void>();
  @Output() addBtn = new EventEmitter<void>();
  @Output() searchChange = new EventEmitter<string>();
  searchValue: string = '';
  constructor(private location: Location) {}
  goBack() {
    this.location.back();
  }
  onSearchInput(value: string) {
    this.searchValue = value;
    this.searchChange.emit(this.searchValue);
  }
  toggleFilters(): void {
    this.showFilters = !this.showFilters;
    this.toggleFiltersEvent.emit(this.showFilters);
  }
  onExportExcel() {
    this.exportExcel.emit();
  }
}
