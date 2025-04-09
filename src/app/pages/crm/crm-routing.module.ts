import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientOnboardingComponent } from './clients/client-onboarding/client-onboarding.component';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { CompanyViewOnlyComponent } from './clients/company-view-only/company-view-only.component';
import { UploadDocumentsComponent } from './clients/upload-documents/upload-documents.component';
import { AddAddressComponent } from './clients/add-address/add-address.component';
import { AddSalesTurnoverComponent } from './clients/add-sales-turnover/add-sales-turnover.component';
import { AddPhoneNumberComponent } from './clients/add-phone-number/add-phone-number.component';
import { AddContactPersonComponent } from './clients/add-contact-person/add-contact-person.component';
import { ContactPersonViewTableDataComponent } from './clients/contact-person-view-table-data/contact-person-view-table-data.component';
import { AddCrAuthorityOfficeComponent } from './clients/add-cr-authority-office/add-cr-authority-office.component';
import { AddTaxAuthorityOfficeComponent } from './clients/add-tax-authority-office/add-tax-authority-office.component';
import { AddCentralBankInfoComponent } from './clients/add-central-bank-info/add-central-bank-info.component';
import { AddShareHoldersComponent } from './clients/add-share-holders/add-share-holders.component';
import { AddTmlOfficerComponent } from './clients/add-tml-officer/add-tml-officer.component';
import { AddMandateComponent } from './leasing-mandates/add-mandate/add-mandate.component';
import { AddChildMandateComponent } from './leasing-mandates/add-child-mandate/add-child-mandate.component';
import { AddManageMandateTermsComponent } from './leasing-mandates/add-manage-mandate-terms/add-manage-mandate-terms.component';
import { LeasingFinancialFormComponent } from './leasing-mandates/leasing-financial-form/leasing-financial-form.component';
import { ViewClientsComponent } from './clients/view-clients/view-clients.component';
import { ViewUploadDocumentsComponent } from './clients/view-upload-documents/view-upload-documents.component';
import { ViewAddressComponent } from './clients/view-address/view-address.component';
import { ViewSalesTurnoverComponent } from './clients/view-sales-turnover/view-sales-turnover.component';
import { ViewPhoneNumberComponent } from './clients/view-phone-number/view-phone-number.component';
import { ViewContactPersonComponent } from './clients/view-contact-person/view-contact-person.component';
import { ViewCrAuthorityOfficeComponent } from './clients/view-cr-authority-office/view-cr-authority-office.component';
import { ViewTaxAuthorityOfficeComponent } from './clients/view-tax-authority-office/view-tax-authority-office.component';
import { ViewCentralBankInfoComponent } from './clients/view-central-bank-info/view-central-bank-info.component';
import { ViewShareHolderComponent } from './clients/view-share-holder/view-share-holder.component';
import { ViewTmlOfficerComponent } from './clients/view-tml-officer/view-tml-officer.component';
import { ClientActivityWizardComponent } from './clients/client-activity-wizard/client-activity-wizard.component';
import { ViewMandateComponent } from './leasing-mandates/view-mandate/view-mandate.component';
import { ViewOfficersComponent } from './leasing-mandates/view-officers/view-officers.component';
import { ViewContactPersonsComponent } from './leasing-mandates/view-contact-persons/view-contact-persons.component';
import { ViewAssestTypeComponent } from './leasing-mandates/view-assest-type/view-assest-type.component';
import { WizardComponent } from './leasing-mandates/wizard/wizard.component';
import { ViewCalculationsComponent } from './leasing-mandates/view-calculations/view-calculations.component';
import { ViewManageMandateTermsComponent } from './leasing-mandates/view-manage-mandate-terms/view-manage-mandate-terms.component';
import { LeasingFinancialFormCompoundComponent } from './leasing-mandates/leasing-financial-form-compound/leasing-financial-form-compound.component';
import { ViewClientGuarantorComponent } from './clients/view-client-guarantor/view-client-guarantor.component';
import { AddClientGuarantorComponent } from './clients/add-client-guarantor/add-client-guarantor.component';
import { ViewClientIdentityComponent } from './clients/view-client-identity/view-client-identity.component';
import { AddClientIdentityComponent } from './clients/add-client-identity/add-client-identity.component';

const routes: Routes = [
  /*Clients Routing*/
  {
    path: 'clients/client-onboarding',
    component: ClientOnboardingComponent,
  },
  {
    path: 'clients/add-client',
    component: AddClientComponent,
  },
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
    path: 'clients/add-upload-documents',
    component: UploadDocumentsComponent,
  },
  {
    path: 'clients/add-address',
    component: AddAddressComponent,
  },
  {
    path: 'clients/add-sales-turnover',
    component: AddSalesTurnoverComponent,
  },
  {
    path: 'clients/add-phone-number',
    component: AddPhoneNumberComponent,
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
    path: 'clients/add-cr-authority-office',
    component: AddCrAuthorityOfficeComponent,
  },
  {
    path: 'clients/add-cr-authority-office',
    component: AddCrAuthorityOfficeComponent,
  },
  {
    path: 'clients/add-tax-authority-office',
    component: AddTaxAuthorityOfficeComponent,
  },
  {
    path: 'clients/add-central-bank-info',
    component: AddCentralBankInfoComponent,
  },
  {
    path: 'clients/add-share-holders',
    component: AddShareHoldersComponent,
  },
  {
    path: 'clients/add-tml-officer',
    component: AddTmlOfficerComponent,
  },
  {
    path: 'clients/view-clients',
    component: ViewClientsComponent,
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
    path: 'clients/view-upload-documents',
    component: ViewUploadDocumentsComponent,
  },
  {
    path: 'clients/view-address',
    component: ViewAddressComponent,
  },
  {
    path: 'clients/view-sales-turnover',
    component: ViewSalesTurnoverComponent,
  },
  {
    path: 'clients/view-phone-number',
    component: ViewPhoneNumberComponent,
  },
  {
    path: 'clients/view-contact-person',
    component: ViewContactPersonComponent,
  },
  {
    path: 'clients/view-cr-authority-office',
    component: ViewCrAuthorityOfficeComponent,
  },
  {
    path: 'clients/view-tax-authority-office',
    component: ViewTaxAuthorityOfficeComponent,
  },
  {
    path: 'clients/view-central-bank-info',
    component: ViewCentralBankInfoComponent,
  },
  {
    path: 'clients/view-share-holder',
    component: ViewShareHolderComponent,
  },
  {
    path: 'clients/view-tml-officer',
    component: ViewTmlOfficerComponent,
  },
  {
    path: 'clients/client-activity-wizard',
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
    path: 'leasing-mandates/view-assest-type',
    component: ViewAssestTypeComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrmRoutingModule {}
