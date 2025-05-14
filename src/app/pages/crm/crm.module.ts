import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsModule } from './clients/clients.module';
import { LeasingMandatesModule } from './leasing-mandates/leasing-mandates.module';
import { CrmRoutingModule } from './crm-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LeasingMandatesEffects } from './store/leasing-mandates/leasing-mandates.effects';
import { leasingMandatesreducer } from './store/leasing-mandates/leasing-mandates.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClientsModule,
    LeasingMandatesModule,
    CrmRoutingModule,
    SharedModule,
        StoreModule.forFeature('leasingMandates', leasingMandatesreducer),
        EffectsModule.forFeature([LeasingMandatesEffects]),
  ],
  providers: [],
})
export class CrmModule {}
