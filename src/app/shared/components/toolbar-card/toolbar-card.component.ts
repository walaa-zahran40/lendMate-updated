import { Component, Input } from '@angular/core';

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
}
