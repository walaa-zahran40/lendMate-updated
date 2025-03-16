import { Component } from '@angular/core';

@Component({
  selector: 'app-wizard',
  standalone: false,
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.scss',
})
export class WizardComponent {
  cards: any[] = [];

  ngOnInit(): void {
    this.cards = [
      [
        {
          imgUrl: '/assets/images/shared/card/details.svg',
          imgAlt: 'details',
          title: 'Meeting Details',
          content:
            'Introduce your company core info quickly to users by fill up company details',
        },
        {
          imgUrl: '/assets/images/shared/card/followup.svg',
          imgAlt: 'followup',
          title: 'Follow Ups',
          content:
            'Introduce your company core info quickly to users by fill up company details',
        },
        {
          imgUrl: '/assets/images/shared/card/followup.svg',
          imgAlt: 'followup',
          title: 'Follow Ups Points',
          content:
            'Introduce your company core info quickly to users by fill up company details',
        },
      ],
    ];
  }
}
