import { Component } from '@angular/core';
import { BranchOfficers } from '../../../../shared/interfaces/branch-officers.interface';
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
    this.colsInside = [
      {
        field: 'details',
        header: 'Details',
      },
      {
        field: 'nameEN',
        header: 'Name EN',
      },
      {
        field: 'nameAR',
        header: 'Name AR',
      },
    ];
    this.tableDataInside = [
      {
        details: 'Document Name',
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        details: 'Document Name',
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        details: 'Document Name',
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        details: 'Document Name',
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        details: 'Document Name',
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        details: 'Document Name',
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        details: 'Document Name',
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        details: 'Document Name',
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        details: 'Document Name',
        nameEN: 'name en',
        nameAR: 'name ar',
      },
    ];
  }
  onAdd() {
    this.router.navigate(['/lookups/add-branch-officers']);
  }
}
