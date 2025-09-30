import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAgreementsComponent } from './components/view-agreements/view-agreements.component';
import { AddAgreementComponent } from './components/add-agreement/add-agreement.component';
import { PendingChangesGuard } from '../../shared/guards/pending-changes.guard';
import { ViewAgreementContactPersonsComponent } from './components/activities/agreement-contact-persons/view-agreement-contact-persons/view-agreement-contact-persons.component';
import { ViewAgreementFilesComponent } from './components/activities/agreement-files/view-agreement-files/view-agreement-files.component';
import { ViewAgreementOfficersComponent } from './components/activities/agreement-officers/view-agreement-officers/view-agreement-officers.component';
import { ViewAgreementRegistrationsComponent } from './components/activities/agreement-registrations/view-agreement-registrations/view-agreement-registrations.component';
import { WizardAgreementComponent } from './components/activities/wizard-agreement/wizard-agreement.component';
import { AddAgreementFileComponent } from './components/activities/agreement-files/add-agreement-file/add-agreement-file.component';
import { AddAgreementContactPersonComponent } from './components/activities/agreement-contact-persons/add-agreement-contact-person/add-agreement-contact-person.component';
import { AddAgreementOfficerComponent } from './components/activities/agreement-officers/add-agreement-officer/add-agreement-officer.component';
import { AddAgreementRegistrationComponent } from './components/activities/agreement-registrations/add-agreement-registration/add-agreement-registration.component';

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
  //Agreement Files
  {
    path: 'activities/view-agreement-files/:id',
    component: ViewAgreementFilesComponent,
  },

  {
    path: 'activities/add-agreement-file/:id',
    component: AddAgreementFileComponent,
  },

  {
    path: 'activities/edit-agreement-file/:id/:displayAgreementNumberId',
    component: AddAgreementFileComponent,
  },
  // Agreement Contact Persons
  {
    path: 'activities/view-agreement-contact-persons/:id',
    component: ViewAgreementContactPersonsComponent,
  },

  {
    path: 'activities/add-agreement-contact-person/:id',
    component: AddAgreementContactPersonComponent,
  },

  {
    path: 'activities/edit-agreement-contact-person/:id',
    component: AddAgreementContactPersonComponent,
  },
  // Agreement Officers
  {
    path: 'activities/view-agreement-officers/:id',
    component: ViewAgreementOfficersComponent,
  },

  {
    path: 'activities/add-agreement-officer/:id',
    component: AddAgreementOfficerComponent,
  },

  {
    path: 'activities/edit-agreement-officer/:id',
    component: AddAgreementOfficerComponent,
  },

  // Agreement Registrations
  {
    path: 'activities/view-agreement-registrations/:id',
    component: ViewAgreementRegistrationsComponent,
  },

  {
    path: 'activities/add-agreement-registration/:id',
    component: AddAgreementRegistrationComponent,
  },

  {
    path: 'activities/edit-agreement-registration/:id',
    component: AddAgreementOfficerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgreementRoutingModule {}
