import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-toolbar-card',
  standalone: false,
  templateUrl: './toolbar-card.component.html',
  styleUrl: './toolbar-card.component.scss',
})
export class ToolbarCardComponent {
  @Input() title!: string;
  @Input() labelBtn!: string;
  @Input() backIcon!: string;
  @Input() backExists!: boolean;
  @Input() btnExists = true;
  @Output() viewBtn = new EventEmitter<void>();
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
