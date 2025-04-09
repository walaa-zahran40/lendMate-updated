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
      { field: 'code', header: 'Code' },
      { field: 'areaName', header: 'Area Name' },
      { field: 'arabicName', header: 'Arabic Name' },
      { field: 'englishName', header: 'English Name' },
      { field: 'governorateName', header: 'Governorate Name' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        code: 122,
        areaName: 'area',
        arabicName: 'aravuc',
        englishName: 'aravuc',
        governorateName: 'aravuc',
        active: true,
      },
      {
        code: 122,
        areaName: 'area',
        arabicName: 'aravuc',
        englishName: 'aravuc',
        governorateName: 'aravuc',
        active: true,
      },
      {
        code: 122,
        areaName: 'area',
        arabicName: 'aravuc',
        englishName: 'aravuc',
        governorateName: 'aravuc',
        active: true,
      },
      {
        code: 122,
        areaName: 'area',
        arabicName: 'aravuc',
        englishName: 'aravuc',
        governorateName: 'aravuc',
        active: true,
      },
      {
        code: 122,
        areaName: 'area',
        arabicName: 'aravuc',
        englishName: 'aravuc',
        governorateName: 'aravuc',
        active: true,
      },
      {
        code: 122,
        areaName: 'area',
        arabicName: 'aravuc',
        englishName: 'aravuc',
        governorateName: 'aravuc',
        active: true,
      },
      {
        code: 122,
        areaName: 'area',
        arabicName: 'aravuc',
        englishName: 'aravuc',
        governorateName: 'aravuc',
        active: true,
      },
      {
        code: 122,
        areaName: 'area',
        arabicName: 'aravuc',
        englishName: 'aravuc',
        governorateName: 'aravuc',
        active: true,
      },
      {
        code: 122,
        areaName: 'area',
        arabicName: 'aravuc',
        englishName: 'aravuc',
        governorateName: 'aravuc',
        active: true,
      },
    ];
  }
}
