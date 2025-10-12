import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';

export interface WizardCard {
  imgUrl: string;
  imgAlt: string;
  title: string;
  content: string;
  link: string;
}
export interface WizardData {
  clientId: number;
  cards: WizardCard[];
}

export const clientActivityWizardResolver: ResolveFn<WizardData> = (
  route: ActivatedRouteSnapshot
) => {
  const idParam = route.paramMap.get('clientId');
  const clientId = idParam ? Number(idParam) : NaN;

  // Defensive: require a valid id on this route
  if (!Number.isFinite(clientId)) {
    // You can also return a UrlTree to redirect if you prefer:
    // return inject(Router).createUrlTree(['/crm/clients/view-clients']);
    return { clientId: NaN, cards: [] };
  }

  const cards: WizardCard[] = [
    {
      imgUrl: '/assets/images/shared/card/upload.svg',
      imgAlt: 'upload',
      title: 'CARD.UPLOAD_DOCUMENTS',
      content: 'CARD.UPLOAD_DOCUMENTS',
      link: `/crm/clients/view-upload-documents/${clientId}`,
    },
    {
      imgUrl: '/assets/images/shared/card/add.svg',
      imgAlt: 'add',
      title: 'CARD.ADD_ADDRESS',
      content: 'CARD.ADD_ADDRESS',
      link: `/crm/clients/view-client-addresses/${clientId}`,
    },
    {
      imgUrl: '/assets/images/shared/card/sales.svg',
      imgAlt: 'sales',
      title: 'CARD.SALES_TURNOVER',
      content: 'CARD.SALES_TURNOVER',
      link: `/crm/clients/view-sales-turnovers/${clientId}`,
    },
    {
      imgUrl: '/assets/images/shared/card/phone.svg',
      imgAlt: 'phone',
      title: 'CARD.PHONE_NUMBER',
      content: 'CARD.PHONE_NUMBER',
      link: `/crm/clients/view-phone-numbers/${clientId}`,
    },
    {
      imgUrl: '/assets/images/shared/card/cr.svg',
      imgAlt: 'cr',
      title: 'CARD.CR_AUTHORITY',
      content: 'CARD.CR_AUTHORITY',
      link: `/crm/clients/view-client-cr-authority-offices/${clientId}`,
    },
    {
      imgUrl: '/assets/images/shared/card/tax.svg',
      imgAlt: 'tax',
      title: 'CARD.TAX_AUTHORITY',
      content: 'CARD.TAX_AUTHORITY',
      link: `/crm/clients/view-client-tax-authority-offices/${clientId}`,
    },
    {
      imgUrl: '/assets/images/shared/card/central.svg',
      imgAlt: 'central',
      title: 'CARD.CENTRAL_BANK_INFO',
      content: 'CARD.CENTRAL_BANK_INFO',
      link: `/crm/clients/view-client-central-bank-info/${clientId}`,
    },
    {
      imgUrl: '/assets/images/shared/card/share.svg',
      imgAlt: 'share',
      title: 'CARD.SHARE_HOLDERS',
      content: 'CARD.SHARE_HOLDERS',
      link: `/crm/clients/view-client-share-holders/${clientId}`,
    },
    {
      imgUrl: '/assets/images/shared/card/tml.svg',
      imgAlt: 'tml',
      title: 'CARD.TML_OFFICER',
      content: 'CARD.TML_OFFICER',
      link: `/crm/clients/view-client-tml-officers/${clientId}`,
    },
    {
      imgUrl: '/assets/images/shared/card/contact.svg',
      imgAlt: 'contact',
      title: 'CARD.CONTACT_PERSON',
      content: 'CARD.CONTACT_PERSON',
      link: `/crm/clients/view-contact-persons/${clientId}`,
    },
    {
      imgUrl: '/assets/images/shared/card/mandate.svg',
      imgAlt: 'guarantor',
      title: 'CARD.CLIENT_GUARANTORS',
      content: 'CARD.CLIENT_GUARANTORS',
      link: `/crm/clients/view-client-guarantors/${clientId}`,
    },
    {
      imgUrl: '/assets/images/shared/card/contact.svg',
      imgAlt: 'contact',
      title: 'CARD.CLIENT_IDENTITIES',
      content: 'CARD.CLIENT_IDENTITIES',
      link: `/crm/clients/view-client-identities/${clientId}`,
    },
    {
      imgUrl: '/assets/images/shared/card/share.svg',
      imgAlt: 'share',
      title: 'CARD.CLIENT_OFFICERS',
      content: 'CARD.CLIENT_OFFICERS',
      link: `/crm/clients/view-client-officers/${clientId}`,
    },
    {
      imgUrl: '/assets/images/shared/card/share.svg',
      imgAlt: 'share',
      title: 'CARD.CLIENT_LEGALS',
      content: 'CARD.CLIENT_LEGALS',
      link: `/crm/clients/view-client-legals/${clientId}`,
    },
    {
      imgUrl: '/assets/images/shared/card/share.svg',
      imgAlt: 'share',
      title: 'CARD.MEETINGS',
      content: 'CARD.MEETINGS',
      link: `/communication/view-meetings/${clientId}`,
    },
    {
      imgUrl: '/assets/images/shared/card/share.svg',
      imgAlt: 'share',
      title: 'CARD.CALLS',
      content: 'CARD.CALLS',
      link: `/communication/view-calls/${clientId}`,
    },
    {
      imgUrl: '/assets/images/shared/card/share.svg',
      imgAlt: 'share',
      title: 'CARD.LEASING_MANDATES',
      content: 'CARD.LEASING_MANDATES',
      link: `/crm/leasing-mandates/view-mandates/${clientId}`,
    },
  ];

  return { clientId, cards };
};
