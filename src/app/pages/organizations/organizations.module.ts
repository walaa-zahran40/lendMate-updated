import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { RolesComponent } from './roles/roles.component';
import { PagesComponent } from './pages/pages.component';
import { OperationsComponent } from './operations/operations.component';
import { PageOperationsComponent } from './page-operations/page-operations.component';
import { OfficersComponent } from './officers/officers.component';
import { TeamsComponent } from './teams/teams.component';
import { SignatoryOfficersComponent } from './signatory-officers/signatory-officers.component';
import { DepartmentManagerComponent } from './department-manager/department-manager.component';
import { RoleClaimsComponent } from './role-claims/role-claims.component';
import { TeamLeadComponent } from './team-lead/team-lead.component';
import { TeamMemberComponent } from './team-member/team-member.component';
import { OrganizationsRoutingModule } from './organizations-routing.module';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    AddDepartmentComponent,
    RolesComponent,
    PagesComponent,
    OperationsComponent,
    PageOperationsComponent,
    OfficersComponent,
    TeamsComponent,
    SignatoryOfficersComponent,
    DepartmentManagerComponent,
    RoleClaimsComponent,
    TeamLeadComponent,
    TeamMemberComponent,
  ],
  imports: [
    CommonModule,
    OrganizationsRoutingModule,
    SharedModule,
    TabsModule,
    ButtonModule,
  ],
  exports: [
    AddDepartmentComponent,
    RolesComponent,
    PagesComponent,
    OperationsComponent,
    PageOperationsComponent,
    OfficersComponent,
    TeamsComponent,
    SignatoryOfficersComponent,
    DepartmentManagerComponent,
    RoleClaimsComponent,
    TeamLeadComponent,
    TeamMemberComponent,
  ],
})
export class OrganizationsModule {}
