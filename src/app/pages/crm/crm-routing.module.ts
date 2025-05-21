import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewContactPersonsComponent } from '../communication/view-contact-persons/view-contact-persons.component';
import { ViewOfficersComponent } from '../communication/view-officers/view-officers.component';
import { WizardComponent } from '../communication/wizard/wizard.component';
import { AddClientAddressesComponent } from './clients/components/client-activities/add-client-address/add-client-address.component';
import { AddClientCentralBankInfoComponent } from './clients/components/client-activities/add-central-bank-info/add-central-bank-info.component';
import { AddClientGuarantorComponent } from './clients/components/client-activities/add-client-guarantor/add-client-guarantor.component';
import { AddClientIdentityComponent } from './clients/components/client-activities/add-client-identity/add-client-identity.component';
import { AddSalesTurnoverComponent } from './clients/components/client-activities/add-client-sales-turnover/add-client-sales-turnover.component';
import { AddClientStatusesComponent } from './clients/components/client-activities/add-client-statuses/add-client-statuses.component';
import { AddContactPersonComponent } from './clients/components/client-activities/add-contact-person/add-contact-person.component';
import { AddPhoneNumberComponent } from './clients/components/client-activities/add-phone-number/add-phone-number.component';
import { AddClientShareHoldersComponent } from './clients/components/client-activities/add-share-holders/add-share-holders.component';
import { AddTmlOfficerComponent } from './clients/components/client-activities/add-tml-officer/add-tml-officer.component';
import { AddUploadDocumentsComponent } from './clients/components/client-activities/upload-documents/add-upload-documents/add-upload-documents.component';
import { ClientActivityWizardComponent } from './clients/components/client-activities/client-activity-wizard/client-activity-wizard.component';
import { ContactPersonViewTableDataComponent } from './clients/components/client-activities/contact-person-view-table-data/contact-person-view-table-data.component';
import { ViewClientCentralBankInfoComponent } from './clients/components/client-activities/view-central-bank-info/view-central-bank-info.component';
import { ViewClientGuarantorComponent } from './clients/components/client-activities/view-client-guarantor/view-client-guarantor.component';
import { ViewClientIdentityComponent } from './clients/components/client-activities/view-client-identity/view-client-identity.component';
import { ViewClientStatusComponent } from './clients/components/client-activities/view-client-status-actions/view-client-status.component';
import { ViewClientStatusesComponent } from './clients/components/client-activities/view-client-statuses/view-client-statuses.component';
import { ViewContactPersonComponent } from './clients/components/client-activities/view-contact-person/view-contact-person.component';
import { ViewPhoneNumberComponent } from './clients/components/client-activities/view-phone-number/view-phone-number.component';
import { ViewSalesTurnoverComponent } from './clients/components/client-activities/view-sales-turnover/view-sales-turnover.component';
import { ViewShareHoldersComponent } from './clients/components/client-activities/view-share-holder/view-share-holder.component';
import { ViewTmlOfficerComponent } from './clients/components/client-activities/view-tml-officer/view-tml-officer.component';
import { ViewUploadDocumentsComponent } from './clients/components/client-activities/upload-documents/view-upload-documents/view-upload-documents.component';
import { WizardClientStatusComponent } from './clients/components/client-activities/wizard-client-status/wizard-client-status.component';
import { AddClientComponent } from './clients/components/clients/company-individual/add-client/add-client.component';
import { ViewClientsComponent } from './clients/components/clients/company-individual/view-clients/view-clients.component';
import { CompanyViewOnlyComponent } from './clients/components/clients/company-view-only/company-view-only.component';
import { ViewClientAddressesComponent } from './clients/components/client-activities/view-client-address/view-client-address.component';
import { LeasingFinancialFormCompoundComponent } from './leasing-mandates/components/leasing-financial-form-compound/leasing-financial-form-compound.component';
import { LeasingFinancialFormComponent } from './leasing-mandates/components/leasing-financial-form/leasing-financial-form.component';
import { AddChildMandateComponent } from './leasing-mandates/components/mandate-activities/add-child-mandate/add-child-mandate.component';
import { AddManageMandateTermsComponent } from './leasing-mandates/components/mandate-activities/add-manage-mandate-terms/add-manage-mandate-terms.component';
import { ViewAssetTypeComponent } from './leasing-mandates/components/mandate-activities/view-asset-type/view-asset-type.component';
import { ViewCalculationsComponent } from './leasing-mandates/components/mandate-activities/view-calculations/view-calculations.component';
import { ViewManageMandateTermsComponent } from './leasing-mandates/components/mandate-activities/view-manage-mandate-terms/view-manage-mandate-terms.component';
import { AddMandateComponent } from './leasing-mandates/components/mandate/add-mandate/add-mandate.component';
import { ViewMandateComponent } from './leasing-mandates/components/mandate/view-mandate/view-mandate.component';
import { ViewCRAuthorityOfficesComponent } from './clients/components/client-activities/view-cr-authority-office/view-cr-authority-office.component';
import { AddClientCRAuthorityOfficesComponent } from './clients/components/client-activities/add-cr-authority-office/add-cr-authority-office.component';
import { ViewTaxAuthorityOfficesComponent } from './clients/components/client-activities/view-tax-authority-office/view-tax-authority-office.component';
import { AddClientTaxAuthorityOfficesComponent } from './clients/components/client-activities/add-tax-authority-office/add-tax-authority-office.component';
import { AddClientOnboardingComponent } from './clients/components/clients/client-onboarding/add-client-onboarding/add-client-onboarding.component';
import { ViewClientsOnboardingComponent } from './clients/components/clients/client-onboarding/view-clients-onboarding/view-clients-onboarding.component';

const routes: Routes = [
  /*Clients , Client Onboarding Routing*/
  {
    path: 'clients/add-client-onboarding',
    component: AddClientOnboardingComponent,
  },
  {
    path: 'clients/edit-client-onboarding/:clientId',
    component: AddClientOnboardingComponent,
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
  },
  {
    path: 'clients/view-clients',
    component: ViewClientsComponent,
  },
  //Client Activities
  /*Upload Documents*/
  {
    path: 'clients/add-upload-documents/:clientId',
    component: AddUploadDocumentsComponent,
  },
  {
    path: 'clients/edit-upload-documents/:clientId/:documentId',
    component: AddUploadDocumentsComponent,
  },
  {
    path: 'clients/view-documents/:clientId/:documentId',
    component: AddUploadDocumentsComponent,
  },
  {
    path: 'clients/view-upload-documents/:clientId',
    component: ViewUploadDocumentsComponent,
  },
  //----
  {
    path: 'clients/add-client-guarantor',
    component: AddClientGuarantorComponent,
  },
  {
    path: 'clients/add-client-identity',
    component: AddClientIdentityComponent,
  },
  {
    path: 'clients/company-view-only',
    component: CompanyViewOnlyComponent,
  },

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
  },
  {
    path: 'clients/add-contact-person',
    component: AddContactPersonComponent,
  },
  {
    path: 'clients/contact-person-view-table-data',
    component: ContactPersonViewTableDataComponent,
  },
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
  },
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
  },
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
  },
  {
    path: 'clients/add-client-share-holders',
    component: AddClientShareHoldersComponent,
  },
  {
    path: 'clients/add-client-share-holders/:id',
    component: AddClientShareHoldersComponent,
  },
  {
    path: 'clients/edit-client-share-holders/:id',
    component: AddClientShareHoldersComponent,
  },
  {
    path: 'clients/add-tml-officer',
    component: AddTmlOfficerComponent,
  },

  {
    path: 'clients/view-client-guarantor',
    component: ViewClientGuarantorComponent,
  },
  {
    path: 'clients/view-client-identity',
    component: ViewClientIdentityComponent,
  },

  {
    path: 'clients/view-client-addresses/:clientId',
    component: ViewClientAddressesComponent,
  },

  // Client Sales Over
  {
    path: 'clients/add-sales-turnover/:clientId',
    component: AddSalesTurnoverComponent,
  },

  {
    path: 'clients/edit-sales-turnover/:clientId',
    component: AddSalesTurnoverComponent,
  },

  {
    path: 'clients/view-sales-turnover/:clientId',
    component: ViewSalesTurnoverComponent,
  },

  // Client Phone number
  {
    path: 'clients/add-phone-number/:clientId',
    component: AddPhoneNumberComponent,
  },

  {
    path: 'clients/edit-phone-number/:clientId',
    component: AddPhoneNumberComponent,
  },

  {
    path: 'clients/view-phone-number/:clientId',
    component: ViewPhoneNumberComponent,
  },

  {
    path: 'clients/view-contact-person',
    component: ViewContactPersonComponent,
  },
  {
    path: 'clients/view-client-cr-authority-offices/:clientId',
    component: ViewCRAuthorityOfficesComponent,
  },
  {
    path: 'clients/view-client-tax-authority-offices/:clientId',
    component: ViewTaxAuthorityOfficesComponent,
  },
  {
    path: 'clients/view-client-central-bank-info/:clientId',
    component: ViewClientCentralBankInfoComponent,
  },
  {
    path: 'clients/view-client-share-holders/:clientId',
    component: ViewShareHoldersComponent,
  },
  {
    path: 'clients/view-tml-officer',
    component: ViewTmlOfficerComponent,
  },
  {
    path: 'clients/client-activity-wizard',
    component: ClientActivityWizardComponent,
  },
  {
    path: 'clients/client-activity-wizard/:clientId',
    component: ClientActivityWizardComponent,
  },

  /*Leasing Mandates Routing*/
  {
    path: 'leasing-mandates/add-mandate',
    component: AddMandateComponent,
  },
  {
    path: 'leasing-mandates/add-child-mandate',
    component: AddChildMandateComponent,
  },
  {
    path: 'leasing-mandates/add-manage-mandate-terms',
    component: AddManageMandateTermsComponent,
  },
  {
    path: 'leasing-mandates/leasing-financial-form',
    component: LeasingFinancialFormComponent,
  },
  {
    path: 'leasing-mandates/view-mandate',
    component: ViewMandateComponent,
  },
  {
    path: 'leasing-mandates/view-officers',
    component: ViewOfficersComponent,
  },
  {
    path: 'leasing-mandates/view-contact-persons',
    component: ViewContactPersonsComponent,
  },
  {
    path: 'leasing-mandates/view-asset-type',
    component: ViewAssetTypeComponent,
  },
  {
    path: 'leasing-mandates/wizard',
    component: WizardComponent,
  },
  {
    path: 'leasing-mandates/view-calculations',
    component: ViewCalculationsComponent,
  },
  {
    path: 'leasing-mandates/view-manage-mandate-terms',
    component: ViewManageMandateTermsComponent,
  },
  {
    path: 'leasing-mandates/leasing-financial-form-compound',
    component: LeasingFinancialFormCompoundComponent,
  },
  //Client Statuses
  {
    path: 'add-client-statuses',
    component: AddClientStatusesComponent,
  },
  {
    path: 'view-client-status-actions/:clientStatusId',
    component: ViewClientStatusComponent,
  },
  {
    path: 'edit-client-statuses/:id',
    component: AddClientStatusesComponent,
  },
  {
    path: 'view-client-statuses',
    component: ViewClientStatusesComponent,
  },
  {
    path: 'wizard-client-status/:clientStatusId',
    component: WizardClientStatusComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrmRoutingModule {}
