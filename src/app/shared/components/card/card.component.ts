import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() imgUrl!: string;
  @Input() imgAlt!: string;
  @Input() title!: string;
  @Input() content!: string;
  @Output() navigation = new EventEmitter<void>();
}
