import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TabView } from 'primeng/tabview';

@Component({
  selector: 'app-forms',
  standalone: false,
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
})
export class FormsComponent {
  value: string | undefined;
  value1: string | undefined;
  value2: string | undefined;
  value3: string | undefined;
  value4: string | undefined;
  sectors!: any[];

  selectedSectors!: any[];
  selectedSubSectors!: any[];
  subSectors!: any[];
  @Input() title!: string;
  constructor() {}
  ngOnInit() {
    this.sectors = [
      { name: 'Technology', code: 'T' },
      { name: 'Programming', code: 'P' },
      { name: 'Machine Learning', code: 'ML' },
    ];
    this.subSectors = [
      { name: 'AI', code: 'AI' },
      { name: 'Marketing Field', code: 'MF' },
    ];
  }
}
