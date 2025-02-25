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

const routes: Routes = [
  {
    path: 'client-onboarding',
    component: ClientOnboardingComponent,
  },
  {
    path: 'add-client',
    component: AddClientComponent,
  },
  {
    path: 'company-view-only',
    component: CompanyViewOnlyComponent,
  },
  {
    path: 'add-upload-documents',
    component: UploadDocumentsComponent,
  },
  {
    path: 'add-address',
    component: AddAddressComponent,
  },
  {
    path: 'add-sales-turnover',
    component: AddSalesTurnoverComponent,
  },
  {
    path: 'add-phone-number',
    component: AddPhoneNumberComponent,
  },
  {
    path: 'add-contact-person',
    component: AddContactPersonComponent,
  },
  {
    path: 'contact-person-view-table-data',
    component: ContactPersonViewTableDataComponent,
  },
  {
    path: 'add-cr-authority-office',
    component: AddCrAuthorityOfficeComponent,
  },
  {
    path: 'add-cr-authority-office',
    component: AddCrAuthorityOfficeComponent,
  },
  {
    path: 'add-tax-authority-office',
    component: AddTaxAuthorityOfficeComponent,
  },
  {
    path: 'add-central-bank-info',
    component: AddCentralBankInfoComponent,
  },
  {
    path: 'add-share-holders',
    component: AddShareHoldersComponent,
  },
  {
    path: 'add-tml-officer',
    component: AddTmlOfficerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrmRoutingModule {}
