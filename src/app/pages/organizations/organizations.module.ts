import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDepartmentComponent } from './components/departments/add-departments/add-department.component';
import { AddDepartmentManagerComponent } from './components/departments/add-department-managers/add-department-manager.component';
import { OrganizationsRoutingModule } from './organizations-routing.module';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { SharedModule } from '../../shared/shared.module';
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
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { branchAddressesReducer } from './store/branches/branch-addresses/branch-addresses.reducer';
import { BranchAddressesEffects } from './store/branches/branch-addresses/branch-addresses.effects';
import { BranchesEffects } from './store/branches/branches.effects';
import { reducer as branchReducer } from './store/branches/branches.reducer';
import { WizardBranchComponent } from './components/branches/wizard-branches/wizard-branch.component';
import { BranchManagersEffects } from './store/branches/branch-managers/branch-managers.effects';
import { branchManagersReducer } from './store/branches/branch-managers/branch-managers.reducer';
import { DepartmentsEffects } from './store/departments/departments.effects';
import { DepartmentsReducer } from './store/departments/departments.reducer';
import { OfficersEffects } from './store/officers/officers.effects';
import { OfficersReducer } from './store/officers/officers.reducer';
import { AddBranchAddressesComponent } from './components/branches/add-branch-addresses/add-branch-addresses.component';
import { AddBranchManagersComponent } from './components/branches/add-branch-managers/add-branch-managers.component';
import { AddBranchOfficersComponent } from './components/branches/add-branch-officers/add-branch-officers.component';
import { AddBranchComponent } from './components/branches/add-branches/add-branch.component';
import { ViewBranchAddressesComponent } from './components/branches/view-branch-addresses/view-branch-addresses.component';
import { ViewBranchManagersComponent } from './components/branches/view-branch-managers/view-branch-managers.component';
import { ViewBranchOfficersComponent } from './components/branches/view-branch-officers/view-branch-officers.component';
import { ViewBranchComponent } from './components/branches/view-branches/view-branch.component';
import { ViewDepartmentsComponent } from './components/departments/view-departments/view-departments.component';
import { reducer as RolesReducer } from './store/roles/roles.reducer';
import { RolesEffects } from './store/roles/roles.effects';
import { AddPageComponent } from './components/pages/add-page/add-page.component';
import { ViewPagesComponent } from './components/pages/view-pages/view-pages.component';
import { reducer as PagesReducer } from './store/pages/pages.reducer';
import { PagesEffects } from './store/pages/pages.effects';
import { BranchOfficersEffects } from './store/branches/branch-officers/branch-officers.effects';
import { branchOfficersReducer } from './store/branches/branch-officers/branch-officers.reducer';
import { SignatoryOfficersEffects } from './store/signatory-officers/signatory-officers.effects';
import { reducer as signatoryOfficersReducer } from './store/signatory-officers/signatory-officers.reducer';
import { OperationsEffects } from './store/operations/operations.effects';
import { reducer as operationsReducer } from './store/operations/operations.reducer';
import { PageOperationsEffects } from './store/page-operations/page-operations.effects';
import { reducer as pageOperationsReducer } from './store/page-operations/page-operations.reducer';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { routes } from '../../app-routing.module';
import { DepartmentManagersEffects } from './store/department-managers/department-managers.effects';
import { departmentManagersReducer } from './store/department-managers/department-managers.reducer';
import { TeamsEffects } from './store/teams/teams.effects';
import { TeamsReducer } from './store/teams/teams.reducer';

@NgModule({
  declarations: [
    AddDepartmentComponent,
    AddDepartmentManagerComponent,
    AddTeamComponent,
    AddTeamLeadComponent,
    AddTeamMemberComponent,
    AddRoleComponent,
    AddOperationComponent,
    AddPageOperationComponent,
    AddOfficerComponent,
    AddSignatoryOfficerComponent,
    ViewDepartmentsComponent,
    WizardDepartmentComponent,
    ViewDepartmentManagerComponent,
    ViewTeamsComponent,
    WizardTeamsComponent,
    ViewTeamLeadComponent,
    AddBranchComponent,
    ViewBranchAddressesComponent,
    AddBranchAddressesComponent,
    AddBranchComponent,
    ViewBranchManagersComponent,
    AddBranchManagersComponent,
    AddBranchOfficersComponent,
    ViewBranchComponent,
    WizardBranchComponent,
    ViewBranchOfficersComponent,
    ViewRolesComponent,
    ViewTeamMemberComponent,
    ViewOperationsComponent,
    ViewPageOperationsComponent,
    ViewOfficersComponent,
    ViewSignatoryOfficersComponent,
    AddPageComponent,
    ViewPagesComponent,
  ],
  imports: [
    CommonModule,
    OrganizationsRoutingModule,
    SharedModule,
    TabsModule,
    ButtonModule,
    StoreModule.forFeature('departments', DepartmentsReducer),
    EffectsModule.forFeature([DepartmentsEffects]),
    StoreModule.forFeature('officers', OfficersReducer),
    EffectsModule.forFeature([OfficersEffects]),
    StoreModule.forFeature('branches', branchReducer),
    EffectsModule.forFeature([BranchesEffects]),
    StoreModule.forFeature('branchManagers', branchManagersReducer),
    EffectsModule.forFeature([BranchManagersEffects]),
    StoreModule.forFeature('branches', branchReducer),
    EffectsModule.forFeature([BranchesEffects]),
    StoreModule.forFeature('branchAddresses', branchAddressesReducer),
    EffectsModule.forFeature([TeamsEffects]),
    StoreModule.forFeature('teams', TeamsReducer),
    EffectsModule.forFeature([BranchAddressesEffects]),
    StoreModule.forFeature('roles', RolesReducer),
    EffectsModule.forFeature([RolesEffects]),
    StoreModule.forFeature('pages', PagesReducer),
    EffectsModule.forFeature([PagesEffects]),
     StoreModule.forFeature('departmentManagers', departmentManagersReducer),
    EffectsModule.forFeature([DepartmentManagersEffects]),
    StoreModule.forFeature('branchOfficers', branchOfficersReducer),
    EffectsModule.forFeature([BranchOfficersEffects]),
    StoreModule.forFeature('signatoryOfficers', signatoryOfficersReducer),
    EffectsModule.forFeature([SignatoryOfficersEffects]),
    StoreModule.forFeature('operations', operationsReducer),
    EffectsModule.forFeature([OperationsEffects]),
    StoreModule.forFeature('pageOperations', pageOperationsReducer),
    EffectsModule.forFeature([PageOperationsEffects]),
  ],
  exports: [
    AddDepartmentComponent,
    AddOfficerComponent,
    AddDepartmentManagerComponent,
    AddTeamComponent,
    AddTeamLeadComponent,
    AddTeamMemberComponent,
    AddRoleComponent,
    AddOperationComponent,
    AddPageOperationComponent,
    AddOfficerComponent,
    AddSignatoryOfficerComponent,
    ViewDepartmentManagerComponent
  ],
})
export class OrganizationsModule {}
