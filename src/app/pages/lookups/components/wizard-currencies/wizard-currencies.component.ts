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
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const currencyId = this.route.snapshot.paramMap.get('currencyId');

    this.cards = [
      [
        {
          imgUrl: '/assets/images/shared/card/currency.svg',
          imgAlt: 'currency Exchange',
          title: 'Currency Exchange',
          content:
            'Introduce your company core info quickly to users by fill up company details',
          link: `/lookups/view-currencies-exchange/${currencyId}`,
        },
      ],
    ];
  }
  navigateTo(link: string) {
    this.router.navigate([link]);
  }
}
