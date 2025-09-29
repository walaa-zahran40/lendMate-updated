import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgreementRoutingModule } from './agreement-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ViewAgreementsComponent } from './components/view-agreements/view-agreements.component';
import { AddAgreementComponent } from './components/add-agreement/add-agreement.component';
import { leasingAgreementsReducer } from './store/agreements/agreements.reducer';
import { LeasingAgreementsEffects } from './store/agreements/agreements.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LEASING_AGREEMENTS_FEATURE_KEY } from './store/agreements/agreements.state';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { AgreementContactPersonsEffects } from './store/agreement-contact-persons/agreement-contact-persons.effects';
import {
  agreementContactPersonsFeature,
  agreementContactPersonsReducer,
} from './store/agreement-contact-persons/agreement-contact-persons.reducer';
import { AddAgreementContactPersonComponent } from './components/activities/agreement-contact-persons/add-agreement-contact-person/add-agreement-contact-person.component';
import { ViewAgreementContactPersonsComponent } from './components/activities/agreement-contact-persons/view-agreement-contact-persons/view-agreement-contact-persons.component';
import { AddAgreementFileComponent } from './components/activities/agreement-files/add-agreement-file/add-agreement-file.component';
import { ViewAgreementFilesComponent } from './components/activities/agreement-files/view-agreement-files/view-agreement-files.component';
import { AddAgreementOfficerComponent } from './components/activities/agreement-officers/add-agreement-officer/add-agreement-officer.component';
import { ViewAgreementOfficersComponent } from './components/activities/agreement-officers/view-agreement-officers/view-agreement-officers.component';
import { AddAgreementRegistrationComponent } from './components/activities/agreement-registrations/add-agreement-registration/add-agreement-registration.component';
import { ViewAgreementRegistrationsComponent } from './components/activities/agreement-registrations/view-agreement-registrations/view-agreement-registrations.component';
import { WizardAgreementComponent } from './components/activities/wizard-agreement/wizard-agreement.component';
import { AgreementFilesEffects } from './store/agreement-files/agreement-files.effects';
import { reducer } from './store/agreement-files/agreement-files.reducer';
import { TabsModule } from 'primeng/tabs';
import { agreementContactPersonsFeatureKey } from './store/agreement-contact-persons/agreement-contact-persons.state';

@NgModule({
  declarations: [
    ViewAgreementsComponent,
    AddAgreementComponent,
    WizardAgreementComponent,
    ViewAgreementContactPersonsComponent,
    AddAgreementContactPersonComponent,
    ViewAgreementOfficersComponent,
    AddAgreementOfficerComponent,
    AddAgreementFileComponent,
    ViewAgreementFilesComponent,
    ViewAgreementRegistrationsComponent,
    AddAgreementRegistrationComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    AgreementRoutingModule,
    SharedModule,
    SelectModule,
    TabsModule,
    TextareaModule,
    ReactiveFormsModule,
    TranslateModule,
    StoreModule.forFeature(
      LEASING_AGREEMENTS_FEATURE_KEY,
      leasingAgreementsReducer
    ),
    EffectsModule.forFeature([LeasingAgreementsEffects]),
    StoreModule.forFeature(
      agreementContactPersonsFeatureKey,
      agreementContactPersonsReducer
    ),
    EffectsModule.forFeature([AgreementContactPersonsEffects]),
    EffectsModule.forFeature([AgreementFilesEffects]),
    StoreModule.forFeature('agreementFiles', reducer),
  ],
  providers: [],
})
export class AgreementModule {}
