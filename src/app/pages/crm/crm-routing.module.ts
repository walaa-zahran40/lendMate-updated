import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeasingMandatesComponent } from './leasing-mandates/leasing-mandates/leasing-mandates.component';
import { CompaniesComponent } from './clients/companies/companies/companies.component';

const routes: Routes = [
  {
    path: 'leasing-mandates',
    component: LeasingMandatesComponent,
  },
  {
    path: 'clients',
    component: CompaniesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrmRoutingModule {}
