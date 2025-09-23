import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmRoutingModule } from '../crm-routing.module';
import { AddMandateComponent } from './components/leasing-mandates/add-mandate/add-mandate.component';
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

import { FinancialFormsEffects } from './store/financial-form/financial-forms.effects';
import { reducer as financialFormsReducer } from './store/financial-form/financial-forms.reducer';
import { ViewMandatesComponent } from './components/leasing-mandates/view-mandates/view-mandates.component';
import { ViewMandateWorkFlowHistoryComponent } from './components/mandate-activities/view-mandate-workflow-history/view-mandate-work-flow-history.component';
import { StepperModule } from 'primeng/stepper';
import { AddMandateOfficerComponent } from './components/mandate-activities/mandate-officers/add-mandate-officer/add-mandate-officer.component';
import { ViewMandateOfficersComponent } from './components/mandate-activities/mandate-officers/view-mandate-officers/view-mandate-officers.component';
import { MandateOfficersEffects } from './store/mandate-officers/mandate-officers.effects';
import { mandateOfficersFeatureKey } from './store/mandate-officers/mandate-officers.state';
import { mandateOfficersReducer } from './store/mandate-officers/mandate-officers.reducer';

@NgModule({
  declarations: [
    AddMandateComponent,
    AddChildMandateComponent,
    AddMandateAdditionalTermsComponent,
    ViewMandateAdditionalTermsComponent,
    WizardComponent,
    LeasingFinancialFormCompoundComponent,
    ViewMandatesComponent,
    ViewMandateWorkFlowHistoryComponent,
    AddMandateOfficerComponent,
    ViewMandateOfficersComponent,
  ],
  imports: [
    CommonModule,
    CrmRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    TabsModule,
    StepperModule,
    ButtonModule,
    StoreModule.forFeature('mandates', leasingMandatesReducer),
    EffectsModule.forFeature([MandatesEffects]),
    StoreModule.forFeature(mandateOfficersFeatureKey, mandateOfficersReducer),
    EffectsModule.forFeature([MandateOfficersEffects]),
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
