import { Component } from '@angular/core';
import { ShareHolder } from '../../../../shared/interfaces/share-holder.interface';
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
    ];
    this.tableDataInside = [
      {
        shareHolderId: 432532532532,
        percentage: 10,
        isActive: true,
        cssStyle: 'grey',
      },
      {
        shareHolderId: 432532532532,
        percentage: 30,
        isActive: true,
        cssStyle: 'orange',
      },
      {
        shareHolderId: 432532532532,
        percentage: 50,
        isActive: true,
        cssStyle: 'orange',
      },
      {
        shareHolderId: 432532532532,
        percentage: 60,
        isActive: true,
        cssStyle: 'green',
      },
      {
        shareHolderId: 432532532532,
        percentage: 70,
        isActive: true,
        cssStyle: 'green',
      },
      {
        shareHolderId: 432532532532,
        percentage: 80,
        isActive: true,
        cssStyle: 'green',
      },
      {
        shareHolderId: 432532532532,
        percentage: 90,
        isActive: true,
        cssStyle: 'blue',
      },
      {
        shareHolderId: 432532532532,
        percentage: 100,
        isActive: true,
        cssStyle: 'blue',
      },
    ];
  }
  addShareHolder() {
    this.router.navigate(['/crm/clients/add-share-holders']);
  }
}
