import { Component } from '@angular/core';
import { BranchAddresses } from '../../../../shared/interfaces/branch-addresses.interface';

@Component({
  selector: 'app-view-branch-addresses',
  standalone: false,
  templateUrl: './view-branch-addresses.component.html',
  styleUrl: './view-branch-addresses.component.scss',
})
export class ViewBranchAddressesComponent {
  tableDataInside: BranchAddresses[] = [];
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [
      { field: 'area', header: 'Area' },
      { field: 'detailsEN', header: 'Details EN' },
      { field: 'detailsAR', header: 'Details AR' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
    ];
    this.tableDataInside = [
      {
        area: 'Area',
        detailsEN: 'Details EN',
        detailsAR: 'Details AR',
        nameEN: 'dddd',
        nameAR: 'ssss',
      },
      {
        area: 'Area',
        detailsEN: 'Details EN',
        detailsAR: 'Details AR',
        nameEN: 'dddd',
        nameAR: 'ssss',
      },
      {
        area: 'Area',
        detailsEN: 'Details EN',
        detailsAR: 'Details AR',
        nameEN: 'dddd',
        nameAR: 'ssss',
      },
      {
        area: 'Area',
        detailsEN: 'Details EN',
        detailsAR: 'Details AR',
        nameEN: 'dddd',
        nameAR: 'ssss',
      },
      {
        area: 'Area',
        detailsEN: 'Details EN',
        detailsAR: 'Details AR',
        nameEN: 'dddd',
        nameAR: 'ssss',
      },
      {
        area: 'Area',
        detailsEN: 'Details EN',
        detailsAR: 'Details AR',
        nameEN: 'dddd',
        nameAR: 'ssss',
      },
      {
        area: 'Area',
        detailsEN: 'Details EN',
        detailsAR: 'Details AR',
        nameEN: 'dddd',
        nameAR: 'ssss',
      },
      {
        area: 'Area',
        detailsEN: 'Details EN',
        detailsAR: 'Details AR',
        nameEN: 'dddd',
        nameAR: 'ssss',
      },
      {
        area: 'Area',
        detailsEN: 'Details EN',
        detailsAR: 'Details AR',
        nameEN: 'dddd',
        nameAR: 'ssss',
      },
    ];
  }
}
