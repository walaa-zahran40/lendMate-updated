import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsModule } from './clients/clients.module';
import { LeasingMandatesModule } from './leasing-mandates/leasing-mandates.module';
import { CrmRoutingModule } from './crm-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SectorEffects } from '../../shared/components/dropdowns/store/sector.effects';
import { sectorReducer } from '../../shared/components/dropdowns/store/sector.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClientsModule,
    LeasingMandatesModule,
    CrmRoutingModule,
    SharedModule,
    StoreModule.forFeature('sector', sectorReducer),
    EffectsModule.forFeature([SectorEffects]),
  ],
})
export class CrmModule {}
