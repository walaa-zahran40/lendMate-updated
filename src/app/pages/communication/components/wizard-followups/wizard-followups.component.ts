import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wizard-followups',
  standalone: false,
  templateUrl: './wizard-followups.component.html',
  styleUrl: './wizard-followups.component.scss',
})
export class WizardFollowupsComponent {
  cards: any[] = [];
  originalCards: any[] = [];
  followupId = this.route.snapshot.params['followupId'];
  communicationId = this.route.snapshot.params['communicationId'];

  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.buildCards();
  }
  private buildCards() {
    const communicationId = this.communicationId;
    this.originalCards = [
      {
        imgUrl: '/assets/images/shared/card/add.svg',
        imgAlt: 'add',
        title: 'Follow Up Points',
        content: '',
        link: `communication/view-follow-up-points/${this.followupId}/${communicationId}`,
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
