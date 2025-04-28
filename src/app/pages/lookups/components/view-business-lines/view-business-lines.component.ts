import { Component } from '@angular/core';
import { BusinessLines } from '../../../../shared/interfaces/business-lines.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-business-lines',
  standalone: false,
  templateUrl: './view-business-lines.component.html',
  styleUrl: './view-business-lines.component.scss',
})
export class ViewBusinessLinesComponent {
  tableDataInside: BusinessLines[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}
  ngOnInit() {
    this.colsInside = [{ field: 'details', header: 'Details' }];
    this.tableDataInside = [
      {
        code: 4656565,
        nameEN: 'walaa zahran',
        nameAR: 'walaa zahran',
        licenseDate: new Date('12-10-2025'),
        active: true,
      },
      {
        code: 4656565,
        nameEN: 'walaa zahran',
        nameAR: 'walaa zahran',
        licenseDate: new Date('12-10-2025'),
        active: true,
      },
      {
        code: 4656565,
        nameEN: 'walaa zahran',
        nameAR: 'walaa zahran',
        licenseDate: new Date('12-10-2025'),
        active: true,
      },
      {
        code: 4656565,
        nameEN: 'walaa zahran',
        nameAR: 'walaa zahran',
        licenseDate: new Date('12-10-2025'),
        active: true,
      },
      {
        code: 4656565,
        nameEN: 'walaa zahran',
        nameAR: 'walaa zahran',
        licenseDate: new Date('12-10-2025'),
        active: true,
      },
      {
        code: 4656565,
        nameEN: 'walaa zahran',
        nameAR: 'walaa zahran',
        licenseDate: new Date('12-10-2025'),
        active: true,
      },
      {
        code: 4656565,
        nameEN: 'walaa zahran',
        nameAR: 'walaa zahran',
        licenseDate: new Date('12-10-2025'),
        active: true,
      },
      {
        code: 4656565,
        nameEN: 'walaa zahran',
        nameAR: 'walaa zahran',
        licenseDate: new Date('12-10-2025'),
        active: true,
      },
      {
        code: 4656565,
        nameEN: 'walaa zahran',
        nameAR: 'walaa zahran',
        licenseDate: new Date('12-10-2025'),
        active: true,
      },
    ];
  }
  onAddBusiness() {
    this.router.navigate(['/lookups/add-business-lines']);
  }
}
