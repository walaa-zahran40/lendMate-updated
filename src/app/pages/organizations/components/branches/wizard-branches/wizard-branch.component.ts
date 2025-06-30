import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wizard-branch',
  standalone: false,
  templateUrl: './wizard-branch.component.html',
  styleUrl: './wizard-branch.component.scss',
})
export class WizardBranchComponent {
  cards: any[] = [];
  originalCards: any[] = [];
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    const branchId = this.route.snapshot.paramMap.get('branchId');
    this.originalCards = [
      {
        imgUrl: '/assets/images/shared/card/branch.svg',
        imgAlt: 'branch Managers',
        title: 'Branch Managers',
        content: '',
        link: `/organizations/view-branch-managers/${branchId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/branch.svg',
        imgAlt: 'branch Officers',
        title: 'Branch Officers',
        content: '',
        link: `/organizations/view-branch-officers/${branchId}`,
      },
      {
        imgUrl: '/assets/images/shared/card/address.svg',
        imgAlt: 'branch Address',
        title: 'Branch Address',
        content: '',
        link: `/organizations/view-branch-addresses/${branchId}`,
      },
    ];
    this.cards = this.chunkArray(this.originalCards, 3);
  }
  onSearchBranch(keyword: string) {
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
