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
import { AddAgreementFileComponent } from './components/activities/agreement-files/add-agreement-file/add-agreement-file.component';
import { AddAgreementContactPersonComponent } from './components/activities/agreement-contact-persons/add-agreement-contact-person/add-agreement-contact-person.component';
import { AddAgreementOfficerComponent } from './components/activities/agreement-officers/add-agreement-officer/add-agreement-officer.component';
import { AddAgreementRegistrationComponent } from './components/activities/agreement-registrations/add-agreement-registration/add-agreement-registration.component';

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
  //Wizard

  //Agreement Files
  {
    path: 'activities/wizard-agreement/view-agreement-files/:id',
    component: ViewAgreementFilesComponent,
  },

  {
    path: 'activities/wizard-agreement/add-agreement-file/:id',
    component: AddAgreementFileComponent,
  },
  {
    path: 'activities/wizard-agreement/add-agreement-file/:id',
    component: AddAgreementFileComponent,
  },
  {
    path: 'activities/wizard-agreement/edit-agreement-file/:leasingAgreementId/:regId',
    component: AddAgreementFileComponent,
  },
  //Agreement Contact Persons
  {
    path: 'activities/wizard-agreement/view-agreement-contact-persons/:id/:agreementId/:clientId',
    component: ViewAgreementContactPersonsComponent,
  },
  {
    path: 'activities/wizard-agreement/view-agreement-contact-persons/:id/:agreementId',
    component: ViewAgreementContactPersonsComponent,
  },
  {
    path: 'activities/wizard-agreement/add-agreement-contact-person/:id/:agreementId/:clientId',
    component: AddAgreementContactPersonComponent,
  },
  {
    path: 'activities/wizard-agreement/add-agreement-contact-person/:contactPersonId/:id/:agreementId/:clientId',
    component: AddAgreementContactPersonComponent,
  },
  //Agreement Officers
  {
    path: 'activities/wizard-agreement/view-agreement-officers/:id/:agreementId/:clientId',
    component: ViewAgreementOfficersComponent,
  },

  {
    path: 'activities/wizard-agreement/add-agreement-officer/:id',
    component: AddAgreementOfficerComponent,
  },
  //Agreement Registrations
  {
    path: 'activities/wizard-agreement/view-agreement-registrations/:id',
    component: ViewAgreementRegistrationsComponent,
  },

  {
    path: 'activities/wizard-agreement/add-agreement-registration/:id',
    component: AddAgreementRegistrationComponent,
  },
  {
    path: 'activities/wizard-agreement/edit-agreement-registration/:leasingAgreementId/:regId',
    component: AddAgreementRegistrationComponent,
  },
  {
    path: 'activities/wizard-agreement/:id/:agreementId/:clientId',
    component: WizardAgreementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgreementRoutingModule {}
