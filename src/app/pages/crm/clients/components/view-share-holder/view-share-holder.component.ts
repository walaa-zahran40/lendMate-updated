import { Component } from '@angular/core';
import { ShareHolder } from '../../../../../shared/interfaces/share-holder.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-share-holder',
  standalone: false,
  templateUrl: './view-share-holder.component.html',
  styleUrl: './view-share-holder.component.scss',
})
export class ViewShareHolderComponent {
  tableDataInside: ShareHolder[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}

  ngOnInit() {
    this.colsInside = [
      { field: 'shareHolderId', header: 'Share Holder ID' },
      { field: 'percentage', header: 'Percentage' },
      { field: 'isActive', header: 'Is Active' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
    ];
    this.tableDataInside = [
      {
        shareHolderName: '432532532532',
        percentage: 10,
        isActive: true,
        cssStyle: 'grey',
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        shareHolderName: '432532532532',
        percentage: 10,
        isActive: true,
        nameEN: 'name en',
        nameAR: 'name ar',
        cssStyle: 'orange',
      },
      {
        shareHolderName: '432532532532',
        percentage: 10,
        isActive: true,
        nameEN: 'name en',
        nameAR: 'name ar',
        cssStyle: 'orange',
      },
      {
        shareHolderName: '432532532532',
        percentage: 10,
        isActive: true,
        nameEN: 'name en',
        nameAR: 'name ar',
        cssStyle: 'green',
      },
      {
        shareHolderName: '432532532532',
        percentage: 10,
        isActive: true,
        nameEN: 'name en',
        nameAR: 'name ar',
        cssStyle: 'green',
      },
      {
        shareHolderName: '432532532532',
        percentage: 10,
        isActive: true,
        nameEN: 'name en',
        nameAR: 'name ar',
        cssStyle: 'green',
      },
      {
        shareHolderName: '432532532532',
        percentage: 10,
        isActive: true,
        nameEN: 'name en',
        nameAR: 'name ar',
        cssStyle: 'blue',
      },
      {
        shareHolderName: '432532532532',
        percentage: 10,
        isActive: true,
        nameEN: 'name en',
        nameAR: 'name ar',
        cssStyle: 'blue',
      },
    ];
  }
  addShareHolder() {
    this.router.navigate(['/crm/clients/add-share-holders']);
  }
}
