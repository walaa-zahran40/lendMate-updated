import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAgreementsComponent } from './components/agreements/view-agreements/view-agreements.component';
import { AddAgreementComponent } from './components/agreements/add-agreement/add-agreement.component';
import { PendingChangesGuard } from '../../shared/guards/pending-changes.guard';
import { WizardAgreementComponent } from './components/agreements/activities/wizard-agreement/wizard-agreement.component';
import { ViewAgreementContactPersonsComponent } from './components/agreements/activities/agreement-contact-persons/view-agreement-contact-persons/view-agreement-contact-persons.component';

const routes: Routes = [
  //Agreement Contact Persons
  {
    path: 'view-agreements',
    component: ViewAgreementsComponent,
  },
  {
    path: 'add-agreement',
    component: AddAgreementComponent,
  },
  {
    path: 'edit-agreement/:id',
    component: AddAgreementComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-agreement/:id',
    component: AddAgreementComponent,
  },
  {
    path: 'wizard-agreement/:id',
    component: WizardAgreementComponent,
  },
  {
    path: 'view-agreement-contact-persons/:id',
    component: ViewAgreementContactPersonsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgreementRoutingModule {}
