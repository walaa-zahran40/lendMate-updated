import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsModule } from './clients/clients.module';
import { LeasingMandatesModule } from './leasing-mandates/leasing-mandates.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ClientsModule, LeasingMandatesModule],
})
export class CrmModule {}
