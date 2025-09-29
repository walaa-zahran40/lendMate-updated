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
