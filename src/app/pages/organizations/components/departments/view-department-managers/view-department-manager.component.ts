import { Component } from '@angular/core';
import { DepartmentManager } from '../../../../../shared/interfaces/department-manager.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-department-manager',
  standalone: false,
  templateUrl: './view-department-manager.component.html',
  styleUrl: './view-department-manager.component.scss',
})
export class ViewDepartmentManagerComponent {
  tableDataInside: DepartmentManager[] = [];
  colsInside: any[] = [];
  deptId = +this.route.snapshot.paramMap.get('deptId')!;
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    this.colsInside = [
      { field: 'department', header: 'Department' },
      { field: 'officer', header: 'Officer' },
      { field: 'startDate', header: 'Start Date' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
    ];
    this.tableDataInside = [
      {
        department: 501,
        officer: 'Mohamed',
        startDate: new Date('2025-12-01'),
        nameEN: 'dddd',
        nameAR: 'aaaa',
      },
      {
        department: 501,
        officer: 'Mohamed',
        startDate: new Date('2025-12-01'),
        nameEN: 'dddd',
        nameAR: 'aaaa',
      },
      {
        department: 501,
        officer: 'Mohamed',
        startDate: new Date('2025-12-01'),
        nameEN: 'dddd',
        nameAR: 'aaaa',
      },
      {
        department: 501,
        officer: 'Mohamed',
        startDate: new Date('2025-12-01'),
        nameEN: 'dddd',
        nameAR: 'aaaa',
      },
      {
        department: 501,
        officer: 'Mohamed',
        startDate: new Date('2025-12-01'),
        nameEN: 'dddd',
        nameAR: 'aaaa',
      },
      {
        department: 501,
        officer: 'Mohamed',
        startDate: new Date('2025-12-01'),
        nameEN: 'dddd',
        nameAR: 'aaaa',
      },
      {
        department: 501,
        officer: 'Mohamed',
        startDate: new Date('2025-12-01'),
        nameEN: 'dddd',
        nameAR: 'aaaa',
      },
      {
        department: 501,
        officer: 'Mohamed',
        startDate: new Date('2025-12-01'),
        nameEN: 'dddd',
        nameAR: 'aaaa',
      },
      {
        department: 501,
        officer: 'Mohamed',
        startDate: new Date('2025-12-01'),
        nameEN: 'dddd',
        nameAR: 'aaaa',
      },
    ];
  }
  onAddDepartmentManager() {
    this.router.navigate([
      `organizations/add-department-manager/${this.deptId}`,
    ]);
  }
}
