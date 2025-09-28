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
  private businessAgreementId!: number;

  routeId = this.route.snapshot.params['leasingAgreementsId'];
  clientId = this.route.snapshot.params['clientId'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private facade: LeasingAgreementsFacade // ← inject your facade
  ) {}

  ngOnInit(): void {
    console.log('this.route', this.route.snapshot);
    // 1️⃣ pull the raw DB PK out of the URL
    const leasingAgreementsId = +this.route.snapshot.paramMap.get(
      'leasingAgreementsId'
    )!;

    // 2️⃣ tell your facade to load the full agreement (calling LeasingAgreementId under the hood)
    this.facade.loadById(leasingAgreementsId);

    // 3️⃣ wait for it, grab the business agreementId, then build cards
    this.facade.selected$
      .pipe(
        filter((m) => !!m && m.id === leasingAgreementsId), // make sure it’s the one we asked for
        take(1),
        tap((m) => (this.businessAgreementId = m?.agreementId!)) // ← this is the one you need
      )
      .subscribe(() => this.buildCards());
  }

  private buildCards() {
    const id = this.businessAgreementId;
    this.originalCards = [
      // {
      //   imgUrl: '/assets/images/shared/card/clone.svg',
      //   imgAlt: 'clone',
      //   title: 'AGREEMENT.CLONE',
      //   content: 'AGREEMENT.CLONE_DESC',
      //   link: !this.clientId
      //     ? `/crm/leasing-agreements/add-child-agreement/${id}/${this.routeId}`
      //     : `/crm/leasing-agreements/add-child-agreement/${id}/${this.routeId}/${this.clientId}`,
      // },
      // {
      //   imgUrl: '/assets/images/shared/card/agreement-manage.svg',
      //   imgAlt: 'agreement',
      //   title: 'AGREEMENT.ADDITIONAL_TERMS',
      //   content: 'AGREEMENT.ADDITIONAL_TERMS_DESC',
      //   link: !this.clientId
      //     ? `/crm/leasing-agreements/view-agreement-additional-terms/${id}/${this.routeId}`
      //     : `/crm/leasing-agreements/view-agreement-additional-terms/${id}/${this.routeId}/${this.clientId}`,
      // },
      // {
      //   imgUrl: '/assets/images/shared/card/agreement-manage.svg',
      //   imgAlt: 'agreement',
      //   title: 'AGREEMENT.AGREEMENT_OFFICERS',
      //   content: 'AGREEMENT.AGREEMENT_OFFICERS_DESC',
      //   link: !this.clientId
      //     ? `/crm/leasing-agreements/view-agreement-officers/${id}/${this.routeId}`
      //     : `/crm/leasing-agreements/view-agreement-officers/${id}/${this.routeId}/${this.clientId}`,
      // },
      {
        imgUrl: '/assets/images/shared/card/mandate-manage.svg',
        imgAlt: 'agreement',
        title: 'AGREEMENT.AGREEMENT_CONTACT_PERSONS',
        content: 'AGREEMENT.AGREEMENT_CONTACT_PERSONS_DESC',
        link: !this.clientId
          ? `/agreement/view-agreement-contact-persons/${id}`
          : `/agreement/view-agreement-contact-persons/${id}/${this.clientId}`,
      },
      // {
      //   imgUrl: '/assets/images/shared/card/agreement-manage.svg',
      //   imgAlt: 'agreement',
      //   title: 'AGREEMENT.WORKFLOW_HISTORY',
      //   content: 'AGREEMENT.WORKFLOW_HISTORY_DESC',
      //   link: !this.clientId
      //     ? `/crm/leasing-agreements/view-agreement-workflow-history/${id}/${this.routeId}`
      //     : `/crm/leasing-agreements/view-agreement-workflow-history/${id}/${this.routeId}/${this.clientId}`,
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
