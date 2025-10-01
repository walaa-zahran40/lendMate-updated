import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAgreementsComponent } from './components/view-agreements/view-agreements.component';
import { AddAgreementComponent } from './components/add-agreement/add-agreement.component';
import { PendingChangesGuard } from '../../shared/guards/pending-changes.guard';
import { WizardAgreementComponent } from './components/activities/wizard-agreement/wizard-agreement.component';
import { ViewAgreementFilesComponent } from './components/activities/agreement-files/view-agreement-files/view-agreement-files.component';
import { ViewAgreementContactPersonsComponent } from './components/activities/agreement-contact-persons/view-agreement-contact-persons/view-agreement-contact-persons.component';
import { ViewAgreementOfficersComponent } from './components/activities/agreement-officers/view-agreement-officers/view-agreement-officers.component';
import { ViewAgreementRegistrationsComponent } from './components/activities/agreement-registrations/view-agreement-registrations/view-agreement-registrations.component';

const routes: Routes = [
  //Agreements
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
  //Activities
  {
    path: 'activities/wizard-agreement/:id',
    component: WizardAgreementComponent,
  },
  {
    path: 'activities/wizard-agreement/:id',
    component: WizardAgreementComponent,
  },
  {
    path: 'activities/wizard-agreement/view-agreement-files/:id',
    component: ViewAgreementFilesComponent,
  },
  {
    path: 'activities/wizard-agreement/view-agreement-contact-persons/:id',
    component: ViewAgreementContactPersonsComponent,
  },
  {
    path: 'activities/wizard-agreement/view-agreement-officers/:id',
    component: ViewAgreementOfficersComponent,
  },
  {
    path: 'activities/wizard-agreement/view-agreement-registrations/:id',
    component: ViewAgreementRegistrationsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgreementRoutingModule {}
