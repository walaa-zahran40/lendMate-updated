import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationModule } from './communication/communication.module';
import { CrmModule } from './crm/crm.module';
import { LegalsModule } from './legals/legals.module';
import { LoginModule } from './login/login.module';
import { LookupsModule } from './lookups/lookups.module';
import { OrganizationsModule } from './organizations/organizations.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CommunicationModule,
    CrmModule,
    LegalsModule,
    LoginModule,
    LookupsModule,
    OrganizationsModule,
  ],
})
export class PagesModule {}
