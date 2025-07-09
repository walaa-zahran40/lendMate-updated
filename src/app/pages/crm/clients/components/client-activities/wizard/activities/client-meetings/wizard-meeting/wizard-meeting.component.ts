import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, tap, take } from 'rxjs';
import { MeetingsFacade } from '../../../../../../../../communication/store/meetings/meetings.facade';

@Component({
  selector: 'app-wizard-meeting',
  standalone: false,
  templateUrl: './wizard-meeting.component.html',
  styleUrl: './wizard-meeting.component.scss',
})
export class WizardMeetingComponent {
  cards: any[] = [];
  originalCards: any[] = [];
  private communicationId!: number;
  routeId = this.route.snapshot.params['id'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private facade: MeetingsFacade
  ) {}
  ngOnInit(): void {
    console.log('thirs', this.route.snapshot);

    const meetingId = +this.route.snapshot.paramMap.get('id')!;
    this.facade.loadById(meetingId);

    this.facade.selected$
      .pipe(
        filter((m) => !!m && m.id === meetingId), // make sure it’s the one we asked for
        take(1),
        tap((m) => (this.communicationId = m?.communicationId!)) // ← this is the one you need
      )
      .subscribe(() => this.buildCards());
  }
  private buildCards() {
    const communicationId = this.communicationId;
    this.originalCards = [
      {
        imgUrl: '/assets/images/shared/card/upload.svg',
        imgAlt: 'upload',
        title: 'Follow Ups',
        content: '',
        link: `communication/view-follow-ups/${communicationId}`,
      },
    ];
    this.cards = this.chunkArray(this.originalCards, 3);
    console.log('🧩 Built cards:', this.originalCards);
    console.log('🔀 Chunked cards:', this.cards);
  }
  onSearchClient(keyword: string) {
    const lower = keyword.toLowerCase();
    const filtered = this.originalCards.filter((card) =>
      Object.values(card).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );

    this.cards = this.chunkArray(filtered, 3); // 3 per row
    console.log('Original Cards:', this.originalCards);
    console.log('Chunked Cards:', this.cards);
  }
  chunkArray(arr: any[], chunkSize: number): any[][] {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }
  navigateTo(link: string) {
    this.router.navigate([link]);
  }
}
