import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewLegalFormLawsComponent } from './components/legal-form-laws/view-legal-form-laws/view-legal-form-laws.component';
import { AddLegalFormLawsComponent } from './components/legal-form-laws/add-legal-form-laws/add-legal-form-laws.component';
import { AddLegalFormsComponent } from './components/legal-forms/add-legal-forms/add-legal-forms.component';
import { ViewLegalFormsComponent } from './components/legal-forms/view-legal-forms/view-legal-forms.component';
import { PendingChangesGuard } from '../../shared/guards/pending-changes.guard';
import { legalFormLawResolver } from './resolvers/legal-form-law.resolver';
import { legalFormResolver } from './resolvers/legal-form.resolver';

const routes: Routes = [
  // Legal form law
  {
    path: 'add-legal-form-law',
    component: AddLegalFormLawsComponent,
  },
  {
    path: 'edit-legal-form-law/:id', // edit / view
    component: AddLegalFormLawsComponent,
    canDeactivate: [PendingChangesGuard],
    resolve: { legalFormLaw: legalFormLawResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'view-legal-form-laws',
    component: ViewLegalFormLawsComponent,
  },

  // Legal form
  {
    path: 'add-legal-form',
    component: AddLegalFormsComponent,
  },
  {
    path: 'edit-legal-form/:id',
    component: AddLegalFormsComponent,
    canDeactivate: [PendingChangesGuard],
    resolve: { legalForm: legalFormResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'view-legal-forms',
    component: ViewLegalFormsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegalsRoutingModule {}
