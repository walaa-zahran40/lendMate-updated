import { Component } from '@angular/core';
import { Governorates } from '../../../../shared/interfaces/governorates.interface';

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
      { field: 'code', header: 'Code' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'aramix', header: 'Aramix' },
      { field: 'active', header: 'Active' },
      { field: 'countryName', header: 'Country Name' },
    ];
    this.tableDataInside = [
      {
        code: 501,
        nameEN: '344535',
        nameAR: 'Name',
        aramix: 'Name in Arabic',
        active: true,
        countryName: 'egypt',
      },
      {
        code: 501,
        nameEN: '344535',
        nameAR: 'Name',
        aramix: 'Name in Arabic',
        active: true,
        countryName: 'egypt',
      },
      {
        code: 501,
        nameEN: '344535',
        nameAR: 'Name',
        aramix: 'Name in Arabic',
        active: true,
        countryName: 'egypt',
      },
      {
        code: 501,
        nameEN: '344535',
        nameAR: 'Name',
        aramix: 'Name in Arabic',
        active: true,
        countryName: 'egypt',
      },
      {
        code: 501,
        nameEN: '344535',
        nameAR: 'Name',
        aramix: 'Name in Arabic',
        active: true,
        countryName: 'egypt',
      },
      {
        code: 501,
        nameEN: '344535',
        nameAR: 'Name',
        aramix: 'Name in Arabic',
        active: true,
        countryName: 'egypt',
      },
      {
        code: 501,
        nameEN: '344535',
        nameAR: 'Name',
        aramix: 'Name in Arabic',
        active: true,
        countryName: 'egypt',
      },
      {
        code: 501,
        nameEN: '344535',
        nameAR: 'Name',
        aramix: 'Name in Arabic',
        active: true,
        countryName: 'egypt',
      },
      {
        code: 501,
        nameEN: '344535',
        nameAR: 'Name',
        aramix: 'Name in Arabic',
        active: true,
        countryName: 'egypt',
      },
    ];
  }
}
