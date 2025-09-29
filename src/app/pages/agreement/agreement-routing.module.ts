import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAgreementsComponent } from './components/agreements/view-agreements/view-agreements.component';
import { AddAgreementComponent } from './components/agreements/add-agreement/add-agreement.component';
import { PendingChangesGuard } from '../../shared/guards/pending-changes.guard';
import { WizardAgreementComponent } from './components/agreements/activities/wizard-agreement/wizard-agreement.component';
import { ViewAgreementContactPersonsComponent } from './components/agreements/activities/agreement-contact-persons/view-agreement-contact-persons/view-agreement-contact-persons.component';
import { AddAgreementContactPersonComponent } from './components/agreements/activities/agreement-contact-persons/add-agreement-contact-person/add-agreement-contact-person.component';
import { ViewAgreementOfficersComponent } from './components/agreements/activities/agreement-officers/view-agreement-officers/view-agreement-officers.component';
import { ViewAgreementFilesComponent } from './components/agreements/activities/agreement-files/view-agreement-files/view-agreement-files.component';
import { ViewAgreementRegistrationsComponent } from './components/agreements/activities/agreement-registrations/view-agreement-registrations/view-agreement-registrations.component';

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
    path: 'wizard-agreement/:leasingAgreementsId',
    component: WizardAgreementComponent,
  },
  {
    path: 'wizard-agreement/:leasingAgreementsId/:clientId',
    component: WizardAgreementComponent,
  },
  // Agreement Contact Persons
  {
    path: 'view-agreement-contact-persons/:agreementId/:leasingAgreementsId',
    component: ViewAgreementContactPersonsComponent,
  },
  {
    path: 'view-agreement-contact-persons/:agreementId',
    component: ViewAgreementContactPersonsComponent,
  },
  {
    path: 'view-agreement-contact-persons/:agreementId/:clientId/:leasingAgreementsId',
    component: ViewAgreementContactPersonsComponent, // if you ever need deep-link to highlight one
  },
  // Agreement Officers
  {
    path: 'view-agreement-officers/:agreementId/:leasingAgreementsId',
    component: ViewAgreementOfficersComponent,
  },
  {
    path: 'view-agreement-officers/:agreementId',
    component: ViewAgreementOfficersComponent,
  },
  {
    path: 'view-agreement-officers/:agreementId/:clientId/:leasingAgreementsId',
    component: ViewAgreementOfficersComponent,
  },
  // Agreement Files
  {
    path: 'view-agreement-files/:agreementId/:leasingAgreementsId',
    component: ViewAgreementFilesComponent,
  },
  {
    path: 'view-agreement-files/:agreementId',
    component: ViewAgreementFilesComponent,
  },
  {
    path: 'view-agreement-files/:agreementId/:clientId/:leasingAgreementsId',
    component: ViewAgreementFilesComponent,
  },
  // Agreement Registrations
  {
    path: 'view-agreement-registrations/:agreementId/:leasingAgreementsId',
    component: ViewAgreementRegistrationsComponent,
  },
  {
    path: 'view-agreement-registrations/:agreementId',
    component: ViewAgreementRegistrationsComponent,
  },
  {
    path: 'view-agreement-registrations/:agreementId/:clientId/:leasingAgreementsId',
    component: ViewAgreementRegistrationsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgreementRoutingModule {}
