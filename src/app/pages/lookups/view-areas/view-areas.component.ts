import { Component } from '@angular/core';
import { Areas } from '../../../shared/interfaces/areas.interface';

@Component({
  selector: 'app-view-areas',
  standalone: false,
  templateUrl: './view-areas.component.html',
  styleUrl: './view-areas.component.scss',
})
export class ViewAreasComponent {
  tableDataInside: Areas[] = [];
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [
      { field: 'id', header: 'ID' },
      { field: 'areaName', header: 'Area Name' },
      { field: 'arabicName', header: 'Arabic Name' },
      { field: 'governorateId', header: 'Governorate ID' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        id: 501,
        areaName: 344535,
        arabicName: 'Name',
        governorateId: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        areaName: 344535,
        arabicName: 'Name',
        governorateId: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        areaName: 344535,
        arabicName: 'Name',
        governorateId: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        areaName: 344535,
        arabicName: 'Name',
        governorateId: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        areaName: 344535,
        arabicName: 'Name',
        governorateId: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        areaName: 344535,
        arabicName: 'Name',
        governorateId: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        areaName: 344535,
        arabicName: 'Name',
        governorateId: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        areaName: 344535,
        arabicName: 'Name',
        governorateId: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        areaName: 344535,
        arabicName: 'Name',
        governorateId: 'Name in Arabic',
        active: true,
      },
    ];
  }
}
