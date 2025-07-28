import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wizard-client-status-action',
  standalone: false,
  templateUrl: './wizard-client-status-action.component.html',
  styleUrl: './wizard-client-status-action.component.scss',
})
export class WizardClientStatusActionComponent {
  cards: any[] = [];
  originalCards: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const clientStatusActionId = this.route.snapshot.paramMap.get(
      'clientStatusActionId'
    );
    this.originalCards = [
      {
        imgUrl: '/assets/images/shared/card/add-status.svg',
        imgAlt: 'add Authorization Group',
        title: 'LOOKUP.ADD_AUTHORIZATION_GROUP',
        content: 'LOOKUP.ADD_AUTHORIZATION_GROUP_DESC',
        link: `/lookups/view-action-authorizationGroups/${clientStatusActionId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/add-status.svg',
        imgAlt: 'add Notification Group',
        title: 'LOOKUP.ADD_NOTIFICATION_GROUP',
        content: 'LOOKUP.ADD_NOTIFICATION_GROUP_DESC',
        link: `/lookups/view-action-notificationGroups/${clientStatusActionId}`,
      },
    ];

    this.cards = this.chunkArray(this.originalCards, 3);
  }
  onSearchClientStatusAction(keyword: string) {
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
