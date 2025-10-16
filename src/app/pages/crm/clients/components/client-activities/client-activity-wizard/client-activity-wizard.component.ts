import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WizardData } from '../../../resolvers/client-activity-wizard.resolver';

@Component({
  selector: 'app-client-activity-wizard',
  standalone: false,
  templateUrl: './client-activity-wizard.component.html',
  styleUrl: './client-activity-wizard.component.scss',
})
export class ClientActivityWizardComponent {
  cards: any[] = [];
  originalCards: any[] = [];
  hasClient = false;
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    const data = this.route.snapshot.data['wizard'] as WizardData | undefined;

    if (data && Number.isFinite(data.clientId)) {
      this.hasClient = true;
      this.originalCards = data.cards;
      this.cards = this.chunkArray(this.originalCards, 3);
    } else {
      // No clientId route: show an empty state or prompt to choose/search a client.
      this.hasClient = false;
      this.originalCards = [];
      this.cards = [];
      // Optionally, navigate to a client picker:
      // this.router.navigate(['/crm/clients/view-clients']);
    }
  }
  onSearchClient(keyword: string) {
    const lower = keyword.toLowerCase();
    const filtered = this.originalCards.filter((card) =>
      Object.values(card).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );

    this.cards = this.chunkArray(filtered, 3);
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
