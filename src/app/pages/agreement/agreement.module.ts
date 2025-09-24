import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgreementRoutingModule } from './agreement-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ViewAgreementsComponent } from './components/agreements/view-agreements/view-agreements.component';
import { AddAgreementComponent } from './components/agreements/add-agreement/add-agreement.component';
import { leasingAgreementsReducer } from './store/agreements/agreements.reducer';
import { LeasingAgreementsEffects } from './store/agreements/agreements.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LEASING_AGREEMENTS_FEATURE_KEY } from './store/agreements/agreements.state';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ViewAgreementsComponent, AddAgreementComponent],
  imports: [
    CommonModule,
    ButtonModule,
    AgreementRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature(
      LEASING_AGREEMENTS_FEATURE_KEY,
      leasingAgreementsReducer
    ),
    EffectsModule.forFeature([LeasingAgreementsEffects]),
  ],
  providers: [],
})
export class AgreementModule {}
