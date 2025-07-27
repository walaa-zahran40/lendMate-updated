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
        content: 'Upload Documents',
        link: `/crm/clients/view-upload-documents/${clientId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/add.svg',
        imgAlt: 'add',
        title: 'Add Address',
        content: 'Add Address',
        link: `crm/clients/view-client-addresses/${clientId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/sales.svg',
        imgAlt: 'sales',
        title: 'Sales Turnover',
        content: 'Sales Turnover',
        link: `/crm/clients/view-sales-turnovers/${clientId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/phone.svg',
        imgAlt: 'phone',
        title: 'Phone Number',
        content: 'Phone Number',
        link: `/crm/clients/view-phone-numbers/${clientId}`,
      },

      {
        imgUrl: '/assets/images/shared/card/cr.svg',
        imgAlt: 'cr',
        title: 'CR Authority Office',
        content: 'CR Authority Office',
        link: `/crm/clients/view-client-cr-authority-offices/${clientId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/tax.svg',
        imgAlt: 'tax',
        title: 'TAX Authority Office',
        content: 'TAX Authority Office',
        link: `/crm/clients/view-client-tax-authority-offices/${clientId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/central.svg',
        imgAlt: 'central',
        title: 'Central Bank Info',
        content: 'Central Bank Info',
        link: `/crm/clients/view-client-central-bank-info/${clientId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/share.svg',
        imgAlt: 'share',
        title: 'Share Holders',
        content: 'Share Holders',
        link: `/crm/clients/view-client-share-holders/${clientId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/tml.svg',
        imgAlt: 'tml',
        title: 'TML Officer',
        content: 'TML Officer',
        link: `/crm/clients/view-client-tml-officers/${clientId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/contact.svg',
        imgAlt: 'contact',
        title: 'Contact Person',
        content: 'Contact Person',
        link: `/crm/clients/view-contact-persons/${clientId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/mandate.svg',
        imgAlt: 'guarantor',
        title: 'Client Guarantors',
        content: 'Client Guarantors',
        link: `/crm/clients/view-client-guarantors/${clientId}`,
      },

      {
        imgUrl: '/assets/images/shared/card/contact.svg',
        imgAlt: 'contact',
        title: 'Client Identities',
        content: 'Client Identities',
        link: `/crm/clients/view-client-identities/${clientId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/share.svg',
        imgAlt: 'share',
        title: 'Client Officers',
        content: 'Client Officers',
        link: `/crm/clients/view-client-officers/${clientId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/share.svg',
        imgAlt: 'share',
        title: 'Client Legals',
        content: 'Client Legals',
        link: `/crm/clients/view-client-legals/${clientId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/share.svg',
        imgAlt: 'share',
        title: 'Meetings',
        content: 'Meetings',
        link: `/communication/view-meetings/${clientId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/share.svg',
        imgAlt: 'share',
        title: 'Calls',
        content: 'Calls',
        link: `/communication/view-calls/${clientId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/share.svg',
        imgAlt: 'share',
        title: 'Leasing Mandates',
        content: 'Leasing Mandates',
        link: `/crm/leasing-mandates/view-mandates/${clientId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/upload.svg',
        imgAlt: 'upload',
        title: 'Contracts',
        content: 'Contracts',
        link: `/crm/clients/view-contracts/${clientId}`,
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

    this.cards = this.chunkArray(filtered, 3);
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
