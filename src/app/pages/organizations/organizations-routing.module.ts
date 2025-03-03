import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { RolesComponent } from './roles/roles.component';
import { PagesComponent } from './pages/pages.component';
import { OperationsComponent } from './operations/operations.component';
import { PageOperationsComponent } from './page-operations/page-operations.component';
import { OfficersComponent } from './officers/officers.component';
import { TeamsComponent } from './teams/teams.component';
import { SignatoryOfficersComponent } from './signatory-officers/signatory-officers.component';
const routes: Routes = [
  {
    path: 'add-department',
    component: AddDepartmentComponent,
  },
  {
    path: 'roles',
    component: RolesComponent,
  },
  {
    path: 'pages',
    component: PagesComponent,
  },
  {
    path: 'operations',
    component: OperationsComponent,
  },
  {
    path: 'page-operations',
    component: PageOperationsComponent,
  },
  {
    path: 'officers',
    component: OfficersComponent,
  },
  {
    path: 'teams',
    component: TeamsComponent,
  },
  {
    path: 'signatory-officers',
    component: SignatoryOfficersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationsRoutingModule {}
