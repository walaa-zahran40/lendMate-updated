import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddLegalFormsComponent } from './components/add-legal-forms/add-legal-forms.component';
import { LegalsRoutingModule } from './legals-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { StepperModule } from 'primeng/stepper';
import { TabsModule } from 'primeng/tabs';
import { ViewLegalFormLawsComponent } from './components/view-legal-form-laws/view-legal-form-laws.component';
import { AddLegalFormLawsComponent } from './components/add-legal-form-laws/add-legal-form-laws.component';
import { StoreModule } from '@ngrx/store';
import { legalFormLawsReducer } from './store/legal-form-laws/legal-form-laws.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LegalFormLawsEffects } from './store/legal-form-laws/legal-form-laws.effects';
import { legalFormsReducer } from '../lookups/store/legal-forms/legal-forms.reducer';
import { LegalFormsEffects } from '../lookups/store/legal-forms/legal-forms.effects';
import { ViewLegalFormsComponent } from './components/view-legal-forms/view-legal-forms.component';

@NgModule({
  declarations: [
   AddLegalFormsComponent,
    AddLegalFormLawsComponent,
    ViewLegalFormLawsComponent,
    ViewLegalFormsComponent,
  ],
  imports: [
    CommonModule,
    LegalsRoutingModule,
    SharedModule,
    StepperModule,
    ButtonModule,
    TabsModule,
    FileUploadModule,
        StoreModule.forFeature('legalFormLaws', legalFormLawsReducer),
        EffectsModule.forFeature([LegalFormLawsEffects]),
        StoreModule.forFeature('legalForms', legalFormsReducer),
        EffectsModule.forFeature([LegalFormsEffects]),
  ],
})
export class LegalsModule {}
