import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmRoutingModule } from '../crm-routing.module';
import { AddChildMandateComponent } from './components/mandate-activities/clone/add-child-mandate/add-child-mandate.component';
import { SharedModule } from '../../../shared/shared.module';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { WizardComponent } from './components/mandate-activities/wizard/wizard.component';
import { LeasingFinancialFormCompoundComponent } from './components/mandate-activities/leasing-financial-form/leasing-financial-form-compound.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducer as leasingMandatesReducer } from './store/leasing-mandates/leasing-mandates.reducer';
import { MandatesEffects } from './store/leasing-mandates/leasing-mandates.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { MandateAdditionalTermsEffects } from './store/mandate-additional-terms/mandate-additional-terms.effects';
import { reducer as mandateAdditionalTermReducer } from './store/mandate-additional-terms/mandate-additional-terms.reducer';
import { ViewMandateAdditionalTermsComponent } from './components/mandate-activities/mandate-additional-terms/view-mandate-additional-terms/view-mandate-additional-terms.component';
import { AddMandateAdditionalTermsComponent } from './components/mandate-activities/mandate-additional-terms/add-mandate-additional-terms/add-mandate-additional-terms.component';
import { ClonesEffects } from './store/clone/clones.effects';
import { reducer as clonesReducer } from './store/clone/clones.reducer';

import { ViewChildMandatesComponent } from './components/mandate-activities/clone/view-child-mandates/view-child-mandates.component';
import { FinancialFormsEffects } from './store/financial-form/financial-forms.effects';
import { reducer as financialFormsReducer } from './store/financial-form/financial-forms.reducer';
import { ViewMandatesComponent } from '../clients/components/client-activities/client-activity-wizard/activities/client-leasing-mandates/view-mandates/view-mandates.component';
import { AddMandateFeeComponent } from './components/mandate-activities/mandate-fees/add-mandate-fee/add-mandate-fee.component';
import { ViewMandateFeesComponent } from './components/mandate-activities/mandate-fees/view-mandate-fees/view-mandate-fees.component';
import { MandateFeesEffects } from './store/mandate-fees/mandate-fees.effects';
import { mandateFeesReducer } from './store/mandate-fees/mandate-fees.reducer';

@NgModule({
  declarations: [
    AddChildMandateComponent,
    AddMandateAdditionalTermsComponent,
    ViewMandateAdditionalTermsComponent,
    WizardComponent,
    LeasingFinancialFormCompoundComponent,
    ViewChildMandatesComponent,
    AddMandateFeeComponent,
    ViewMandateFeesComponent,
  ],
  imports: [
    CommonModule,
    CrmRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    TabsModule,
    ButtonModule,
    StoreModule.forFeature('mandates', leasingMandatesReducer),
    EffectsModule.forFeature([MandatesEffects]),
    StoreModule.forFeature('mandateFees', mandateFeesReducer),
    EffectsModule.forFeature([MandateFeesEffects]),
    StoreModule.forFeature('clones', clonesReducer),
    EffectsModule.forFeature([ClonesEffects]),
    StoreModule.forFeature(
      'mandateAdditionalTerms',
      mandateAdditionalTermReducer
    ),
    EffectsModule.forFeature([MandateAdditionalTermsEffects]),
    StoreModule.forFeature('financialForms', financialFormsReducer),
    EffectsModule.forFeature([FinancialFormsEffects]),
  ],
})
export class LeasingMandatesModule {}
