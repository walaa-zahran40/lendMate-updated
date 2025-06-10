import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { filter, take, tap } from 'rxjs';
import { CallsFacade } from '../store/calls/calls.facade';

@Component({
  selector: 'app-wizard-followups',
  standalone: false,
  templateUrl: './wizard-followups.component.html',
  styleUrl: './wizard-followups.component.scss',
})
export class WizardFollowupsComponent {
  cards: any[] = [];
  originalCards: any[] = [];
  routeId = this.route.snapshot.params['id'];
  callId = this.route.snapshot.params['callId'];
  communicationId = this.route.snapshot.params['communicationId'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private facade: CallsFacade
  ) {}
  ngOnInit(): void {
    console.log('thirs', this.route.snapshot);
    this.buildCards();
  }
  private buildCards() {
    const communicationId = this.communicationId;
    this.originalCards = [
      {
        imgUrl: '/assets/images/shared/card/add.svg',
        imgAlt: 'add',
        title: 'Follow Up Points',
        content:
          'Introduce your company core info quickly to users by fill up company details',
        link: `communication/view-follow-up-points/${this.callId}/${this.routeId}/${communicationId}`,
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
