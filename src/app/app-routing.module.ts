import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },

  {
    path: '',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
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
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];
//for tracing purposes
//  [RouterModule.forRoot(routes, { enableTracing: true })],

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
