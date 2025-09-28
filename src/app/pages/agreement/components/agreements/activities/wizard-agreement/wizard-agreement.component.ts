import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { filter, take, tap } from 'rxjs';
import { LeasingAgreementsFacade } from '../../../../store/agreements/agreements.facade';

@Component({
  selector: 'app-wizard-agreement',
  standalone: false,
  templateUrl: './wizard-agreement.component.html',
  styleUrl: './wizard-agreement.component.scss',
})
export class WizardAgreementComponent implements OnInit {
  cards: any[][] = [];
  originalCards: any[] = [];

  routeId = this.route.snapshot.params['agreementId'];
  clientId = this.route.snapshot.params['clientId'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private facade: LeasingAgreementsFacade // ← inject your facade
  ) {}

  ngOnInit(): void {
    console.log('this.route', this.route.snapshot);
    // 1️⃣ pull the raw DB PK out of the URL
    const id = +this.route.snapshot.paramMap.get('id')!;

    // 2️⃣ tell your facade to load the full agreement (calling LeasingAgreementId under the hood)
    this.facade.loadById(id);

    // 3️⃣ wait for it, grab the business agreementId, then build cards
    this.facade.selected$
      .pipe(
        filter((m) => !!m && m.id === id), // make sure it’s the one we asked for
        take(1)
      )
      .subscribe(() => this.buildCards());
  }

  private buildCards() {
    const id = this.route.snapshot.paramMap.get('id');
    this.originalCards = [
      // {
      //   imgUrl: '/assets/images/shared/card/clone.svg',
      //   imgAlt: 'clone',
      //   title: 'MANDATE.CLONE',
      //   content: 'MANDATE.CLONE_DESC',
      //   link: !this.clientId
      //     ? `/crm/leasing-mandates/add-child-mandate/${id}/${this.routeId}`
      //     : `/crm/leasing-mandates/add-child-mandate/${id}/${this.routeId}/${this.clientId}`,
      // },
      // {
      //   imgUrl: '/assets/images/shared/card/mandate-manage.svg',
      //   imgAlt: 'mandate',
      //   title: 'MANDATE.ADDITIONAL_TERMS',
      //   content: 'MANDATE.ADDITIONAL_TERMS_DESC',
      //   link: !this.clientId
      //     ? `/crm/leasing-mandates/view-mandate-additional-terms/${id}/${this.routeId}`
      //     : `/crm/leasing-mandates/view-mandate-additional-terms/${id}/${this.routeId}/${this.clientId}`,
      // },
      // {
      //   imgUrl: '/assets/images/shared/card/mandate-manage.svg',
      //   imgAlt: 'mandate',
      //   title: 'MANDATE.MANDATE_OFFICERS',
      //   content: 'MANDATE.MANDATE_OFFICERS_DESC',
      //   link: !this.clientId
      //     ? `/crm/leasing-mandates/view-mandate-officers/${id}/${this.routeId}`
      //     : `/crm/leasing-mandates/view-mandate-officers/${id}/${this.routeId}/${this.clientId}`,
      // },
      {
        imgUrl: '/assets/images/shared/card/mandate-manage.svg',
        imgAlt: 'mandate',
        title: 'AGREEMENT.AGREEMENT_CONTACT_PERSONS',
        content: 'AGREEMENT.AGREEMENT_CONTACT_PERSONS_DESC',
        link: !this.clientId
          ? `/agreement/view-agreement-contact-persons/${id}`
          : `/agreement/view-agreement-contact-persons/${id}/${this.clientId}`,
      },
      // {
      //   imgUrl: '/assets/images/shared/card/mandate-manage.svg',
      //   imgAlt: 'mandate',
      //   title: 'MANDATE.WORKFLOW_HISTORY',
      //   content: 'MANDATE.WORKFLOW_HISTORY_DESC',
      //   link: !this.clientId
      //     ? `/crm/leasing-mandates/view-mandate-workflow-history/${id}/${this.routeId}`
      //     : `/crm/leasing-mandates/view-mandate-workflow-history/${id}/${this.routeId}/${this.clientId}`,
      // },
    ];

    this.cards = this.chunkArray(this.originalCards, 3);
    console.log('🧩 Built cards:', this.originalCards);
    console.log('🔀 Chunked cards:', this.cards);
  }

  navigateTo(link: string) {
    this.router.navigate([link]);
  }
  onSearchAgreement(keyword: string) {
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
}
