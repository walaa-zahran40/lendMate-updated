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
import { TabsModule } from 'primeng/tabs';
import { WizardAgreementComponent } from './components/activities/wizard-agreement/wizard-agreement.component';
import { AddAgreementFileComponent } from './components/activities/agreement-files/add-agreement-file/add-agreement-file.component';
import { ViewAgreementFilesComponent } from './components/activities/agreement-files/view-agreement-files/view-agreement-files.component';
import { ViewAgreementContactPersonsComponent } from './components/activities/agreement-contact-persons/view-agreement-contact-persons/view-agreement-contact-persons.component';
import { AddAgreementContactPersonComponent } from './components/activities/agreement-contact-persons/add-agreement-contact-person/add-agreement-contact-person.component';
import { AddAgreementOfficerComponent } from './components/activities/agreement-officers/add-agreement-officer/add-agreement-officer.component';
import { ViewAgreementOfficersComponent } from './components/activities/agreement-officers/view-agreement-officers/view-agreement-officers.component';
import { ViewAgreementRegistrationsComponent } from './components/activities/agreement-registrations/view-agreement-registrations/view-agreement-registrations.component';
import { AddAgreementRegistrationComponent } from './components/activities/agreement-registrations/add-agreement-registration/add-agreement-registration.component';
import { AgreementContactPersonsEffects } from './store/agreement-contact-persons/agreement-contact-persons.effects';
import { agreementContactPersonsReducer } from './store/agreement-contact-persons/agreement-contact-persons.reducer';
import { AgreementFilesEffects } from './store/agreement-files/agreement-files.effects';
import { AgreementOfficersEffects } from './store/agreement-officers/agreement-officers.effects';
import { agreementOfficersReducer } from './store/agreement-officers/agreement-officers.reducer';
import { LeasingAgreementRegistrationsEffects } from './store/agreement-registrations/agreement-registrations.effects';
import {
  FEATURE_KEY,
  reducer,
} from './store/agreement-registrations/agreement-registrations.reducer';
import { agreementFilesReducer } from './store/agreement-files/agreement-files.reducer';

@NgModule({
  declarations: [
    ViewAgreementsComponent,
    AddAgreementComponent,
    WizardAgreementComponent,
    AddAgreementFileComponent,
    ViewAgreementFilesComponent,
    ViewAgreementContactPersonsComponent,
    AddAgreementContactPersonComponent,
    AddAgreementOfficerComponent,
    ViewAgreementOfficersComponent,
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
    StoreModule.forFeature('agreementOfficers', agreementOfficersReducer),
    EffectsModule.forFeature([AgreementOfficersEffects]),
    StoreModule.forFeature(
      'agreementContactPersons',
      agreementContactPersonsReducer
    ),
    EffectsModule.forFeature([AgreementContactPersonsEffects]),
    StoreModule.forFeature(FEATURE_KEY, reducer),
    EffectsModule.forFeature([LeasingAgreementRegistrationsEffects]),
    StoreModule.forFeature('agreementFiles', agreementFilesReducer),
    EffectsModule.forFeature([AgreementFilesEffects]),
  ],
  providers: [],
})
export class AgreementModule {}
