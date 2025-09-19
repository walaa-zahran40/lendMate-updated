import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MandatesFacade } from '../../../store/leasing-mandates/leasing-mandates.facade';
import { filter, take, tap } from 'rxjs';

@Component({
  selector: 'app-wizard',
  standalone: false,
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.scss',
})
export class WizardComponent implements OnInit {
  cards: any[][] = [];
  private businessMandateId!: number;
  originalCards: any[] = [];

  routeId = this.route.snapshot.params['leasingMandatesId'];
  clientId = this.route.snapshot.params['clientId'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private facade: MandatesFacade // ← inject your facade
  ) {}

  ngOnInit(): void {
    console.log('this.route', this.route.snapshot);
    // 1️⃣ pull the raw DB PK out of the URL
    const leasingMandatesId =
      +this.route.snapshot.paramMap.get('leasingMandatesId')!;

    // 2️⃣ tell your facade to load the full mandate (calling LeasingMandateId under the hood)
    this.facade.loadById(leasingMandatesId);

    // 3️⃣ wait for it, grab the business mandateId, then build cards
    this.facade.selectedMandate$
      .pipe(
        filter((m) => !!m && m.id === leasingMandatesId), // make sure it’s the one we asked for
        take(1),
        tap((m) => (this.businessMandateId = m?.mandateId!)) // ← this is the one you need
      )
      .subscribe(() => this.buildCards());
  }

  private buildCards() {
    const id = this.businessMandateId;
    this.originalCards = [
      {
        imgUrl: '/assets/images/shared/card/clone.svg',
        imgAlt: 'clone',
        title: 'MANDATE.CLONE',
        content: 'MANDATE.CLONE_DESC',
        link: !this.clientId
          ? `/crm/leasing-mandates/add-child-mandate/${id}/${this.routeId}`
          : `/crm/leasing-mandates/add-child-mandate/${id}/${this.routeId}/${this.clientId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/mandate-manage.svg',
        imgAlt: 'mandate',
        title: 'MANDATE.ADDITIONAL_TERMS',
        content: 'MANDATE.ADDITIONAL_TERMS_DESC',
        link: `/crm/leasing-mandates/view-mandate-additional-terms/${id}/${this.routeId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/mandate-manage.svg',
        imgAlt: 'mandate',
        title: 'MANDATE OFFICERS',
        content: 'MANDATE.OFFICERS_DESC',
        link: `/crm/leasing-mandates/view-mandate-officers/${id}/${this.routeId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/mandate-manage.svg',
        imgAlt: 'mandate',
        title: 'MANDATE CONTACT_PERSONS',
        content: 'MANDATE.CONTACT_PERSONS_DESC',
        link: `/crm/leasing-mandates/view-mandate-contact-persons/${id}/${this.routeId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/mandate-manage.svg',
        imgAlt: 'mandate',
        title: 'MANDATE.WORKFLOW_HISTORY',
        content: 'MANDATE.WORKFLOW_HISTORY_DESC',
        link: `/crm/leasing-mandates/view-mandate-work-flow-history/${id}/${this.routeId}`,
      },
    ];

    this.cards = this.chunkArray(this.originalCards, 3);
    console.log('🧩 Built cards:', this.originalCards);
    console.log('🔀 Chunked cards:', this.cards);
  }

  navigateTo(link: string) {
    this.router.navigate([link]);
  }
  onSearchMandate(keyword: string) {
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
