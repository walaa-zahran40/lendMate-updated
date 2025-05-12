import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDepartmentComponent } from './components/departments/add-departments/add-department.component';
import { AddDepartmentManagerComponent } from './components/departments/add-department-managers/add-department-manager.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { AddTeamLeadComponent } from './components/add-team-lead/add-team-lead.component';
import { AddTeamMemberComponent } from './components/add-team-member/add-team-member.component';
import { AddRoleComponent } from './components/add-role/add-role.component';
import { AddOperationComponent } from './components/add-operation/add-operation.component';
import { AddPageOperationComponent } from './components/add-page-operation/add-page-operation.component';
import { AddOfficerComponent } from './components/add-officers/add-officer.component';
import { AddSignatoryOfficerComponent } from './components/add-signatory-officer/add-signatory-officer.component';
import { WizardDepartmentComponent } from './components/departments/wizard-department/wizard-department.component';
import { ViewDepartmentManagerComponent } from './components/departments/view-department-managers/view-department-manager.component';
import { ViewTeamsComponent } from './components/view-teams/view-teams.component';
import { WizardTeamsComponent } from './components/wizard-teams/wizard-teams.component';
import { ViewTeamLeadComponent } from './components/view-team-leads/view-team-lead.component';
import { ViewRolesComponent } from './components/view-roles/view-roles.component';
import { ViewTeamMemberComponent } from './components/view-team-members/view-team-member.component';
import { ViewOperationsComponent } from './components/view-operations/view-operations.component';
import { ViewPageOperationsComponent } from './components/view-page-operations/view-page-operations.component';
import { ViewOfficersComponent } from './components/view-officers/view-officers.component';
import { ViewSignatoryOfficersComponent } from './components/view-signatory-officers/view-signatory-officers.component';
import { AddBranchComponent } from './components/add-branches/add-branch.component';
import { ViewBranchComponent } from './components/view-branches/view-branch.component';
import { WizardBranchComponent } from './components/wizard-branches/wizard-branch.component';
import { AddBranchAddressesComponent } from './components/add-branches/add-branch-addresses/add-branch-addresses.component';
import { AddBranchManagersComponent } from './components/add-branches/add-branch-managers/add-branch-managers.component';
import { AddBranchOfficersComponent } from './components/add-branches/add-branch-officers/add-branch-officers.component';
import { ViewBranchAddressesComponent } from './components/view-branches/view-branch-addresses/view-branch-addresses.component';
import { ViewBranchManagersComponent } from './components/view-branches/view-branch-managers/view-branch-managers.component';
import { ViewBranchOfficersComponent } from './components/view-branches/view-branch-officers/view-branch-officers.component';
import { ViewDepartmentsComponent } from './components/departments/view-departments/view-departments.component';
const routes: Routes = [
  //Officers

  {
    path: 'add-officer',
    component: AddOfficerComponent,
  },
  {
    path: 'edit-officer/:id',
    component: AddOfficerComponent,
  },
  {
    path: 'view-officers',
    component: ViewOfficersComponent,
  },

  //Branches
  {
    path: 'add-branch',
    component: AddBranchComponent,
  },
  {
    path: 'edit-branch/:id',
    component: AddBranchComponent,
  },
  {
    path: 'view-branches',
    component: ViewBranchComponent,
  },
  {
    path: 'wizard-branch/:branchId',
    component: WizardBranchComponent,
  },
  {
    path: 'add-branch',
    component: AddBranchComponent,
  },
  {
    path: 'add-branch-addresses',
    component: AddBranchAddressesComponent,
  },
  {
    path: 'add-branch-addresses/:branchId',
    component: AddBranchAddressesComponent,
  },
  {
    path: 'edit-branch-addresses/:id',
    component: AddBranchAddressesComponent,
  },
  {
    path: 'add-branch-officers',
    component: AddBranchOfficersComponent,
  },

  {
    path: 'add-branch-managers',
    component: AddBranchManagersComponent,
  },
  {
    path: 'edit-branch-managers/:id',
    component: AddBranchManagersComponent,
  },
  {
    path: 'view-branch-managers/:branchId',
    component: ViewBranchManagersComponent,
  },
  {
    path: 'view-branch-officers/:branchId',
    component: ViewBranchOfficersComponent,
  },
  {
    path: 'view-branch-addresses/:branchId',
    component: ViewBranchAddressesComponent,
  },
  //Department
  {
    path: 'add-department',
    component: AddDepartmentComponent,
  },
  {
    path: 'edit-department/:id',
    component: AddDepartmentComponent,
  },
  {
    path: 'wizard-department/:deptId',
    component: WizardDepartmentComponent,
  },
  {
    path: 'view-departments',
    component: ViewDepartmentsComponent,
  },
  {
    path: 'view-department-managers/:deptId',
    component: ViewDepartmentManagerComponent,
  },
  {
    path: 'add-department-manager/:deptId',
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
    path: 'view-signatory-officers',
    component: ViewSignatoryOfficersComponent,
  },
  {
    path: 'wizard-teams',
    component: WizardTeamsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationsRoutingModule {}
