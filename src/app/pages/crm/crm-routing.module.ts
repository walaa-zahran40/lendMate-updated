import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeasingMandatesComponent } from './leasing-mandates/leasing-mandates/leasing-mandates.component';
import { UploadDocumentsComponent } from './clients/companies/upload-documents/upload-documents.component';

const routes: Routes = [
  {
    path: 'leasing-mandates',
    component: LeasingMandatesComponent,
  },
  {
    path: 'clients',
    component: UploadDocumentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrmRoutingModule {}
