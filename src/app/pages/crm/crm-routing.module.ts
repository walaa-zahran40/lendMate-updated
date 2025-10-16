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
import { PendingChangesGuard } from '../../shared/guards/pending-changes.guard';
import { ViewMandateWorkFlowHistoryComponent } from './leasing-mandates/components/mandate-activities/view-mandate-workflow-history/view-mandate-work-flow-history.component';
import { AddMandateOfficerComponent } from './leasing-mandates/components/mandate-activities/mandate-officers/add-mandate-officer/add-mandate-officer.component';
import { ViewMandateOfficersComponent } from './leasing-mandates/components/mandate-activities/mandate-officers/view-mandate-officers/view-mandate-officers.component';
import { AddMandateContactPersonComponent } from './leasing-mandates/components/mandate-activities/mandate-contact-persons/add-mandate-contact-person/add-mandate-contact-person.component';
import { ViewMandateContactPersonsComponent } from './leasing-mandates/components/mandate-activities/mandate-contact-persons/view-mandate-contact-persons/view-mandate-contact-persons.component';
import {
  AllLookupsResolver,
  MandatesListResolver,
  ClientPresenceFlagResolver,
  AllLookupsExceptClientsResolver,
  MandatesByClientResolver,
  MandateDetailResolver,
  FinancialFormByMandateResolver,
} from './leasing-mandates/resolvers';
import { clientActivityWizardResolver } from './clients/resolvers/client-activity-wizard.resolver';
import { clientAddressBundleResolver } from './clients/resolvers/client-address-bundle.resolver';
import { clientAddressesListResolver } from './clients/resolvers/client-addresses-list.resolver';
import { ClientCentralBankInfoBundleResolver } from './clients/resolvers/client-central-bank-info-bundle.resolver';
import { ClientCentralBankInfoListResolver } from './clients/resolvers/client-central-bank-info-list.resolver';
import { ClientCRAuthorityOfficeBundleResolver } from './clients/resolvers/client-cr-authority-office-bundle.resolver';
import { ClientCRAuthorityOfficesListResolver } from './clients/resolvers/client-cr-authority-offices-list.resolver';
import { clientGuarantorResolver } from './clients/resolvers/client-guarantor.resolver';
import { clientGuarantorsByClientResolver } from './clients/resolvers/client-guarantors-by-client.resolver';
import { ClientIdentitiesListResolver } from './clients/resolvers/client-identities-list.resolver';
import { ClientIdentityBundleResolver } from './clients/resolvers/client-identity-bundle.resolver';
import { ClientLegalsBundleResolver } from './clients/resolvers/client-legals-bundle.resolver';
import { ClientLegalsListResolver } from './clients/resolvers/client-legals-list.resolver';
import { ClientOfficersBundleResolver } from './clients/resolvers/client-officers-bundle.resolver';
import { ClientOfficersListResolver } from './clients/resolvers/client-officers-list.resolver';
import { clientOnboardingResolver } from './clients/resolvers/client-onboarding.resolver';
import { clientPhoneNumberBundleResolver } from './clients/resolvers/client-phone-number-bundle.resolver';
import { clientPhoneNumbersListResolver } from './clients/resolvers/client-phone-numbers-list.resolver';
import { clientSalesTurnoverBundleResolver } from './clients/resolvers/client-sales-turnover-bundle.resolver';
import { clientSalesTurnoverListResolver } from './clients/resolvers/client-sales-turnovers-list.resolver';
import { ClientShareHoldersBundleResolver } from './clients/resolvers/client-share-holders-bundle.resolver';
import { ClientShareHoldersListResolver } from './clients/resolvers/client-share-holders-list.resolver';
import { ClientTaxOfficeBundleResolver } from './clients/resolvers/client-tax-office-bundle.resolver';
import { ClientTaxOfficesListResolver } from './clients/resolvers/client-tax-offices-list.resolver';
import { ClientTMLOfficersBundleResolver } from './clients/resolvers/client-tml-officers-bundle.resolver';
import { ClientTMLOfficersListResolver } from './clients/resolvers/client-tml-officers-list.resolver';
import { clientResolver } from './clients/resolvers/client.resolver';
import { clientsLookupResolver } from './clients/resolvers/clients-lookup.resolver';
import { ContactPersonsBundleResolver } from './clients/resolvers/contact-persons-bundle.resolver';
import { ContactPersonsListResolver } from './clients/resolvers/contact-persons-list.resolver';
import { docTypesResolver } from './clients/resolvers/doc-types.resolver';
import { individualOnboardingResolver } from './clients/resolvers/individual-onboarding.resolver';
import { individualResolver } from './clients/resolvers/individual.resolver';
import { uploadDocumentResolver } from './clients/resolvers/upload-document.resolver';

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
    resolve: {
      clientOnboarding: clientOnboardingResolver, // for Company
      individualOnboarding: individualOnboardingResolver, // for Individual
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
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
    resolve: {
      client: clientResolver, // for Company
      individual: individualResolver, // for Individual
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
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
    resolve: { wizard: clientActivityWizardResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  /*Upload Documents*/
  {
    path: 'clients/add-upload-documents/:clientId',
    component: AddUploadDocumentsComponent,
    resolve: { data: uploadDocumentResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'clients/edit-upload-documents/:clientId/:documentId',
    component: AddUploadDocumentsComponent,
    canDeactivate: [PendingChangesGuard],
    resolve: { data: uploadDocumentResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'clients/view-documents/:clientId/:documentId',
    component: AddUploadDocumentsComponent,
    resolve: { data: uploadDocumentResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'clients/view-upload-documents/:clientId',
    component: ViewUploadDocumentsComponent,
    resolve: { docTypes: docTypesResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  //Client Addresses

  {
    path: 'clients/add-client-addresses/:clientId',
    component: AddClientAddressesComponent,
    resolve: { bundle: clientAddressBundleResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'clients/edit-client-addresses/:id',
    component: AddClientAddressesComponent,
    canDeactivate: [PendingChangesGuard],
    resolve: { bundle: clientAddressBundleResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'clients/view-client-addresses/:clientId',
    component: ViewClientAddressesComponent,
    resolve: { list: clientAddressesListResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  // Client Sales Turn Overs
  // ✅ final routes
  {
    path: 'clients/add-sales-turnover/:clientId',
    component: AddSalesTurnoverComponent,
    resolve: { bundle: clientSalesTurnoverBundleResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'clients/edit-sales-turnover/:id', // <-- changed to :id
    component: AddSalesTurnoverComponent,
    canDeactivate: [PendingChangesGuard],
    resolve: { bundle: clientSalesTurnoverBundleResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'clients/view-sales-turnovers/:clientId',
    component: ViewSalesTurnoverComponent,
    resolve: { list: clientSalesTurnoverListResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },

  // Client Phone numbers
  {
    path: 'clients/view-phone-numbers/:clientId',
    component: ViewPhoneNumberComponent,
    resolve: { list: clientPhoneNumbersListResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'clients/add-phone-number/:clientId',
    component: AddPhoneNumberComponent,
    resolve: { bundle: clientPhoneNumberBundleResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'clients/edit-phone-number/:clientId', // param is RECORD id
    component: AddPhoneNumberComponent,
    canDeactivate: [PendingChangesGuard],
    resolve: { bundle: clientPhoneNumberBundleResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },

  // Client Identity
  {
    path: 'clients/add-client-identity/:clientId',
    component: AddClientIdentityComponent,
    resolve: { bundle: ClientIdentityBundleResolver },
  },
  {
    path: 'clients/edit-client-identity/:id', // 👈 use :id here
    component: AddClientIdentityComponent,
    canDeactivate: [PendingChangesGuard],
    resolve: { bundle: ClientIdentityBundleResolver },
  },
  {
    path: 'clients/view-client-identity/:clientId',
    component: ViewClientIdentityComponent,
    resolve: { list: ClientIdentitiesListResolver },
  },
  //Client CR Authority offices
  {
    path: 'clients/add-client-cr-authority-offices',
    component: AddClientCRAuthorityOfficesComponent,
    resolve: { bundle: ClientCRAuthorityOfficeBundleResolver },
  },
  {
    path: 'clients/add-client-cr-authority-offices/:clientId',
    component: AddClientCRAuthorityOfficesComponent,
    resolve: { bundle: ClientCRAuthorityOfficeBundleResolver },
  },
  {
    path: 'clients/edit-client-cr-authority-offices/:id',
    component: AddClientCRAuthorityOfficesComponent,
    canDeactivate: [PendingChangesGuard],
    resolve: { bundle: ClientCRAuthorityOfficeBundleResolver },
  },
  {
    path: 'clients/view-client-cr-authority-offices/:clientId',
    component: ViewCRAuthorityOfficesComponent,
    resolve: { list: ClientCRAuthorityOfficesListResolver },
  },

  //Client Tax Authority Offices
  {
    path: 'clients/add-client-tax-authority-offices',
    component: AddClientTaxAuthorityOfficesComponent,
    resolve: { bundle: ClientTaxOfficeBundleResolver },
  },
  {
    path: 'clients/add-client-tax-authority-offices/:clientId',
    component: AddClientTaxAuthorityOfficesComponent,
    resolve: { bundle: ClientTaxOfficeBundleResolver },
  },
  {
    path: 'clients/edit-client-tax-authority-offices/:id',
    component: AddClientTaxAuthorityOfficesComponent,
    canDeactivate: [PendingChangesGuard],
    resolve: { bundle: ClientTaxOfficeBundleResolver },
  },
  {
    path: 'clients/view-client-tax-authority-offices/:clientId',
    component: ViewTaxAuthorityOfficesComponent,
    resolve: { list: ClientTaxOfficesListResolver },
  },

  //Client Central Bank Info
  {
    path: 'clients/add-client-central-bank-info',
    component: AddClientCentralBankInfoComponent,
    resolve: { bundle: ClientCentralBankInfoBundleResolver },
  },
  {
    path: 'clients/add-client-central-bank-info/:clientId',
    component: AddClientCentralBankInfoComponent,
    resolve: { bundle: ClientCentralBankInfoBundleResolver },
  },
  {
    path: 'clients/edit-client-central-bank-info/:id',
    component: AddClientCentralBankInfoComponent,
    canDeactivate: [PendingChangesGuard],
    resolve: { bundle: ClientCentralBankInfoBundleResolver },
  },
  {
    path: 'clients/view-client-central-bank-info/:clientId',
    component: ViewClientCentralBankInfoComponent,
    resolve: { list: ClientCentralBankInfoListResolver },
  },

  //Client Share Holders
  {
    path: 'clients/view-client-share-holders/:clientId',
    component: ViewShareHoldersComponent,
    resolve: { list: ClientShareHoldersListResolver },
  },
  {
    path: 'clients/add-client-share-holder',
    component: AddClientShareHoldersComponent,
    resolve: { bundle: ClientShareHoldersBundleResolver },
  },
  {
    path: 'clients/add-client-share-holder/:id',
    component: AddClientShareHoldersComponent,
    resolve: { bundle: ClientShareHoldersBundleResolver },
  },
  {
    path: 'clients/edit-client-share-holder/:id',
    component: AddClientShareHoldersComponent,
    canDeactivate: [PendingChangesGuard],
    resolve: { bundle: ClientShareHoldersBundleResolver },
  },

  //Client TML Officers
  {
    path: 'clients/view-client-tml-officers/:clientId',
    component: ViewTMLOfficersComponent,
    resolve: { list: ClientTMLOfficersListResolver },
  },
  {
    path: 'clients/add-client-tml-officers',
    component: AddClientTMLOfficersComponent,
    resolve: { bundle: ClientTMLOfficersBundleResolver },
  },
  {
    path: 'clients/add-client-tml-officers/:clientId',
    component: AddClientTMLOfficersComponent,
    resolve: { bundle: ClientTMLOfficersBundleResolver },
  },
  {
    path: 'clients/edit-client-tml-officers/:id',
    component: AddClientTMLOfficersComponent,
    canDeactivate: [PendingChangesGuard],
    resolve: { bundle: ClientTMLOfficersBundleResolver },
  },

  //Client Officers
  {
    path: 'clients/view-client-officers/:clientId',
    component: ViewClientOfficersComponent,
    resolve: { list: ClientOfficersListResolver },
  },
  {
    path: 'clients/add-client-officers',
    component: AddClientOfficersComponent,
    resolve: { bundle: ClientOfficersBundleResolver },
  },
  {
    path: 'clients/add-client-officers/:clientId',
    component: AddClientOfficersComponent,
    resolve: { bundle: ClientOfficersBundleResolver },
  },
  {
    path: 'clients/edit-client-officers/:id',
    component: AddClientOfficersComponent,
    canDeactivate: [PendingChangesGuard],
    resolve: { bundle: ClientOfficersBundleResolver },
  },

  //Client legal
  {
    path: 'clients/view-client-legals/:clientId',
    component: ViewClientLegalsComponent,
    resolve: { list: ClientLegalsListResolver },
  },
  {
    path: 'clients/add-client-legals',
    component: AddClientLegalsComponent,
    resolve: { bundle: ClientLegalsBundleResolver },
  },
  {
    path: 'clients/add-client-legals/:clientId',
    component: AddClientLegalsComponent,
    resolve: { bundle: ClientLegalsBundleResolver },
  },
  {
    path: 'clients/edit-client-legals/:id',
    component: AddClientLegalsComponent,
    canDeactivate: [PendingChangesGuard],
    resolve: { bundle: ClientLegalsBundleResolver },
  },

  // Client Contact Persons
  {
    path: 'clients/view-contact-persons/:clientId',
    component: ViewContactPersonComponent,
    resolve: { list: ContactPersonsListResolver },
  },
  {
    path: 'clients/add-contact-person/:clientId',
    component: AddContactPersonComponent,
    canDeactivate: [PendingChangesGuard],
    resolve: { bundle: ContactPersonsBundleResolver },
  },
  {
    // NOTE: this route uses ":clientId" as the *record id* in your code
    path: 'clients/edit-contact-person/:clientId',
    component: AddContactPersonComponent,
    canDeactivate: [PendingChangesGuard],
    resolve: { bundle: ContactPersonsBundleResolver },
  },

  //Client Guarantors
  {
    path: 'clients/add-client-guarantor',
    component: AddClientGuarantorComponent,
    resolve: { clients: clientsLookupResolver },
  },
  {
    path: 'clients/edit-client-guarantor/:id',
    component: AddClientGuarantorComponent,
    resolve: {
      clients: clientsLookupResolver,
      guarantor: clientGuarantorResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'clients/view-client-guarantors/:clientId',
    component: ViewGuarantorsComponent,
    resolve: {
      clients: clientsLookupResolver,
      guarantors: clientGuarantorsByClientResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  //=====================================\\
  /*Leasing Mandates Routing*/
  // View list (no client context)
  {
    path: 'leasing-mandates/view-mandates',
    component: ViewMandatesComponent,
    resolve: {
      // preload everything needed for table filters/labels
      lookups: AllLookupsResolver,
      // make sure the table data exists
      mandates: MandatesListResolver,
      // helper flag for client select visibility in child nav actions
      flags: ClientPresenceFlagResolver,
    },
  },

  // View list for a specific client
  {
    path: 'leasing-mandates/view-mandates/:clientId',
    component: ViewMandatesComponent,
    resolve: {
      // same lookups, but we don’t need clients list in this route
      lookups: AllLookupsExceptClientsResolver,
      mandates: MandatesByClientResolver,
      flags: ClientPresenceFlagResolver,
    },
  },

  // (optional) View list but with a focused row (e.g., deep-link)
  {
    path: 'leasing-mandates/view-mandates/:clientId/:leasingId',
    component: ViewMandatesComponent,
    resolve: {
      lookups: AllLookupsExceptClientsResolver,
      mandates: MandatesByClientResolver,
      mandate: MandateDetailResolver,
      flags: ClientPresenceFlagResolver,
    },
  },

  // Create (no client in route → show client selector)
  {
    path: 'leasing-mandates/add-mandate',
    component: AddMandateComponent,
    resolve: {
      lookups: AllLookupsResolver, // includes clients list
      flags: ClientPresenceFlagResolver, // { hasClientInRoute:false }
    },
  },

  // Create under client (client fixed → hide client selector)
  {
    path: 'leasing-mandates/add-mandate/:clientId',
    component: AddMandateComponent,
    resolve: {
      lookups: AllLookupsExceptClientsResolver, // client is fixed by route
      flags: ClientPresenceFlagResolver, // { hasClientInRoute:true, clientId }
    },
  },

  // Edit (no client in route)
  {
    path: 'leasing-mandates/edit-mandate/:leasingId',
    component: AddMandateComponent,
    canDeactivate: [PendingChangesGuard],
    resolve: {
      lookups: AllLookupsResolver, // safe to include clients list
      mandate: MandateDetailResolver, // mandate body
      financialForm: FinancialFormByMandateResolver, // step 4 payments
      flags: ClientPresenceFlagResolver,
    },
  },

  // Edit under client (client fixed by route)
  {
    path: 'leasing-mandates/edit-mandate/:leasingId/:clientId',
    component: AddMandateComponent,
    canDeactivate: [PendingChangesGuard],
    resolve: {
      lookups: AllLookupsExceptClientsResolver, // no client dropdown needed
      mandate: MandateDetailResolver,
      financialForm: FinancialFormByMandateResolver,
      flags: ClientPresenceFlagResolver, // { hasClientInRoute:true, clientId }
    },
  },

  //Mandate Activities
  //Clone
  {
    path: 'leasing-mandates/leasing-mandate-wizard/:leasingMandatesId',
    component: WizardComponent,
  },
  {
    path: 'leasing-mandates/leasing-mandate-wizard/:leasingMandatesId/:clientId',
    component: WizardComponent,
  },
  {
    path: 'leasing-mandates/add-child-mandate/:leasingId/:leasingMandatesId',
    component: AddChildMandateComponent,
  },
  {
    path: 'leasing-mandates/add-child-mandate/:leasingId/:leasingMandatesId/:clientId',
    component: AddChildMandateComponent,
  },
  {
    path: 'leasing-mandates/edit-child-mandate/:leasingId/:leasingMandatesId',
    component: AddChildMandateComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'leasing-mandates/edit-child-mandate/:leasingId/:leasingMandatesId/:clientId',
    component: AddChildMandateComponent,
    canDeactivate: [PendingChangesGuard],
  },

  // Manage Mandate Terms
  {
    path: 'leasing-mandates/add-mandate-additional-term/:leasingId/:leasingMandatesId',
    component: AddMandateAdditionalTermsComponent,
  },
  {
    path: 'leasing-mandates/add-mandate-additional-term/:leasingId/:leasingMandatesId/:clientId',
    component: AddMandateAdditionalTermsComponent,
  },

  {
    path: 'leasing-mandates/edit-mandate-additional-term/:leasingId/:leasingMandatesId',
    component: AddMandateAdditionalTermsComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'leasing-mandates/edit-mandate-additional-term/:leasingId/:leasingMandatesId/:clientId',
    component: AddMandateAdditionalTermsComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'leasing-mandates/view-mandate-additional-terms/:leasingId/:leasingMandatesId',
    component: ViewMandateAdditionalTermsComponent,
  },
  {
    path: 'leasing-mandates/view-mandate-additional-terms/:leasingId/:leasingMandatesId/:clientId',
    component: ViewMandateAdditionalTermsComponent,
  },
  // Manage Officers (new, consistent)
  {
    path: 'leasing-mandates/mandate-officers/add/:leasingId/:leasingMandatesId',
    component: AddMandateOfficerComponent,
  },
  {
    path: 'leasing-mandates/mandate-officers/edit/:leasingId/:leasingMandatesId/:mandateOfficerId',
    component: AddMandateOfficerComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'leasing-mandates/mandate-officers/view/:leasingId/:leasingMandatesId/:mandateOfficerId',
    component: AddMandateOfficerComponent,
  },

  // Officers list for a mandate (keep)
  {
    path: 'leasing-mandates/view-mandate-officers/:leasingId/:leasingMandatesId',
    component: ViewMandateOfficersComponent,
  },
  // ------------------------------
  // Backward-compat (optional)
  // ------------------------------

  // OLD add routes → point to Add component
  {
    path: 'leasing-mandates/add-mandate-officer/:leasingId/:leasingMandatesId',
    component: AddMandateOfficerComponent,
  },
  {
    path: 'leasing-mandates/add-mandate-officer/:leasingId/:leasingMandatesId/:mandateOfficerId',
    component: AddMandateOfficerComponent,
  },

  // OLD edit routes → point to Add component with guard
  {
    path: 'leasing-mandates/edit-mandate-officer/:leasingId/:leasingMandatesId',
    component: AddMandateOfficerComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'leasing-mandates/edit-mandate-officer/:leasingId/:leasingMandatesId/:mandateOfficerId',
    component: AddMandateOfficerComponent,
    canDeactivate: [PendingChangesGuard],
  },

  // OLD list routes (kept)
  {
    path: 'leasing-mandates/view-mandate-officers/:leasingId/:leasingMandatesId/:mandateOfficerId',
    component: ViewMandateOfficersComponent, // if you ever need deep-link to highlight one
  },
  // Mandate Contact Persons
  {
    path: 'leasing-mandates/mandate-contact-persons/add/:leasingId/:leasingMandatesId',
    component: AddMandateContactPersonComponent,
  },
  {
    path: 'leasing-mandates/mandate-contact-persons/edit/:leasingId/:leasingMandatesId/:mandateContactPersonId',
    component: AddMandateContactPersonComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'leasing-mandates/mandate-contact-persons/view/:leasingId/:leasingMandatesId/:mandateContactPersonId',
    component: AddMandateContactPersonComponent,
  },

  // Contact-persons list for a mandate (keep)
  {
    path: 'leasing-mandates/view-mandate-contact-persons/:leasingId/:leasingMandatesId',
    component: ViewMandateContactPersonsComponent,
  },
  // ------------------------------
  // Backward-compat (optional)
  // ------------------------------

  // OLD add routes → point to Add component
  {
    path: 'leasing-mandates/add-mandate-contact-person/:leasingId/:leasingMandatesId',
    component: AddMandateContactPersonComponent,
  },
  {
    path: 'leasing-mandates/add-mandate-contact-person/:leasingId/:leasingMandatesId/:mandateContactPersonId',
    component: AddMandateContactPersonComponent,
  },

  // OLD edit routes → point to Add component with guard
  {
    path: 'leasing-mandates/edit-mandate-contact-person/:leasingId/:leasingMandatesId',
    component: AddMandateContactPersonComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'leasing-mandates/edit-mandate-contact-person/:leasingId/:leasingMandatesId/:mandateContactPersonId',
    component: AddMandateContactPersonComponent,
    canDeactivate: [PendingChangesGuard],
  },

  // OLD list routes (kept)
  {
    path: 'leasing-mandates/view-mandate-contact-persons/:leasingId/:leasingMandatesId/:mandateContactPersonId',
    component: ViewMandateContactPersonsComponent, // if you ever need deep-link to highlight one
  },
  //Leasing Financial Form
  {
    path: 'leasing-mandates/leasing-financial-form/:leasingId/:leasingMandatesId',
    component: LeasingFinancialFormCompoundComponent,
  },
  {
    path: 'leasing-mandates/leasing-financial-form/:leasingId/:leasingMandatesId/:clientId',
    component: LeasingFinancialFormCompoundComponent,
  },
  //Work flow history
  {
    path: 'leasing-mandates/view-mandate-work-flow-history/:leasingId/:leasingMandatesId',
    component: ViewMandateWorkFlowHistoryComponent,
  },
  {
    path: 'leasing-mandates/view-mandate-work-flow-history/:leasingId/:leasingMandatesId/:clientId',
    component: ViewMandateWorkFlowHistoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrmRoutingModule {}
