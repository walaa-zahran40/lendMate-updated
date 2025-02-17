import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
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
  { path: '**', redirectTo: '/notfound' },
] as Routes;
