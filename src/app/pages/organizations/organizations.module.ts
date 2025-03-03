import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { AddDepartmentManagerComponent } from './add-department-manager/add-department-manager.component';
import { OrganizationsRoutingModule } from './organizations-routing.module';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { SharedModule } from '../../shared/shared.module';
import { AddTeamComponent } from './add-team/add-team.component';
import { AddTeamLeadComponent } from './add-team-lead/add-team-lead.component';
import { AddTeamMemberComponent } from './add-team-member/add-team-member.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { AddOperationComponent } from './add-operation/add-operation.component';
import { AddPageOperationComponent } from './add-page-operation/add-page-operation.component';
import { AddOfficerComponent } from './add-officer/add-officer.component';
import { AddSignatoryOfficerComponent } from './add-signatory-officer/add-signatory-officer.component';

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
