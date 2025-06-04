import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, tap, take } from 'rxjs';
import { CallsFacade } from '../store/calls/calls.facade';

@Component({
  selector: 'app-wizard-communication',
  standalone: false,
  templateUrl: './wizard-communication.component.html',
  styleUrl: './wizard-communication.component.scss',
})
export class WizardCommunicationComponent {
  cards: any[] = [];
  originalCards: any[] = [];
  private communicationId!: number;
  routeId = this.route.snapshot.params['id'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private facade: CallsFacade
  ) {}
  ngOnInit(): void {
    console.log('thirs', this.route.snapshot);

    const callId = +this.route.snapshot.paramMap.get('id')!;
    this.facade.loadById(callId);

    this.facade.selected$
      .pipe(
        filter((m) => !!m && m.id === callId), // make sure it’s the one we asked for
        take(1),
        tap((m) => (this.communicationId = m?.communicationId!)) // ← this is the one you need
      )
      .subscribe(() => this.buildCards());
  }
  private buildCards() {
    const id = this.communicationId;
    this.originalCards = [
      {
        imgUrl: '/assets/images/shared/card/upload.svg',
        imgAlt: 'upload',
        title: 'Follow Ups',
        content:
          'Introduce your company core info quickly to users by fill up company details',
        link: `communication/view-follow-ups/${id}/${this.routeId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/add.svg',
        imgAlt: 'add',
        title: 'Follow Up Points',
        content:
          'Introduce your company core info quickly to users by fill up company details',
        link: `communication/view-follow-ups/${id}/${this.routeId}`,
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
