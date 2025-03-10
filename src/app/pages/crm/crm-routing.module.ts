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
  {
    path: 'clients/view-clients',
    component: ViewClientsComponent,
  },
  {
    path: 'clients/view-upload-documents',
    component: ViewUploadDocumentsComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrmRoutingModule {}
