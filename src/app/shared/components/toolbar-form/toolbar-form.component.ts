import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Location } from '@angular/common';

@Component({
  selector: 'app-toolbar-form',
  standalone: false,
  templateUrl: './toolbar-form.component.html',
  styleUrl: './toolbar-form.component.scss',
})
export class ToolbarFormComponent {
  items!: MenuItem[];
  @Input() header!: string;
  @Input() backExists!: boolean;
  @Input() viewOnly!: boolean;
  constructor(private location: Location) {}
  ngOnInit() {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
      },
    ];
  }
  goBack() {
    this.location.back();
  }
}
