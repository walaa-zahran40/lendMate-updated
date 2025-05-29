import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmRoutingModule } from '../crm-routing.module';
import { AddMandateComponent } from './components/leasing-mandates/add-mandate/add-mandate.component';
import { AddChildMandateComponent } from './components/mandate-activities/add-child-mandate/add-child-mandate.component';
import { LeasingFinancialFormComponent } from './components/leasing-financial-form/leasing-financial-form.component';
import { SharedModule } from '../../../shared/shared.module';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { ViewMandatesComponent } from './components/leasing-mandates/view-mandates/view-mandates.component';
import { ViewOfficersComponent } from './components/mandate-activities/view-officers/view-officers.component';
import { ViewContactPersonsComponent } from './components/mandate-activities/view-contact-persons/view-contact-persons.component';
import { ViewAssetTypeComponent } from './components/mandate-activities/view-asset-type/view-asset-type.component';
import { WizardComponent } from './components/mandate-activities/wizard/wizard.component';
import { LeasingFinancialFormCompoundComponent } from './components/leasing-financial-form-compound/leasing-financial-form-compound.component';
import { ViewCalculationsComponent } from './components/mandate-activities/view-calculations/view-calculations.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducer as leasingMandatesReducer } from './store/leasing-mandates/leasing-mandates.reducer';
import { MandatesEffects } from './store/leasing-mandates/leasing-mandates.effects';
import { FormComponent } from '../../../shared/components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MandateAdditionalTermsEffects } from './store/mandate-additional-terms/mandate-additional-terms.effects';
import { mandateAdditionalTermReducer } from './store/mandate-additional-terms/mandate-additional-terms.reducer';
import { ViewMandateAdditionalTermsComponent } from './components/mandate-activities/mandate-additional-terms/view-mandate-additional-terms/view-mandate-additional-terms.component';
import { AddMandateAdditionalTermsComponent } from './components/mandate-activities/mandate-additional-terms/add-mandate-additional-terms/add-mandate-additional-terms.component';

@NgModule({
  declarations: [
    AddMandateComponent,
    AddChildMandateComponent,
    AddMandateAdditionalTermsComponent,
    LeasingFinancialFormComponent,
    ViewMandatesComponent,
    ViewOfficersComponent,
    ViewContactPersonsComponent,
    ViewMandateAdditionalTermsComponent,
    ViewAssetTypeComponent,
    WizardComponent,
    ViewCalculationsComponent,
    LeasingFinancialFormCompoundComponent,
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
    StoreModule.forFeature('mandateAdditionalTerms', mandateAdditionalTermReducer),
    EffectsModule.forFeature([MandateAdditionalTermsEffects]),
  ],
})
export class LeasingMandatesModule {}
