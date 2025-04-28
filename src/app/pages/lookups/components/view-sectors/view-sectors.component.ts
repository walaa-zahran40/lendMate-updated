import { Component } from '@angular/core';
import { Sectors } from '../../../../shared/interfaces/sectors.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-sectors',
  standalone: false,
  templateUrl: './view-sectors.component.html',
  styleUrl: './view-sectors.component.scss',
})
export class ViewSectorsComponent {
  tableDataInside: Sectors[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}
  ngOnInit() {
    this.colsInside = [
      { field: 'code', header: 'Code' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'subSectors', header: 'Sub Sectors' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        subSectors: 'sub sector',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        subSectors: 'sub sector',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        subSectors: 'sub sector',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        subSectors: 'sub sector',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        subSectors: 'sub sector',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        subSectors: 'sub sector',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        subSectors: 'sub sector',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        subSectors: 'sub sector',
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        subSectors: 'sub sector',
        active: true,
      },
    ];
  }
  addSectors() {
    this.router.navigate(['/lookups/add-sectors']);
  }
}
