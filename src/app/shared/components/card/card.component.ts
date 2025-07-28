import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnChanges, OnDestroy {
  @Input() imgUrl!: string;
  @Input() imgAlt!: string;
  @Input() title!: string;
  @Input() content!: string;
  @Output() navigation = new EventEmitter<void>();
  translatedTitle: string = '';
  translatedContent: string = '';
  private langSub!: Subscription;

  constructor(private translate: TranslateService) {
    this.langSub = this.translate.onLangChange.subscribe(() => {
      this.translateInputs();
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['title'] || changes['content']) {
      this.translateInputs();
    }
  }
  private translateInputs() {
    this.translatedTitle = this.title ? this.translate.instant(this.title) : '';
    this.translatedContent = this.content
      ? this.translate.instant(this.content)
      : '';
  }
  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }
}
