import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAssetsComponent } from './components/assets/view-assets/view-assets.component';
import { ViewPurchasingOrdersComponent } from './components/purchasing-orders/view-purchasing-orders/view-purchasing-orders.component';
import { AddAssetComponent } from './components/assets/add-asset/add-asset.component';
import { PendingChangesGuard } from '../../shared/guards/pending-changes.guard';
import { WizardAssetComponent } from './components/assets/activities/wizard-asset/wizard-asset.component';
import { ViewEvaluationInformationComponent } from './components/assets/activities/evaluation-information/view-evaluation-information/view-evaluation-information.component';
import { ViewLicenseInformationComponent } from './components/assets/activities/license-information/view-license-information/view-license-information.component';
import { AddEvaluationInformationComponent } from './components/assets/activities/evaluation-information/add-evaluation-information/add-evaluation-information.component';
import { AddLicenseInformationComponent } from './components/assets/activities/license-information/add-license-information/add-license-information.component';
import { AddPurchasingOrderComponent } from './components/purchasing-orders/add-purchasing-order/add-purchasing-order.component';
import { WizardPurchasingOrdersComponent } from './components/purchasing-orders/activities/wizard-purchasing-orders/wizard-purchasing-orders.component';
import { ViewPurchasingOrdersFilesComponent } from './components/purchasing-orders/activities/purchasing-orders-files/view-purchasing-orders-files/view-purchasing-orders-files.component';
import { AddPurchasingOrdersFileComponent } from './components/purchasing-orders/activities/purchasing-orders-files/add-purchasing-orders-file/add-purchasing-orders-file.component';

const routes: Routes = [
  //Assets
  {
    path: 'assets/view-assets',
    component: ViewAssetsComponent,
  },
  {
    path: 'assets/add-asset',
    component: AddAssetComponent,
  },
  {
    path: 'assets/edit-asset/:id',
    component: AddAssetComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'assets/wizard-asset/:id',
    component: WizardAssetComponent,
  },
  {
    path: 'assets/activities/view-evaluation-information/:id',
    component: ViewEvaluationInformationComponent,
  },

  {
    path: 'assets/activities/view-license-information/:id',
    component: ViewLicenseInformationComponent,
  },
  {
    path: 'assets/activities/add-evaluation-information/:id',
    component: AddEvaluationInformationComponent,
  },

  {
    path: 'assets/activities/add-license-information/:id',
    component: AddLicenseInformationComponent,
  },
  {
    path: 'assets/activities/edit-evaluation-information/:id',
    component: AddEvaluationInformationComponent,
  },

  {
    path: 'assets/activities/edit-license-information/:id',
    component: AddLicenseInformationComponent,
  },

  //Purchasing Orders
  {
    path: 'purchasing-orders/view-purchasing-orders',
    component: ViewPurchasingOrdersComponent,
  },
  {
    path: 'purchasing-orders/add-purchasing-order',
    component: AddPurchasingOrderComponent,
  },
  {
    path: 'purchasing-orders/edit-purchasing-order/:id',
    component: AddPurchasingOrderComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'purchasing-orders/wizard-purchasing-order/:id',
    component: WizardPurchasingOrdersComponent,
  },
  {
    path: 'purchasing-orders/activities/view-purchasing-orders-files/:id',
    component: ViewPurchasingOrdersFilesComponent,
  },

  {
    path: 'purchasing-orders/activities/add-purchasing-orders-file/:id',
    component: AddPurchasingOrdersFileComponent,
  },

  {
    path: 'purchasing-orders/activities/edit-purchasing-orders-file/:id',
    component: AddPurchasingOrdersFileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchasingRoutingModule {}
