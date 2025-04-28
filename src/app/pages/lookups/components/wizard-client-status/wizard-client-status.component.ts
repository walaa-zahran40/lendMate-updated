import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wizard-client-status',
  standalone: false,
  templateUrl: './wizard-client-status.component.html',
  styleUrl: './wizard-client-status.component.scss',
})
export class WizardClientStatusComponent {
  cards: any[] = [];
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cards = [
      [
        {
          imgUrl: '/assets/images/shared/card/add-status.svg',
          imgAlt: 'add Status',
          title: 'Add Status',
          content:
            'Introduce your company core info quickly to users by fill up company details',
          link: '/lookups/add-client-statuses',
        },
      ],
    ];
  }
  navigateTo(link: string) {
    this.router.navigate([link]);
  }
}
