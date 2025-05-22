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
  originalCards: any[] = [];
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    const clientId = this.route.snapshot.paramMap.get('clientId');
    this.originalCards = [
      {
        imgUrl: '/assets/images/shared/card/upload.svg',
        imgAlt: 'upload',
        title: 'Upload Documents',
        content:
          'Introduce your company core info quickly to users by fill up company details',
        link: `/crm/clients/view-upload-documents/${clientId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/add.svg',
        imgAlt: 'add',
        title: 'Add Address',
        content:
          'Introduce your company core info quickly to users by fill up company details',
        link: `crm/clients/view-client-addresses/${clientId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/sales.svg',
        imgAlt: 'sales',
        title: 'Sales Turnover',
        content:
          'Introduce your company core info quickly to users by fill up company details',
        link: `/crm/clients/view-sales-turnovers/${clientId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/phone.svg',
        imgAlt: 'phone',
        title: 'Phone Number',
        content:
          'Introduce your company core info quickly to users by fill up company details',
        link: `/crm/clients/view-phone-numbers/${clientId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/contact.svg',
        imgAlt: 'contact',
        title: 'Contact Person',
        content:
          'Introduce your company core info quickly to users by fill up company details',
        link: `/crm/clients/view-contact-person/${clientId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/cr.svg',
        imgAlt: 'cr',
        title: 'CR Authority Office',
        content:
          'Introduce your company core info quickly to users by fill up company details',
        link: `/crm/clients/view-client-cr-authority-offices/${clientId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/tax.svg',
        imgAlt: 'tax',
        title: 'TAX Authority Office',
        content:
          'Introduce your company core info quickly to users by fill up company details',
        link: `/crm/clients/view-client-tax-authority-offices/${clientId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/central.svg',
        imgAlt: 'central',
        title: 'Central Bank Info',
        content:
          'Introduce your company core info quickly to users by fill up company details',
        link: `/crm/clients/view-client-central-bank-info/${clientId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/share.svg',
        imgAlt: 'share',
        title: 'Share Holders',
        content:
          'Introduce your company core info quickly to users by fill up company details',
        link: `/crm/clients/view-client-share-holders/${clientId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/tml.svg',
        imgAlt: 'tml',
        title: 'TML Officer',
        content:
          'Introduce your company core info quickly to users by fill up company details',
        link: `/crm/clients/view-client-tml-officers/${clientId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/mandate.svg',
        imgAlt: 'guarantor',
        title: 'Client Guarantors',
        content:
          'Introduce your company core info quickly to users by fill up company details',
        link: '/crm/clients/view-client-guarantor',
      },
    ];
    this.cards = this.chunkArray(this.originalCards, 3);
  }
  onSearchClient(keyword: string) {
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
