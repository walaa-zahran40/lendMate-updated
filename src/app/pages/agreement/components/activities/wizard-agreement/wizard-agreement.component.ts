import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wizard-agreement',
  standalone: false,
  templateUrl: './wizard-agreement.component.html',
  styleUrl: './wizard-agreement.component.scss',
})
export class WizardAgreementComponent {
  cards: any[] = [];
  originalCards: any[] = [];
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    const agreementId = this.route.snapshot.paramMap.get('id');
    this.originalCards = [
      {
        imgUrl: '/assets/images/shared/card/branch.svg',
        imgAlt: 'agreement Files',
        title: 'Agreement Files',
        content: 'Agreement Files Description',
        link: `/agreement/activities/wizard-agreement/view-agreement-files/${agreementId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/branch.svg',
        imgAlt: 'agreement Contact Persons',
        title: 'Agreement Contact Persons',
        content: 'Agreement Contact Persons Description',
        link: `/agreement/activities/wizard-agreement/view-agreement-contact-persons/${agreementId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/branch.svg',
        imgAlt: 'agreement Officers',
        title: 'Agreement Officers',
        content: 'Agreement Officers Description',
        link: `/agreement/activities/wizard-agreement/view-agreement-officers/${agreementId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/branch.svg',
        imgAlt: 'agreement Registrations',
        title: 'Agreement Registrations',
        content: 'Agreement Registrations Description',
        link: `/agreement/activities/wizard-agreement/view-agreement-registrations/${agreementId}`,
      },
    ];

    this.cards = this.chunkArray(this.originalCards, 3);
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
  navigateTo(link: string) {
    this.router.navigate([link]);
  }
}
