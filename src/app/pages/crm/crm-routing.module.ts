import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientOnboardingComponent } from './clients/companies/client-onboarding/client-onboarding.component';
import { AddClientComponent } from './clients/companies/add-client/add-client.component';
import { CompanyViewOnlyComponent } from './clients/companies/company-view-only/company-view-only.component';
import { UploadDocumentsComponent } from './clients/companies/upload-documents/upload-documents.component';
import { AddAddressComponent } from './clients/companies/add-address/add-address.component';
import { AddSalesTurnoverComponent } from './clients/companies/add-sales-turnover/add-sales-turnover.component';
import { AddPhoneNumberComponent } from './clients/companies/add-phone-number/add-phone-number.component';
import { AddContactPersonComponent } from './clients/companies/add-contact-person/add-contact-person.component';
import { ContactPersonViewTableDataComponent } from './clients/companies/contact-person-view-table-data/contact-person-view-table-data.component';
import { AddCrAuthorityOfficeComponent } from './clients/companies/add-cr-authority-office/add-cr-authority-office.component';
import { AddTaxAuthorityOfficeComponent } from './clients/companies/add-tax-authority-office/add-tax-authority-office.component';
import { AddCentralBankInfoComponent } from './clients/companies/add-central-bank-info/add-central-bank-info.component';
import { AddShareHoldersComponent } from './clients/companies/add-share-holders/add-share-holders.component';
import { AddTmlOfficerComponent } from './clients/companies/add-tml-officer/add-tml-officer.component';
import { AddMandateComponent } from './leasing-mandates/add-mandate/add-mandate.component';
import { AddChildMandateComponent } from './leasing-mandates/add-child-mandate/add-child-mandate.component';
import { AddManageMandateTermsComponent } from './leasing-mandates/add-manage-mandate-terms/add-manage-mandate-terms.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrmRoutingModule {}
