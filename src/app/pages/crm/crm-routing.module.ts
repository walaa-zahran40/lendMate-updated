import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeasingMandatesComponent } from './leasing-mandates/leasing-mandates/leasing-mandates.component';
import { AddClientComponent } from './clients/companies/add-client/add-client.component';
import { UploadDocumentsComponent } from './clients/companies/upload-documents/upload-documents.component';

const routes: Routes = [
  {
    path: 'leasing-mandates',
    component: LeasingMandatesComponent,
  },
  {
    path: 'clients',
    component: AddClientComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrmRoutingModule {}
