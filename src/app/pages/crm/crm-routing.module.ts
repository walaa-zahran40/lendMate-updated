import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WizardComponent } from './leasing-mandates/components/mandate-activities/wizard/wizard.component';
import { AddClientAddressesComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-addresses/add-client-address/add-client-address.component';
import { ViewClientAddressesComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-addresses/view-client-addresses/view-client-address.component';
import { AddClientCentralBankInfoComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-central-bank-info/add-central-bank-info/add-central-bank-info.component';
import { ViewClientCentralBankInfoComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-central-bank-info/view-central-bank-info/view-central-bank-info.component';
import { AddContactPersonComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-contact-persons/add-contact-person/add-contact-person.component';
import { ViewContactPersonComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-contact-persons/view-contact-person/view-contact-person.component';
import { AddClientCRAuthorityOfficesComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-cr-authority-offices/add-cr-authority-office/add-cr-authority-office.component';
import { ViewCRAuthorityOfficesComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-cr-authority-offices/view-cr-authority-offices/view-cr-authority-office.component';
import { AddClientGuarantorComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-guarantors/add-client-guarantor/add-client-guarantor.component';
import { AddClientIdentityComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-identities/add-client-identity/add-client-identity.component';
import { ViewClientIdentityComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-identities/view-client-identity/view-client-identity.component';
import { AddPhoneNumberComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-phone-numbers/add-phone-number/add-phone-number.component';
import { ViewPhoneNumberComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-phone-numbers/view-phone-numbers/view-phone-number.component';
import { AddSalesTurnoverComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-sales-turnovers/add-client-sales-turnover/add-client-sales-turnover.component';
import { ViewSalesTurnoverComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-sales-turnovers/view-client-sales-turnovers/view-sales-turnover.component';
import { AddClientShareHoldersComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-share-holders/add-share-holder/add-share-holders.component';
import { ViewShareHoldersComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-share-holders/view-share-holders/view-share-holder.component';
import { AddClientTaxAuthorityOfficesComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-tax-authority-offices/add-tax-authority-office/add-tax-authority-office.component';
import { ViewTaxAuthorityOfficesComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-tax-authority-offices/view-tax-authority-offices/view-tax-authority-office.component';
import { AddClientTMLOfficersComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-tml-officers/add-tml-officer/add-tml-officer.component';
import { ViewTMLOfficersComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-tml-officers/view-tml-officers/view-tml-officer.component';
import { AddUploadDocumentsComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-upload-documents/add-upload-documents/add-upload-documents.component';
import { ViewUploadDocumentsComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-upload-documents/view-upload-documents/view-upload-documents.component';
import { ClientActivityWizardComponent } from './clients/components/client-activities/client-activity-wizard/client-activity-wizard.component';
import { AddClientOnboardingComponent } from './clients/components/clients/client-onboarding/add-client-onboarding/add-client-onboarding.component';
import { ViewClientsOnboardingComponent } from './clients/components/clients/client-onboarding/view-clients-onboarding/view-clients-onboarding.component';
import { AddClientComponent } from './clients/components/clients/company-individual/add-client/add-client.component';
import { ViewClientsComponent } from './clients/components/clients/company-individual/view-clients/view-clients.component';
import { LeasingFinancialFormCompoundComponent } from './leasing-mandates/components/mandate-activities/leasing-financial-form/leasing-financial-form-compound.component';
import { AddChildMandateComponent } from './leasing-mandates/components/mandate-activities/clone/add-child-mandate/add-child-mandate.component';
import { AddMandateComponent } from './leasing-mandates/components/leasing-mandates/add-mandate/add-mandate.component';
import { ViewMandatesComponent } from './leasing-mandates/components/leasing-mandates/view-mandates/view-mandates.component';
import { ViewGuarantorsComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-guarantors/view-client-guarantors/view-client-guarantor.component';
import { AddClientOfficersComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-officers/add-client-officer/add-client-officer.component';
import { ViewClientOfficersComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-officers/view-client-officers/view-client-officer.component';
import { AddClientLegalsComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-legals/add-client-legal/add-client-legal.component';
import { ViewClientLegalsComponent } from './clients/components/client-activities/client-activity-wizard/activities/client-legals/view-client-legal/view-client-legal.component';
import { AddMandateAdditionalTermsComponent } from './leasing-mandates/components/mandate-activities/mandate-additional-terms/add-mandate-additional-terms/add-mandate-additional-terms.component';
import { ViewMandateAdditionalTermsComponent } from './leasing-mandates/components/mandate-activities/mandate-additional-terms/view-mandate-additional-terms/view-mandate-additional-terms.component';
import { ViewChildMandatesComponent } from './leasing-mandates/components/mandate-activities/clone/view-child-mandates/view-child-mandates.component';
import { AddMandateFeeComponent } from './leasing-mandates/components/mandate-activities/mandate-fees/add-mandate-fee/add-mandate-fee.component';
import { ViewMandateFeesComponent } from './leasing-mandates/components/mandate-activities/mandate-fees/view-mandate-fees/view-mandate-fees.component';
import { PendingChangesGuard } from '../../shared/guards/pending-changes.guard';

const routes: Routes = [
  /*Clients , Client Onboarding Routing*/
  {
    path: 'clients/add-client-onboarding',
    component: AddClientOnboardingComponent,
  },
  {
    path: 'clients/edit-client-onboarding/:clientId',
    component: AddClientOnboardingComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'clients/view-clients-onboarding',
    component: ViewClientsOnboardingComponent,
  },
  {
    path: 'clients/add-client',
    component: AddClientComponent,
  },
  {
    path: 'clients/edit-client/:clientId',
    component: AddClientComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'clients/view-clients',
    component: ViewClientsComponent,
  },
  //Client Activities
  {
    path: 'clients/client-activity-wizard',
    component: ClientActivityWizardComponent,
  },
  {
    path: 'clients/client-activity-wizard/:clientId',
    component: ClientActivityWizardComponent,
  },

  /*Upload Documents*/
  {
    path: 'clients/add-upload-documents/:clientId',
    component: AddUploadDocumentsComponent,
  },
  {
    path: 'clients/edit-upload-documents/:clientId/:documentId',
    component: AddUploadDocumentsComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'clients/view-documents/:clientId/:documentId',
    component: AddUploadDocumentsComponent,
  },
  {
    path: 'clients/view-upload-documents/:clientId',
    component: ViewUploadDocumentsComponent,
  },
  //Client Addresses
  {
    path: 'clients/add-client-addresses',
    component: AddClientAddressesComponent,
  },
  {
    path: 'clients/add-client-addresses/:clientId',
    component: AddClientAddressesComponent,
  },
  {
    path: 'clients/edit-client-addresses/:id',
    component: AddClientAddressesComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'clients/view-client-addresses/:clientId',
    component: ViewClientAddressesComponent,
  },
  // Client Sales Turn Overs
  {
    path: 'clients/add-sales-turnover/:clientId',
    component: AddSalesTurnoverComponent,
  },

  {
    path: 'clients/edit-sales-turnover/:clientId',
    component: AddSalesTurnoverComponent,
    canDeactivate: [PendingChangesGuard],
  },

  {
    path: 'clients/view-sales-turnovers/:clientId',
    component: ViewSalesTurnoverComponent,
  },
  // Client Phone numbers
  {
    path: 'clients/add-phone-number/:clientId',
    component: AddPhoneNumberComponent,
  },

  {
    path: 'clients/edit-phone-number/:clientId',
    component: AddPhoneNumberComponent,
    canDeactivate: [PendingChangesGuard],
  },

  {
    path: 'clients/view-phone-numbers/:clientId',
    component: ViewPhoneNumberComponent,
  },

  // Client Identity
  {
    path: 'clients/add-client-identity/:clientId',
    component: AddClientIdentityComponent,
  },

  {
    path: 'clients/edit-client-Identity/:clientId',
    component: AddClientIdentityComponent,
    canDeactivate: [PendingChangesGuard],
  },

  {
    path: 'clients/view-client-identity/:clientId',
    component: ViewClientIdentityComponent,
  },

  //Client CR Authority offices
  {
    path: 'clients/add-client-cr-authority-offices',
    component: AddClientCRAuthorityOfficesComponent,
  },
  {
    path: 'clients/add-client-cr-authority-offices/:clientId',
    component: AddClientCRAuthorityOfficesComponent,
  },
  {
    path: 'clients/edit-client-cr-authority-offices/:id',
    component: AddClientCRAuthorityOfficesComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'clients/view-client-cr-authority-offices/:clientId',
    component: ViewCRAuthorityOfficesComponent,
  },
  //Client Tax Authority Offices
  {
    path: 'clients/add-client-tax-authority-offices',
    component: AddClientTaxAuthorityOfficesComponent,
  },
  {
    path: 'clients/add-client-tax-authority-offices/:clientId',
    component: AddClientTaxAuthorityOfficesComponent,
  },
  {
    path: 'clients/edit-client-tax-authority-offices/:id',
    component: AddClientTaxAuthorityOfficesComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'clients/view-client-tax-authority-offices/:clientId',
    component: ViewTaxAuthorityOfficesComponent,
  },
  //Client Central Bank Info
  {
    path: 'clients/add-client-central-bank-info',
    component: AddClientCentralBankInfoComponent,
  },
  {
    path: 'clients/add-client-central-bank-info/:clientId',
    component: AddClientCentralBankInfoComponent,
  },
  {
    path: 'clients/edit-client-central-bank-info/:id',
    component: AddClientCentralBankInfoComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'clients/view-client-central-bank-info/:clientId',
    component: ViewClientCentralBankInfoComponent,
  },
  //Client Share Holders
  {
    path: 'clients/add-client-share-holder',
    component: AddClientShareHoldersComponent,
  },
  {
    path: 'clients/add-client-share-holder/:id',
    component: AddClientShareHoldersComponent,
  },
  {
    path: 'clients/edit-client-share-holder/:id',
    component: AddClientShareHoldersComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'clients/view-client-share-holders/:clientId',
    component: ViewShareHoldersComponent,
  },
  //Client TML Officers
  {
    path: 'clients/add-client-tml-officers',
    component: AddClientTMLOfficersComponent,
  },
  {
    path: 'clients/add-client-tml-officers/:clientId',
    component: AddClientTMLOfficersComponent,
  },
  {
    path: 'clients/edit-client-tml-officers/:id',
    component: AddClientTMLOfficersComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'clients/view-client-tml-officers/:clientId',
    component: ViewTMLOfficersComponent,
  },
  //Client Officers
  {
    path: 'clients/add-client-officers',
    component: AddClientOfficersComponent,
  },
  {
    path: 'clients/add-client-officers/:clientId',
    component: AddClientOfficersComponent,
  },
  {
    path: 'clients/edit-client-officers/:id',
    component: AddClientOfficersComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'clients/view-client-officers/:clientId',
    component: ViewClientOfficersComponent,
  },
  //Client legal
  {
    path: 'clients/add-client-legals',
    component: AddClientLegalsComponent,
  },
  {
    path: 'clients/add-client-legals/:clientId',
    component: AddClientLegalsComponent,
  },
  {
    path: 'clients/edit-client-legals/:id',
    component: AddClientLegalsComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'clients/view-client-legals/:clientId',
    component: ViewClientLegalsComponent,
  },
  // Client Contact Persons
  {
    path: 'clients/add-contact-person/:clientId',
    component: AddContactPersonComponent,
  },

  {
    path: 'clients/edit-contact-person/:clientId',
    component: AddContactPersonComponent,
    canDeactivate: [PendingChangesGuard],
  },

  {
    path: 'clients/view-contact-persons/:clientId',
    component: ViewContactPersonComponent,
  },

  //Client Guarantors
  {
    path: 'clients/add-client-guarantor',
    component: AddClientGuarantorComponent,
  },
  {
    path: 'clients/edit-client-guarantor/:id',
    component: AddClientGuarantorComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'clients/view-client-guarantors/:clientId',
    component: ViewGuarantorsComponent,
  },
  //Client Identities
  {
    path: 'clients/add-client-identity',
    component: AddClientIdentityComponent,
  },
  {
    path: 'clients/edit-client-identity/:id',
    component: AddClientIdentityComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'clients/view-client-identities/:clientId',
    component: ViewClientIdentityComponent,
  },
  /*Leasing Mandates Routing*/
  {
    path: 'leasing-mandates/view-mandates',
    component: ViewMandatesComponent,
  },
  {
    path: 'leasing-mandates/add-mandate',
    component: AddMandateComponent,
  },
  {
    path: 'leasing-mandates/edit-mandate/:leasingId',
    component: AddMandateComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'leasing-mandates/view-mandates/:leasingId',
    component: AddMandateComponent,
  },
  //Mandate Activities
  //Clone
  {
    path: 'leasing-mandates/leasing-mandate-wizard/:leasingMandatesId',
    component: WizardComponent,
  },
  {
    path: 'leasing-mandates/add-child-mandate/:leasingId/:leasingMandatesId',
    component: AddChildMandateComponent,
  },
  {
    path: 'leasing-mandates/edit-child-mandate/:leasingId/:leasingMandatesId',
    component: AddChildMandateComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'leasing-mandates/view-child-mandates/:leasingId/:leasingMandatesId',
    component: ViewChildMandatesComponent,
  },
  // Manage Mandate Terms
  {
    path: 'leasing-mandates/add-mandate-additional-term/:leasingId/:leasingMandatesId',
    component: AddMandateAdditionalTermsComponent,
  },

  {
    path: 'leasing-mandates/edit-mandate-additional-term/:leasingId/:leasingMandatesId',
    component: AddMandateAdditionalTermsComponent,
    canDeactivate: [PendingChangesGuard],
  },

  {
    path: 'leasing-mandates/view-mandate-additional-terms/:leasingId/:leasingMandatesId',
    component: ViewMandateAdditionalTermsComponent,
  },
  // MandateFees
  {
    path: 'leasing-mandates/add-mandate-fee/:leasingId/:leasingMandatesId',
    component: AddMandateFeeComponent,
  },

  
  {
    path: 'leasing-mandates/edit-mandate-fee/:id/:leasingId/:leasingMandatesId',
    component: AddMandateFeeComponent,
    canDeactivate: [PendingChangesGuard],
  },


  {
    path: 'leasing-mandates/view-mandate-fees/:leasingId/:leasingMandatesId',
    component: ViewMandateFeesComponent,
  },
  //Leasing Financial Form
  {
    path: 'leasing-mandates/leasing-financial-form/:leasingId/:leasingMandatesId',
    component: LeasingFinancialFormCompoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrmRoutingModule {}
