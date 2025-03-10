import { Component } from '@angular/core';

@Component({
  selector: 'app-client-activity-wizard',
  standalone: false,
  templateUrl: './client-activity-wizard.component.html',
  styleUrl: './client-activity-wizard.component.scss',
})
export class ClientActivityWizardComponent {
  cards: any[] = [];

  ngOnInit(): void {
    this.cards = [
      [
        {
          imgUrl: '/assets/images/shared/card/upload.svg',
          imgAlt: 'upload',
          title: 'Upload Documents',
          content:
            'Introduce your company core info quickly to users by fill up company details',
        },
        {
          imgUrl: '/assets/images/shared/card/add.svg',
          imgAlt: 'add',
          title: 'Add Address',
          content:
            'Introduce your company core info quickly to users by fill up company details',
        },
        {
          imgUrl: '/assets/images/shared/card/sales.svg',
          imgAlt: 'sales',
          title: 'Sales Turnover',
          content:
            'Introduce your company core info quickly to users by fill up company details',
        },
      ],
      [
        {
          imgUrl: '/assets/images/shared/card/phone.svg',
          imgAlt: 'phone',
          title: 'Phone Number',
          content:
            'Introduce your company core info quickly to users by fill up company details',
        },
        {
          imgUrl: '/assets/images/shared/card/contact.svg',
          imgAlt: 'contact',
          title: 'Contact Person',
          content:
            'Introduce your company core info quickly to users by fill up company details',
        },
        {
          imgUrl: '/assets/images/shared/card/cr.svg',
          imgAlt: 'cr',
          title: 'CR Authority Office',
          content:
            'Introduce your company core info quickly to users by fill up company details',
        },
      ],
      [
        {
          imgUrl: '/assets/images/shared/card/tax.svg',
          imgAlt: 'tax',
          title: 'TAX Authority Office',
          content:
            'Introduce your company core info quickly to users by fill up company details',
        },
        {
          imgUrl: '/assets/images/shared/card/central.svg',
          imgAlt: 'central',
          title: 'Central Bank Info',
          content:
            'Introduce your company core info quickly to users by fill up company details',
        },
        {
          imgUrl: '/assets/images/shared/card/share.svg',
          imgAlt: 'share',
          title: 'Share Holders',
          content:
            'Introduce your company core info quickly to users by fill up company details',
        },
      ],
      [
        {
          imgUrl: '/assets/images/shared/card/tml.svg',
          imgAlt: 'tml',
          title: 'TML Officer',
          content:
            'Introduce your company core info quickly to users by fill up company details',
        },
        {
          imgUrl: '/assets/images/shared/card/meeting.svg',
          imgAlt: 'meeting',
          title: 'Meeting',
          content:
            'Introduce your company core info quickly to users by fill up company details',
        },
        {
          imgUrl: '/assets/images/shared/card/mandate.svg',
          imgAlt: 'mandate',
          title: 'Mandate',
          content:
            'Introduce your company core info quickly to users by fill up company details',
        },
      ],
    ];
  }
}
