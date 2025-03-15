import { Component } from '@angular/core';
import { Governorates } from '../../../shared/interfaces/governorates.interface';

@Component({
  selector: 'app-view-governorates',
  standalone: false,
  templateUrl: './view-governorates.component.html',
  styleUrl: './view-governorates.component.scss',
})
export class ViewGovernoratesComponent {
  tableDataInside: Governorates[] = [];
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [
      { field: 'id', header: 'ID' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'aramix', header: 'Aramix' },
      { field: 'active', header: 'Active' },
      { field: 'countryId', header: 'Country ID' },
    ];
    this.tableDataInside = [
      {
        id: 501,
        nameEN: '344535',
        nameAR: 'Name',
        aramix: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        nameEN: '344535',
        nameAR: 'Name',
        aramix: 'Name in Arabic',
        active: true,
        countryId: 1,
      },
      {
        id: 501,
        nameEN: '344535',
        nameAR: 'Name',
        aramix: 'Name in Arabic',
        active: true,
        countryId: 1,
      },
      {
        id: 501,
        nameEN: '344535',
        nameAR: 'Name',
        aramix: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        nameEN: '344535',
        nameAR: 'Name',
        aramix: 'Name in Arabic',
        active: true,
        countryId: 1,
      },
      {
        id: 501,
        nameEN: '344535',
        nameAR: 'Name',
        aramix: 'Name in Arabic',
        active: true,
        countryId: 1,
      },
      {
        id: 501,
        nameEN: '344535',
        nameAR: 'Name',
        aramix: 'Name in Arabic',
        active: true,
        countryId: 1,
      },
      {
        id: 501,
        nameEN: '344535',
        nameAR: 'Name',
        aramix: 'Name in Arabic',
        active: true,
        countryId: 1,
      },
      {
        id: 501,
        nameEN: '344535',
        nameAR: 'Name',
        aramix: 'Name in Arabic',
        active: true,
        countryId: 1,
      },
    ];
  }
}
