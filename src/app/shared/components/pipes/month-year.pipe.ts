import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'monthYear' })
export class MonthYearPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(range: string): string | null {
    if (!range) return null;
    // 1. Grab everything before the "–"
    const [startPart] = range.split('–');
    // 2. Ensure it has a year on the end (we'll pull it from the original string)
    const yearMatch = range.match(/\d{4}/);
    const dateString = `${startPart.trim()}, ${yearMatch ? yearMatch[0] : ''}`;
    // 3. Parse and format
    const dt = new Date(dateString);
    return this.datePipe.transform(dt, 'MMMM yyyy');
  }
}
