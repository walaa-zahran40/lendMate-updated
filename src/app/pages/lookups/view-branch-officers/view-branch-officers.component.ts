import { Component } from '@angular/core';
import { BranchOfficers } from '../../../shared/interfaces/branch-officers.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-branch-officers',
  standalone: false,
  templateUrl: './view-branch-officers.component.html',
  styleUrl: './view-branch-officers.component.scss',
})
export class ViewBranchOfficersComponent {
  tableDataInside: BranchOfficers[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}

  ngOnInit() {
    this.colsInside = [{ field: 'details', header: 'Details' }];
    this.tableDataInside = [
      {
        details: 'Document Name',
      },
      {
        details: 'Document Name',
      },
      {
        details: 'Document Name',
      },
      {
        details: 'Document Name',
      },
      {
        details: 'Document Name',
      },
      {
        details: 'Document Name',
      },
      {
        details: 'Document Name',
      },
      {
        details: 'Document Name',
      },
      {
        details: 'Document Name',
      },
    ];
  }
  onAdd() {
    this.router.navigate(['/lookups/add-branch-officers']);
  }
}
