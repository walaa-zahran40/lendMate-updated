import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAssetsComponent } from './components/assets/view-assets/view-assets.component';
import { ViewPurchasingOrdersComponent } from './components/purchasing-orders/view-purchasing-orders/view-purchasing-orders.component';

const routes: Routes = [
  //Calls
  // {
  //   path: 'add-calls',
  //   component: AddCallsComponent,
  // },
  // {
  //   path: 'add-calls/:clientId',
  //   component: AddCallsComponent,
  // },
  // {
  //   path: 'edit-calls/:id/:clientId',
  //   component: AddCallsComponent,
  //   canDeactivate: [PendingChangesGuard],
  // },
  // {
  //   path: 'view-calls/:clientId',
  //   component: ViewCallsComponent,
  // },
  //Assets
  {
    path: 'assets/view-assets',
    component: ViewAssetsComponent,
  },
  //Purchasing Orders
  {
    path: 'purchasing-orders/view-purchasing-orders',
    component: ViewPurchasingOrdersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchasingRoutingModule {}
