import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalFormsComponent } from './legal-forms/legal-forms.component';
import { LegalFormsLawComponent } from './legal-forms-law/legal-forms-law.component';
import { LegalsRoutingModule } from './legals-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { StepperModule } from 'primeng/stepper';
import { TabsModule } from 'primeng/tabs';

@NgModule({
  declarations: [LegalFormsComponent, LegalFormsLawComponent],
  imports: [
    CommonModule,
    LegalsRoutingModule,
    SharedModule,
    StepperModule,
    ButtonModule,
    TabsModule,
    FileUploadModule,
  ],
})
export class LegalsModule {}
