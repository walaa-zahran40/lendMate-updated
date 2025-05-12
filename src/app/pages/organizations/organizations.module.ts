import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDepartmentComponent } from './components/departments/add-departments/add-department.component';
import { AddDepartmentManagerComponent } from './components/departments/add-department-managers/add-department-manager.component';
import { OrganizationsRoutingModule } from './organizations-routing.module';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { SharedModule } from '../../shared/shared.module';
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
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { branchAddressesReducer } from './store/branch-addresses/branch-addresses.reducer';
import { BranchAddressesEffects } from './store/branch-addresses/branch-addresses.effects';
import { BranchesEffects } from './store/branches/branches.effects';
import { reducer as branchReducer } from './store/branches/branches.reducer';
import { AddBranchAddressesComponent } from './components/add-branches/add-branch-addresses/add-branch-addresses.component';
import { AddBranchManagersComponent } from './components/add-branches/add-branch-managers/add-branch-managers.component';
import { AddBranchOfficersComponent } from './components/add-branches/add-branch-officers/add-branch-officers.component';
import { AddBranchComponent } from './components/add-branches/add-branch.component';
import { ViewDepartmentsComponent } from './components/departments/view-departments/view-departments.component';
import { ViewBranchAddressesComponent } from './components/view-branches/view-branch-addresses/view-branch-addresses.component';
import { ViewBranchManagersComponent } from './components/view-branches/view-branch-managers/view-branch-managers.component';
import { ViewBranchOfficersComponent } from './components/view-branches/view-branch-officers/view-branch-officers.component';
import { ViewBranchComponent } from './components/view-branches/view-branch.component';
import { WizardBranchComponent } from './components/wizard-branches/wizard-branch.component';
import { BranchManagersEffects } from './store/branch-managers/branch-managers.effects';
import { branchManagersReducer } from './store/branch-managers/branch-managers.reducer';
import { DepartmentsEffects } from './store/departments/departments.effects';
import { DepartmentsReducer } from './store/departments/departments.reducer';
import { OfficersEffects } from './store/officers/officers.effects';
import { OfficersReducer } from './store/officers/officers.reducer';

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
    EffectsModule.forFeature([BranchAddressesEffects]),
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
  ],
})
export class OrganizationsModule {}
