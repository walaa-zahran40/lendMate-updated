import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LegalFormsComponent } from './legal-forms/legal-forms.component';
import { LegalFormsLawComponent } from './legal-forms-law/legal-forms-law.component';

const routes: Routes = [
  {
    path: 'legal-forms',
    component: LegalFormsComponent,
  },
  {
    path: 'legal-forms-law',
    component: LegalFormsLawComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegalsRoutingModule {}
