import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { AddDepartmentManagerComponent } from './add-department-manager/add-department-manager.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { AddTeamLeadComponent } from './add-team-lead/add-team-lead.component';
import { AddTeamMemberComponent } from './add-team-member/add-team-member.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { AddOperationComponent } from './add-operation/add-operation.component';
import { AddPageOperationComponent } from './add-page-operation/add-page-operation.component';
import { AddOfficerComponent } from './add-officer/add-officer.component';
import { AddSignatoryOfficerComponent } from './add-signatory-officer/add-signatory-officer.component';
const routes: Routes = [
  {
    path: 'add-department',
    component: AddDepartmentComponent,
  },
  {
    path: 'add-department-manager',
    component: AddDepartmentManagerComponent,
  },
  {
    path: 'add-team',
    component: AddTeamComponent,
  },
  {
    path: 'add-team-lead',
    component: AddTeamLeadComponent,
  },
  {
    path: 'add-team-member',
    component: AddTeamMemberComponent,
  },
  {
    path: 'add-role',
    component: AddRoleComponent,
  },
  {
    path: 'add-operation',
    component: AddOperationComponent,
  },
  {
    path: 'add-page-operation',
    component: AddPageOperationComponent,
  },
  {
    path: 'add-officer',
    component: AddOfficerComponent,
  },
  {
    path: 'add-signatory-officer',
    component: AddSignatoryOfficerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationsRoutingModule {}
