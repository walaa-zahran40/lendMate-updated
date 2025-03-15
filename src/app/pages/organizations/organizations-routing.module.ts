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
import { ViewDepartmentsComponent } from './view-departments/view-departments.component';
import { WizardDepartmentComponent } from './wizard-department/wizard-department.component';
import { ViewDepartmentManagerComponent } from './view-department-manager/view-department-manager.component';
import { ViewTeamsComponent } from './view-teams/view-teams.component';
import { WizardTeamsComponent } from './wizard-teams/wizard-teams.component';
import { ViewTeamLeadComponent } from './view-team-lead/view-team-lead.component';
import { ViewRolesComponent } from './view-roles/view-roles.component';
import { ViewTeamMemberComponent } from './view-team-member/view-team-member.component';
import { ViewOperationsComponent } from './view-operations/view-operations.component';
import { ViewPageOperationsComponent } from './view-page-operations/view-page-operations.component';
import { ViewOfficersComponent } from './view-officers/view-officers.component';
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
  {
    path: 'view-departments',
    component: ViewDepartmentsComponent,
  },
  {
    path: 'view-department-manager',
    component: ViewDepartmentManagerComponent,
  },
  {
    path: 'view-teams',
    component: ViewTeamsComponent,
  },
  {
    path: 'view-team-lead',
    component: ViewTeamLeadComponent,
  },
  {
    path: 'view-roles',
    component: ViewRolesComponent,
  },
  {
    path: 'view-team-member',
    component: ViewTeamMemberComponent,
  },
  {
    path: 'view-operations',
    component: ViewOperationsComponent,
  },
  {
    path: 'view-page-operations',
    component: ViewPageOperationsComponent,
  },
  {
    path: 'view-officers',
    component: ViewOfficersComponent,
  },
  {
    path: 'wizard-teams',
    component: WizardTeamsComponent,
  },
  {
    path: 'wizard-department',
    component: WizardDepartmentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationsRoutingModule {}
