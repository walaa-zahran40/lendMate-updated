import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wizard',
  standalone: false,
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.scss',
})
export class WizardComponent {
  cards: any[] = [];
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    console.log('route', this.route.snapshot);
    const routeId = this.route.snapshot.params['leasingId'];
    this.cards = [
      [
        {
          imgUrl: '/assets/images/shared/card/clone.svg',
          imgAlt: 'clone',
          title: 'Clone',
          content:
            'Introduce your company core info quickly to users by fill up company details',
          link: `/crm/leasing-mandates/add-child-mandate/${routeId}`,
        },
        {
          imgUrl: '/assets/images/shared/card/mandate-manage.svg',
          imgAlt: 'mandate',
          title: 'Manage Mandate Terms',
          content:
            'Introduce your company core info quickly to users by fill up company details',
          link: '/crm/leasing-mandates/view-manage-mandate-terms',
        },
      ],
    ];
  }
  navigateTo(link: string) {
    this.router.navigate([link]);
  }
}
