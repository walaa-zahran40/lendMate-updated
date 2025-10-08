import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MsalGuard } from '@azure/msal-angular';
import { LoginComponent } from './pages/login/login/login.component';
import { ViewClientsOnboardingComponent } from './pages/crm/clients/components/clients/client-onboarding/view-clients-onboarding/view-clients-onboarding.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'crm/clients/view-clients-onboarding',
    component: ViewClientsOnboardingComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'crm',
    loadChildren: () =>
      import('./pages/crm/crm.module').then((m) => m.CrmModule),
  },
  {
    path: 'lookups',
    loadChildren: () =>
      import('./pages/lookups/lookups.module').then((m) => m.LookupsModule),
  },
  {
    path: 'organizations',
    loadChildren: () =>
      import('./pages/organizations/organizations.module').then(
        (m) => m.OrganizationsModule
      ),
  },
  {
    path: 'legals',
    loadChildren: () =>
      import('./pages/legals/legals.module').then((m) => m.LegalsModule),
  },
  {
    path: 'communication',
    loadChildren: () =>
      import('./pages/communication/communication.module').then(
        (m) => m.CommunicationModule
      ),
  },
  {
    path: 'purchasing',
    loadChildren: () =>
      import('./pages/purchasing/purchasing.module').then(
        (m) => m.PurchasingModule
      ),
  },
  {
    path: 'agreement',
    loadChildren: () =>
      import('./pages/agreement/agreement.module').then(
        (m) => m.AgreementModule
      ),
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
