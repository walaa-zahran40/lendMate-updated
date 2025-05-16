import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsModule } from './clients/clients.module';
import { LeasingMandatesModule } from './leasing-mandates/leasing-mandates.module';
import { CrmRoutingModule } from './crm-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { clientSalesTurnoverReducer } from './clients/store/client-sales-turnovers/client-sales-turnovers.reducer';
import { ClientSalesTurnoversEffects } from './clients/store/client-sales-turnovers/client-sales-turnovers.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClientsModule,
    LeasingMandatesModule,
    CrmRoutingModule,
    SharedModule,
    StoreModule.forFeature('clientSalesTurnovers', clientSalesTurnoverReducer),
    EffectsModule.forFeature([ClientSalesTurnoversEffects]),
  ],
  providers: [],
})
export class CrmModule {}
