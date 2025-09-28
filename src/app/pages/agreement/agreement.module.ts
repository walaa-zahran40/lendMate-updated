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
import { AgreementMainInformationFormComponent } from './forms/agreement-main-information-form/agreement-main-information-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { WizardAgreementComponent } from './components/agreements/activities/wizard-agreement/wizard-agreement.component';
import { ViewAgreementContactPersonsComponent } from './components/agreements/activities/agreement-contact-persons/view-agreement-contact-persons/view-agreement-contact-persons.component';
import { AddAgreementContactPersonComponent } from './components/agreements/activities/agreement-contact-persons/add-agreement-contact-person/add-agreement-contact-person.component';
import { AgreementContactPersonsEffects } from './store/agreement-contact-persons/agreement-contact-persons.effects';
import {
  agreementContactPersonsFeature,
  agreementContactPersonsReducer,
} from './store/agreement-contact-persons/agreement-contact-persons.reducer';
import { agreementContactPersonsFeatureKey } from './store/agreement-contact-persons/agreement-contact-persons.state';

@NgModule({
  declarations: [
    ViewAgreementsComponent,
    AddAgreementComponent,
    WizardAgreementComponent,
    ViewAgreementContactPersonsComponent,
    AddAgreementContactPersonComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    AgreementRoutingModule,
    SharedModule,
    SelectModule,
    TextareaModule,
    ReactiveFormsModule,
    TranslateModule,
    StoreModule.forFeature(
      LEASING_AGREEMENTS_FEATURE_KEY,
      leasingAgreementsReducer
    ),
    EffectsModule.forFeature([LeasingAgreementsEffects]),
    StoreModule.forFeature(agreementContactPersonsFeature),
    EffectsModule.forFeature([AgreementContactPersonsEffects]),
  ],
  providers: [],
})
export class AgreementModule {}
