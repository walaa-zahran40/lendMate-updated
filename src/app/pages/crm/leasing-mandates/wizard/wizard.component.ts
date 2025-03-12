import { Component } from '@angular/core';

@Component({
  selector: 'app-wizard',
  standalone: false,
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.scss',
})
export class WizardComponent {
  cards: any[] = [];

  ngOnInit(): void {
    this.cards = [
      [
        {
          imgUrl: '/assets/images/shared/card/clone.svg',
          imgAlt: 'clone',
          title: 'Clone',
          content:
            'Introduce your company core info quickly to users by fill up company details',
        },
        {
          imgUrl: '/assets/images/shared/card/mandate-manage.svg',
          imgAlt: 'mandate',
          title: 'Manage Mandate Terms',
          content:
            'Introduce your company core info quickly to users by fill up company details',
        },
      ],
    ];
  }
}
