import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalFormsComponent } from './legal-forms/legal-forms.component';
import { LegalFormsLawComponent } from './legal-forms-law/legal-forms-law.component';



@NgModule({
  declarations: [
    LegalFormsComponent,
    LegalFormsLawComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LegalsModule { }
