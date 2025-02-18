import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

export default [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'crm',
    loadChildren: () => import('./crm/crm.module').then((m) => m.CrmModule),
  },
  {
    path: 'lookups',
    loadChildren: () =>
      import('./lookups/lookups.module').then((m) => m.LookupsModule),
  },
  {
    path: 'organizations',
    loadChildren: () =>
      import('./organizations/organizations.module').then(
        (m) => m.OrganizationsModule
      ),
  },
  {
    path: 'legals',
    loadChildren: () =>
      import('./legals/legals.module').then((m) => m.LegalsModule),
  },
  {
    path: 'communication',
    loadChildren: () =>
      import('./communication/communication.module').then(
        (m) => m.CommunicationModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
] as Routes;
