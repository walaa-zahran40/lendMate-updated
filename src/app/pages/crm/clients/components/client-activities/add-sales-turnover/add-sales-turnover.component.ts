import { Component } from '@angular/core';

@Component({
  selector: 'app-add-sales-turnover',
  standalone: false,
  templateUrl: './add-sales-turnover.component.html',
  styleUrl: './add-sales-turnover.component.scss',
})
export class AddSalesTurnoverComponent {
  addSales() {
    console.log('added');
  }
  //   this.turnoverFacade.loadAll(1);
  // this.turnoverFacade.all$.subscribe(data => …);
}
