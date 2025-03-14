import { Component } from '@angular/core';

@Component({
  selector: 'app-wizard-branch',
  standalone: false,
  templateUrl: './wizard-branch.component.html',
  styleUrl: './wizard-branch.component.scss',
})
export class WizardBranchComponent {
  cards: any[] = [];

  ngOnInit(): void {
    this.cards = [
      [
        {
          imgUrl: '/assets/images/shared/card/branch.svg',
          imgAlt: 'branch Managers',
          title: 'Branch Managers',
          content:
            'Introduce your company core info quickly to users by fill up company details',
        },
        {
          imgUrl: '/assets/images/shared/card/branch.svg',
          imgAlt: 'branch Officers',
          title: 'Branch Officers',
          content:
            'Introduce your company core info quickly to users by fill up company details',
        },
        {
          imgUrl: '/assets/images/shared/card/address.svg',
          imgAlt: 'branch Address',
          title: 'Branch Address',
          content:
            'Introduce your company core info quickly to users by fill up company details',
        },
      ],
    ];
  }
}
