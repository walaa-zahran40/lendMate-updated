import { Component, Input } from '@angular/core';

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
}
