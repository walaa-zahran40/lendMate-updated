import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesModule } from './companies/companies.module';
import { CrmRoutingModule } from '../crm-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, CompaniesModule, CrmRoutingModule],
})
export class ClientsModule {}
