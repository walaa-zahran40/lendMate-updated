import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, tap, take } from 'rxjs';
import { CallsFacade } from '../../store/calls/calls.facade';

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
    const callId = +this.route.snapshot.paramMap.get('id')!;
    this.facade.loadById(callId);

    this.facade.selected$
      .pipe(
        filter((m) => !!m && m.id === callId),
        take(1),
        tap((m) => (this.communicationId = m?.communicationId!))
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
  }
  onSearchClient(keyword: string) {
    const lower = keyword.toLowerCase();
    const filtered = this.originalCards.filter((card) =>
      Object.values(card).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );

    this.cards = this.chunkArray(filtered, 3);
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
