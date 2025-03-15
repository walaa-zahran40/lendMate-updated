import { Component } from '@angular/core';

@Component({
  selector: 'app-wizard-department',
  standalone: false,
  templateUrl: './wizard-department.component.html',
  styleUrl: './wizard-department.component.scss',
})
export class WizardDepartmentComponent {
  cards: any[] = [];

  ngOnInit(): void {
    this.cards = [
      [
        {
          imgUrl: '/assets/images/shared/card/department.svg',
          imgAlt: 'department Manager',
          title: 'Department Manager',
          content:
            'Introduce your company core info quickly to users by fill up company details',
        },
        {
          imgUrl: '/assets/images/shared/card/team.svg',
          imgAlt: 'teams',
          title: 'Teams',
          content:
            'Introduce your company core info quickly to users by fill up company details',
        },
      ],
    ];
  }
}
