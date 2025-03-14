import { Component } from '@angular/core';

@Component({
  selector: 'app-wizard-currencies',
  standalone: false,
  templateUrl: './wizard-currencies.component.html',
  styleUrl: './wizard-currencies.component.scss',
})
export class WizardCurrenciesComponent {
  cards: any[] = [];

  ngOnInit(): void {
    this.cards = [
      [
        {
          imgUrl: '/assets/images/shared/card/currency.svg',
          imgAlt: 'currency Exchange',
          title: 'Currency Exchange',
          content:
            'Introduce your company core info quickly to users by fill up company details',
        },
        {
          imgUrl: '/assets/images/shared/card/currency.svg',
          imgAlt: 'currency Exchange',
          title: 'Currency Exchange',
          content:
            'Introduce your company core info quickly to users by fill up company details',
        },
      ],
    ];
  }
}
