import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wizard-purchasing-orders',
  standalone: false,
  templateUrl: './wizard-purchasing-orders.component.html',
  styleUrl: './wizard-purchasing-orders.component.scss',
})
export class WizardPurchasingOrdersComponent {
  cards: any[] = [];
  originalCards: any[] = [];
  assetId = this.route.snapshot.params['id'];
  evId = this.route.snapshot.params['evId'];

  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.buildCards();
  }
  private buildCards() {
    this.originalCards = [
      {
        imgUrl: '/assets/images/shared/card/upload.svg',
        imgAlt: 'upload',
        title: 'Purchasing Orders Files',
        content: 'Purchasing Orders Files',
        link: `purchasing/purchasing-orders/activities/view-purchasing-orders-files/${this.assetId}`,
      },
      // {
      //   imgUrl: '/assets/images/shared/card/add.svg',
      //   imgAlt: 'add',
      //   title: 'Workflow & Status',
      //   content: 'Workflow & Status',
      //   link: `purchasing/assets/activities/view-workflow-status/${this.assetId}`,
      // },
    ];

    this.cards = this.chunkArray(this.originalCards, 3);
  }
  onSearchPurchasingOrder(keyword: string) {
    const lower = keyword.toLowerCase();
    const filtered = this.originalCards.filter((card) =>
      Object.values(card).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );

    this.cards = this.chunkArray(filtered, 3);
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
