import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeasingMandatesComponent } from './leasing-mandates/leasing-mandates/leasing-mandates.component';
import { ClientOnboardingComponent } from './clients/companies/client-onboarding/client-onboarding.component';

const routes: Routes = [
  {
    path: 'leasing-mandates',
    component: LeasingMandatesComponent,
  },
  {
    path: 'clients',
    component: ClientOnboardingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrmRoutingModule {}
