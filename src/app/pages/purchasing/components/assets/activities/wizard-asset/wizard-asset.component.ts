import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wizard-asset',
  standalone: false,
  templateUrl: './wizard-asset.component.html',
  styleUrl: './wizard-asset.component.scss',
})
export class WizardAssetComponent {
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
        title: 'Evaluation Information',
        content: 'Evaluation Information',
        link: `purchasing/assets/activities/view-evaluation-information/${this.assetId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/add.svg',
        imgAlt: 'add',
        title: 'Workflow & Status',
        content: 'Workflow & Status',
        link: `purchasing/assets/activities/view-workflow-status/${this.assetId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/branch.svg',
        imgAlt: 'branch',
        title: 'License Information',
        content: 'License Information',
        link: `purchasing/assets/activities/view-license-information/${this.assetId}`,
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
