import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wizard-department',
  standalone: false,
  templateUrl: './wizard-department.component.html',
  styleUrl: './wizard-department.component.scss',
})
export class WizardDepartmentComponent {
  deptId = +this.route.snapshot.paramMap.get('deptId')!;
  cards: any[] = [];
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.cards = [
      [
        {
          imgUrl: '/assets/images/shared/card/department.svg',
          imgAlt: 'department Manager',
          title: 'Department Manager',
          content:
            'Introduce your company core info quickly to users by fill up company details',
          link: `/organizations/view-department-managers/${this.deptId}`,
        },
        {
          imgUrl: '/assets/images/shared/card/team.svg',
          imgAlt: 'teams',
          title: 'Teams',
          content:
            'Introduce your company core info quickly to users by fill up company details',
          link: '/organizations/add-team',
        },
      ],
    ];
  }
  navigateTo(link: string) {
    this.router.navigate([link]);
  }
}
