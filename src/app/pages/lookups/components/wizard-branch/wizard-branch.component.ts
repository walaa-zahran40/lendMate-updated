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
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    const branchId = this.route.snapshot.paramMap.get('branchId');
    this.cards = [
      [
        {
          imgUrl: '/assets/images/shared/card/branch.svg',
          imgAlt: 'branch Managers',
          title: 'Branch Managers',
          content:
            'Introduce your company core info quickly to users by fill up company details',
          link: `/lookups/view-branch-managers/${branchId}`,
        },
        {
          imgUrl: '/assets/images/shared/card/branch.svg',
          imgAlt: 'branch Officers',
          title: 'Branch Officers',
          content:
            'Introduce your company core info quickly to users by fill up company details',
          link: `/lookups/view-branch-officers/${branchId}`,
        },
        {
          imgUrl: '/assets/images/shared/card/address.svg',
          imgAlt: 'branch Address',
          title: 'Branch Address',
          content:
            'Introduce your company core info quickly to users by fill up company details',
          link: `/lookups/view-branch-addresses/${branchId}`,
        },
      ],
    ];
  }
  navigateTo(link: string) {
    this.router.navigate([link]);
  }
}
