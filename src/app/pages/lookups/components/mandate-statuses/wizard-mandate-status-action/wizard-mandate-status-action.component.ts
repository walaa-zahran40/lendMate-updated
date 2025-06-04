import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wizard-mandate-status-action',
  standalone: false,
  templateUrl: './wizard-mandate-status-action.component.html',
  styleUrl: './wizard-mandate-status-action.component.scss',
})
export class WizardMandateStatusActionComponent {
  cards: any[] = [];
  originalCards: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const mandateStatusActionId = this.route.snapshot.paramMap.get('mandateStatusActionId');
    this.originalCards = [
      {
        imgUrl: '/assets/images/shared/card/add-status.svg',
        imgAlt: 'add Authorization Group',
        title: 'Add Authorization Group',
        content:
          'Introduce your company core info quickly to users by fill up company details',
        link: `/lookups/view-action-authorizationGroups/${mandateStatusActionId}`,
      },
       {
        imgUrl: '/assets/images/shared/card/add-status.svg',
        imgAlt: 'add Notification Group',
        title: 'Add Notification Group',
        content:
          'Introduce your company core info quickly to users by fill up company details',
        link: `/lookups/view-action-notificationGroups/${mandateStatusActionId}`,
      },
    ];
    this.cards = this.chunkArray(this.originalCards, 3);
  }
  onSearchMandateStatusAction(keyword: string) {
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
