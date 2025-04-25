import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-activity-wizard',
  standalone: false,
  templateUrl: './client-activity-wizard.component.html',
  styleUrl: './client-activity-wizard.component.scss',
})
export class ClientActivityWizardComponent {
  cards: any[] = [];
  clientId!: number;

  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.clientId = +this.route.snapshot.paramMap.get('clientId')!;
    console.log('Loaded clientId:', this.clientId);
    this.cards = [
      [
        {
          imgUrl: '/assets/images/shared/card/upload.svg',
          imgAlt: 'upload',
          title: 'Upload Documents',
          content:
            'Introduce your company core info quickly to users by fill up company details',
          link: '/crm/clients/view-upload-documents',
        },
        {
          imgUrl: '/assets/images/shared/card/add.svg',
          imgAlt: 'add',
          title: 'Add Address',
          content:
            'Introduce your company core info quickly to users by fill up company details',
          link: '/crm/clients/add-address',
        },
        {
          imgUrl: '/assets/images/shared/card/sales.svg',
          imgAlt: 'sales',
          title: 'Sales Turnover',
          content:
            'Introduce your company core info quickly to users by fill up company details',
          link: '/crm/clients/add-sales-turnover',
        },
      ],
      [
        {
          imgUrl: '/assets/images/shared/card/phone.svg',
          imgAlt: 'phone',
          title: 'Phone Number',
          content:
            'Introduce your company core info quickly to users by fill up company details',
          link: '/crm/clients/add-phone-number',
        },
        {
          imgUrl: '/assets/images/shared/card/contact.svg',
          imgAlt: 'contact',
          title: 'Contact Person',
          content:
            'Introduce your company core info quickly to users by fill up company details',
          link: '/crm/clients/add-contact-person',
        },
        {
          imgUrl: '/assets/images/shared/card/cr.svg',
          imgAlt: 'cr',
          title: 'CR Authority Office',
          content:
            'Introduce your company core info quickly to users by fill up company details',
          link: '/crm/clients/add-cr-authority-office',
        },
      ],
      [
        {
          imgUrl: '/assets/images/shared/card/tax.svg',
          imgAlt: 'tax',
          title: 'TAX Authority Office',
          content:
            'Introduce your company core info quickly to users by fill up company details',
          link: '/crm/clients/add-tax-authority-office',
        },
        {
          imgUrl: '/assets/images/shared/card/central.svg',
          imgAlt: 'central',
          title: 'Central Bank Info',
          content:
            'Introduce your company core info quickly to users by fill up company details',
          link: '/crm/clients/add-central-bank-info',
        },
        {
          imgUrl: '/assets/images/shared/card/share.svg',
          imgAlt: 'share',
          title: 'Share Holders',
          content:
            'Introduce your company core info quickly to users by fill up company details',
          link: '/crm/clients/add-share-holders',
        },
      ],
      [
        {
          imgUrl: '/assets/images/shared/card/tml.svg',
          imgAlt: 'tml',
          title: 'TML Officer',
          content:
            'Introduce your company core info quickly to users by fill up company details',
          link: '/crm/clients/add-tml-officer',
        },
        {
          imgUrl: '/assets/images/shared/card/meeting.svg',
          imgAlt: 'meeting',
          title: 'Meeting',
          content:
            'Introduce your company core info quickly to users by fill up company details',
          link: '/communication/add-meeting',
        },
        {
          imgUrl: '/assets/images/shared/card/mandate.svg',
          imgAlt: 'mandate',
          title: 'Mandate',
          content:
            'Introduce your company core info quickly to users by fill up company details',
          link: '/crm/leasing-mandates/add-mandate',
        },
      ],
      [
        {
          imgUrl: '/assets/images/shared/card/mandate.svg',
          imgAlt: 'guarantor',
          title: 'Guarantor',
          content:
            'Introduce your company core info quickly to users by fill up company details',
          link: '/crm/clients/view-client-guarantor',
        },
        {
          imgUrl: '/assets/images/shared/card/mandate.svg',
          imgAlt: 'Identity',
          title: 'Identity',
          content:
            'Introduce your company core info quickly to users by fill up company details',
          link: '/crm/clients/view-client-identity',
        },
        {
          imgUrl: '/assets/images/shared/card/mandate.svg',
          imgAlt: 'Legal',
          title: 'Legal',
          content:
            'Introduce your company core info quickly to users by fill up company details',
          link: '/crm/clients/view-client-legal',
        },
      ],
      [
        {
          imgUrl: '/assets/images/shared/card/mandate.svg',
          imgAlt: 'officer',
          title: 'Officer',
          content:
            'Introduce your company core info quickly to users by fill up company details',
          link: '/crm/clients/view-client-officer',
        },
        {
          imgUrl: '/assets/images/shared/card/mandate.svg',
          imgAlt: 'Identity',
          title: 'Identity',
          content:
            'Introduce your company core info quickly to users by fill up company details',
          link: '/crm/clients/view-client-identity',
        },
        {
          imgUrl: '/assets/images/shared/card/mandate.svg',
          imgAlt: 'Legal',
          title: 'Legal',
          content:
            'Introduce your company core info quickly to users by fill up company details',
          link: '/crm/clients/view-client-legal',
        },
      ],
    ];
  }
  navigateTo(link: string) {
    this.router.navigate([link], {
      queryParams: { id: this.clientId },
    });
  }
  navigateToInfo() {
    this.router.navigate(['/crm/clients/company-view-only']);
  }
}
