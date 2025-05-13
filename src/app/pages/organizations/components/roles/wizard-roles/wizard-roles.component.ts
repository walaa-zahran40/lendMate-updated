import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wizard-roles',
  standalone: false,
  templateUrl: './wizard-roles.component.html',
  styleUrl: './wizard-roles.component.scss',
})
export class WizardRolesComponent {
  cards: any[] = [];
  originalCards: any[] = [];
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    const roleId = this.route.snapshot.paramMap.get('roleId');
    this.originalCards = [
      {
        imgUrl: '/assets/images/shared/card/branch.svg',
        imgAlt: 'role Claims',
        title: 'Role Claims',
        content:
          'Introduce your role core info quickly to users by fill up role details',
        link: `/organizations/view-role-claims/${roleId}`,
      },
    ];
    this.cards = this.chunkArray(this.originalCards, 1);
  }
  onSearchRole(keyword: string) {
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
