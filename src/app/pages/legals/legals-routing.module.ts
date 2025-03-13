import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LegalFormsComponent } from './legal-forms/legal-forms.component';
import { LegalFormsLawComponent } from './legal-forms-law/legal-forms-law.component';
import { ViewLegalFormComponent } from './view-legal-form/view-legal-form.component';
import { ViewLegalFormLawComponent } from './view-legal-form-law/view-legal-form-law.component';

const routes: Routes = [
  {
    path: 'add-legal-forms',
    component: LegalFormsComponent,
  },
  {
    path: 'add-legal-forms-law',
    component: LegalFormsLawComponent,
  },
  {
    path: 'view-legal-form',
    component: ViewLegalFormComponent,
  },
  {
    path: 'view-legal-form-law',
    component: ViewLegalFormLawComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegalsRoutingModule {}
