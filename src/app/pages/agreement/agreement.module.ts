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

@NgModule({
  declarations: [
    ViewAgreementsComponent,
    AddAgreementComponent,
    WizardAgreementComponent,
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
  ],
  providers: [],
})
export class AgreementModule {}
