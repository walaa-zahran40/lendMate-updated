import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wizard-department',
  standalone: false,
  templateUrl: './wizard-department.component.html',
  styleUrl: './wizard-department.component.scss',
})
export class WizardDepartmentComponent {
  departmentId = +this.route.snapshot.paramMap.get('departmentId')!;
  cards: any[] = [];
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.cards = [
      [
        {
          imgUrl: '/assets/images/shared/card/department.svg',
          imgAlt: 'department Managers',
          title: 'ORGANIZATION.DEPARTMENT_MANAGERS',
          content: 'ORGANIZATION.DEPARTMENT_MANAGERS_DESC',
          link: `/organizations/view-department-managers/${this.departmentId}`,
        },
      ],
    ];
  }
  navigateTo(link: string) {
    this.router.navigate([link]);
  }
}
