import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnChanges {
  @Input() imgUrl!: string;
  @Input() imgAlt!: string;
  @Input() title!: string;
  @Input() content!: string;
  @Output() navigation = new EventEmitter<void>();
  translatedTitle: string = '';
  translatedContent: string = '';
  constructor(private translate: TranslateService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['title']) {
      this.translatedTitle = this.title
        ? this.translate.instant(this.title)
        : '';
    }

    if (changes['content']) {
      this.translatedContent = this.content
        ? this.translate.instant(this.content)
        : '';
    }
  }
}
