import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAgreementsComponent } from './components/agreements/view-agreements/view-agreements.component';
import { AddAgreementComponent } from './components/agreements/add-agreement/add-agreement.component';
import { PendingChangesGuard } from '../../shared/guards/pending-changes.guard';
import { WizardAgreementComponent } from './components/agreements/activities/wizard-agreement/wizard-agreement.component';
import { ViewAgreementContactPersonsComponent } from './components/agreements/activities/agreement-contact-persons/view-agreement-contact-persons/view-agreement-contact-persons.component';
import { AddAgreementContactPersonComponent } from './components/agreements/activities/agreement-contact-persons/add-agreement-contact-person/add-agreement-contact-person.component';

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
    path: 'agreement-contact-persons/add/:leasingId/:leasingAgreementsId',
    component: AddAgreementContactPersonComponent,
  },
  {
    path: 'agreement-contact-persons/edit/:leasingId/:leasingAgreementsId/:agreementContactPersonId',
    component: AddAgreementContactPersonComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'agreement-contact-persons/view/:leasingId/:leasingAgreementsId/:agreementContactPersonId',
    component: AddAgreementContactPersonComponent,
  },

  // Contact-persons list for a agreement (keep)
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
  // ------------------------------
  // Backward-compat (optional)
  // ------------------------------

  // OLD add routes → point to Add component
  {
    path: 'add-agreement-contact-person/:leasingId/:leasingAgreementsId',
    component: AddAgreementContactPersonComponent,
  },
  {
    path: 'add-agreement-contact-person/:leasingId/:leasingAgreementsId/:agreementContactPersonId',
    component: AddAgreementContactPersonComponent,
  },

  // OLD edit routes → point to Add component with guard
  {
    path: 'edit-agreement-contact-person/:leasingId/:leasingAgreementsId',
    component: AddAgreementContactPersonComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'edit-agreement-contact-person/:leasingId/:leasingAgreementsId/:agreementContactPersonId',
    component: AddAgreementContactPersonComponent,
    canDeactivate: [PendingChangesGuard],
  },

  // OLD list routes (kept)
  {
    path: 'view-agreement-contact-persons/:leasingId/:leasingAgreementsId/:agreementContactPersonId',
    component: ViewAgreementContactPersonsComponent, // if you ever need deep-link to highlight one
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgreementRoutingModule {}
