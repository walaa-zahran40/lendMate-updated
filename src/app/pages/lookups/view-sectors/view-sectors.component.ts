import { Component } from '@angular/core';
import { Sectors } from '../../../shared/interfaces/sectors.interface';

@Component({
  selector: 'app-view-sectors',
  standalone: false,
  templateUrl: './view-sectors.component.html',
  styleUrl: './view-sectors.component.scss',
})
export class ViewSectorsComponent {
  tableDataInside: Sectors[] = [];
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [
      { field: 'id', header: 'ID' },
      { field: 'code', header: 'Code' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'subSectors', header: 'Sub Sectors' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        id: 501,
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        subSectors: 'sub sector',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        subSectors: 'sub sector',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        subSectors: 'sub sector',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        subSectors: 'sub sector',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        subSectors: 'sub sector',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        subSectors: 'sub sector',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        subSectors: 'sub sector',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        subSectors: 'sub sector',
        active: true,
      },
      {
        id: 501,
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        subSectors: 'sub sector',
        active: true,
      },
    ];
  }
}
