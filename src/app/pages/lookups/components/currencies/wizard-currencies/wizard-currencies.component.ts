import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wizard-currencies',
  standalone: false,
  templateUrl: './wizard-currencies.component.html',
  styleUrl: './wizard-currencies.component.scss',
})
export class WizardCurrenciesComponent {
  cards: any[] = [];
  originalCards: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const currencyId = this.route.snapshot.paramMap.get('currencyId');

    this.originalCards = [
      {
        imgUrl: '/assets/images/shared/card/currency.svg',
        imgAlt: 'currency Exchange',
        title: 'Currency Exchange',
        content: '',
        link: `/lookups/view-currency-exchange-rates/${currencyId}`,
      },
    ];
    this.cards = this.chunkArray(this.originalCards, 3);
  }
  navigateTo(link: string) {
    this.router.navigate([link]);
  }
  onSearchCurrency(keyword: string) {
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
}
