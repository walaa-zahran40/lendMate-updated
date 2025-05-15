import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wizard-client-status',
  standalone: false,
  templateUrl: './wizard-client-status.component.html',
  styleUrl: './wizard-client-status.component.scss',
})
export class WizardClientStatusComponent {
  cards: any[] = [];
  originalCards: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const clientStatusId = this.route.snapshot.paramMap.get('clientStatusId');
    this.originalCards = [
      {
        imgUrl: '/assets/images/shared/card/add-status.svg',
        imgAlt: 'add Status',
        title: 'Add Status',
        content:
          'Introduce your company core info quickly to users by fill up company details',
        link: `/lookups/view-client-status-actions/${clientStatusId}`,
      },
    ];
    this.cards = this.chunkArray(this.originalCards, 3);
  }
  onSearchClientStatus(keyword: string) {
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
