import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar-compound',
  standalone: false,
  templateUrl: './toolbar-compound.component.html',
  styleUrl: './toolbar-compound.component.scss',
})
export class ToolbarCompoundComponent {
  dateRange: Date[] | null = null;
  dateRangeLabel: string = 'Select date range';
  @Input() totalInstallments: number = 0;
  @Input() totalInterest: number = 0;
  @Input() totalRent: number = 0;

  updateLabel() {
    if (this.dateRange && this.dateRange.length === 2) {
      const start = this.formatDate(this.dateRange[0]);
      const end = this.formatDate(this.dateRange[1]);
      this.dateRangeLabel = '';
    } else {
      this.dateRangeLabel = 'Select date range';
    }
  }

  private formatDate(date: Date): string {
    return date?.toISOString().split('T')[0];
  }
}
