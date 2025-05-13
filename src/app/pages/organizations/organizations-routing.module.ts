import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDepartmentComponent } from './components/departments/add-departments/add-department.component';
import { AddDepartmentManagerComponent } from './components/departments/add-department-managers/add-department-manager.component';
import { AddTeamComponent } from './components/teams/add-team/add-team.component';
import { AddTeamLeadComponent } from './components/teams/add-team-lead/add-team-lead.component';
import { AddTeamMemberComponent } from './components/teams/add-team-member/add-team-member.component';
import { AddRoleComponent } from './components/roles/add-role/add-role.component';
import { AddOperationComponent } from './components/operations/add-operation/add-operation.component';
import { AddPageOperationComponent } from './components/operations/add-page-operation/add-page-operation.component';
import { AddOfficerComponent } from './components/officers/add-officers/add-officer.component';
import { AddSignatoryOfficerComponent } from './components/officers/add-signatory-officer/add-signatory-officer.component';
import { WizardDepartmentComponent } from './components/departments/wizard-department/wizard-department.component';
import { ViewDepartmentManagerComponent } from './components/departments/view-department-managers/view-department-manager.component';
import { ViewTeamsComponent } from './components/teams/view-teams/view-teams.component';
import { WizardTeamsComponent } from './components/teams/wizard-teams/wizard-teams.component';
import { ViewTeamLeadComponent } from './components/teams/view-team-leads/view-team-lead.component';
import { ViewRolesComponent } from './components/roles/view-roles/view-roles.component';
import { ViewTeamMemberComponent } from './components/teams/view-team-members/view-team-member.component';
import { ViewOperationsComponent } from './components/operations/view-operations/view-operations.component';
import { ViewPageOperationsComponent } from './components/operations/view-page-operations/view-page-operations.component';
import { ViewOfficersComponent } from './components/officers/view-officers/view-officers.component';
import { ViewSignatoryOfficersComponent } from './components/officers/view-signatory-officers/view-signatory-officers.component';
import { ViewBranchOfficersComponent } from './components/branches/view-branch-officers/view-branch-officers.component';
import { ViewDepartmentsComponent } from './components/departments/view-departments/view-departments.component';
import { AddBranchAddressesComponent } from './components/branches/add-branch-addresses/add-branch-addresses.component';
import { AddBranchManagersComponent } from './components/branches/add-branch-managers/add-branch-managers.component';
import { AddBranchOfficersComponent } from './components/branches/add-branch-officers/add-branch-officers.component';
import { AddBranchComponent } from './components/branches/add-branches/add-branch.component';
import { ViewBranchAddressesComponent } from './components/branches/view-branch-addresses/view-branch-addresses.component';
import { ViewBranchManagersComponent } from './components/branches/view-branch-managers/view-branch-managers.component';
import { ViewBranchComponent } from './components/branches/view-branches/view-branch.component';
import { WizardBranchComponent } from './components/branches/wizard-branches/wizard-branch.component';
import { AddPageComponent } from './components/pages/add-page/add-page.component';
import { ViewPagesComponent } from './components/pages/view-pages/view-pages.component';
import { WizardRolesComponent } from './components/roles/wizard-roles/wizard-roles.component';
import { ViewRoleClaimsComponent } from './components/roles/view-role-claims/view-role-claims.component';
import { AddRoleClaimComponent } from './components/roles/add-role-claim/add-role-claim.component';
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
    path: 'edit-branch-officers/:id',
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
    path: 'wizard-department/:departmentId',
    component: WizardDepartmentComponent,
  },
  {
    path: 'view-departments',
    component: ViewDepartmentsComponent,
  },
  {
    path: 'view-department-managers/:departmentId',
    component: ViewDepartmentManagerComponent,
  },
  {
    path: 'add-department-managers',
    component: AddDepartmentManagerComponent,
  },
  {
    path: 'add-department-managers/:departmentId',
    component: AddDepartmentManagerComponent,
  },
  {
    path: 'edit-department-managers/:id',
    component: AddDepartmentManagerComponent,
  },
  //roles
  {
    path: 'view-roles',
    component: ViewRolesComponent,
  },
  {
    path: 'view-role-claims/:roleId',
    component: ViewRoleClaimsComponent,
  },
  {
    path: 'add-role-claim/:roleId',
    component: AddRoleClaimComponent,
  },
  {
    path: 'edit-role-claim/:roleId',
    component: AddRoleClaimComponent,
  },
  {
    path: 'wizard-roles/:roleId',
    component: WizardRolesComponent,
  },
  {
    path: 'add-role',
    component: AddRoleComponent,
  },
  {
    path: 'edit-role/:id',
    component: AddRoleComponent,
  },
  //pages
  {
    path: 'add-page',
    component: AddPageComponent,
  },
  {
    path: 'edit-page/:id',
    component: AddPageComponent,
  },
  {
    path: 'view-pages',
    component: ViewPagesComponent,
  },
  //operations
  {
    path: 'add-operation',
    component: AddOperationComponent,
  },
  {
    path: 'edit-operation/:id',
    component: AddOperationComponent,
  },
  {
    path: 'view-operations',
    component: ViewOperationsComponent,
  },
  //page operations
  {
    path: 'add-page-operation',
    component: AddPageOperationComponent,
  },
  {
    path: 'edit-page-operation/:id',
    component: AddPageOperationComponent,
  },
  {
    path: 'view-page-operations',
    component: ViewPageOperationsComponent,
  },
  //----
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
    path: 'add-officer',
    component: AddOfficerComponent,
  },
  {
    path: 'add-signatory-officer',
    component: AddSignatoryOfficerComponent,
  },
  {
    path: 'edit-signatory-officer/:id',
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
    path: 'view-team-member',
    component: ViewTeamMemberComponent,
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

  //Teams
  {
    path: 'add-team',
    component: AddTeamComponent,
  },
  {
    path: 'edit-team/:id',
    component: AddTeamComponent,
  },
  {
    path: 'wizard-teams/:teamId',
    component: WizardTeamsComponent,
  },
  {
    path: 'view-teams',
    component: ViewTeamsComponent,
  },
  // {
  //   path: 'view-department-managers/:deptId',
  //   component: ViewDepartmentManagerComponent,
  // },
  // {
  //   path: 'add-department-manager/:deptId',
  //   component: AddDepartmentManagerComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationsRoutingModule {}
