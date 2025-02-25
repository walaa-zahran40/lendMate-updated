import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddClientComponent } from './add-client/add-client.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { FileUploadModule } from 'primeng/fileupload';
import { UploadDocumentsComponent } from './upload-documents/upload-documents.component';
import { TabsModule } from 'primeng/tabs';
import { ClientOnboardingComponent } from './client-onboarding/client-onboarding.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { AddSalesTurnoverComponent } from './add-sales-turnover/add-sales-turnover.component';
import { AddContactPersonComponent } from './add-contact-person/add-contact-person.component';
import { AddPhoneNumberComponent } from './add-phone-number/add-phone-number.component';
import { AddCrAuthorityOfficeComponent } from './add-cr-authority-office/add-cr-authority-office.component';
import { AddTaxAuthorityOfficeComponent } from './add-tax-authority-office/add-tax-authority-office.component';
import { AddCentralBankInfoComponent } from './add-central-bank-info/add-central-bank-info.component';
import { AddShareHoldersComponent } from './add-share-holders/add-share-holders.component';
import { AddTmlOfficerComponent } from './add-tml-officer/add-tml-officer.component';
import { ContactPersonViewTableDataComponent } from './contact-person-view-table-data/contact-person-view-table-data.component';
import { CompanyViewOnlyComponent } from './company-view-only/company-view-only.component';

@NgModule({
  declarations: [
    AddClientComponent,
    UploadDocumentsComponent,
    ClientOnboardingComponent,
    AddAddressComponent,
    AddSalesTurnoverComponent,
    AddContactPersonComponent,
    AddPhoneNumberComponent,
    AddCrAuthorityOfficeComponent,
    AddTaxAuthorityOfficeComponent,
    AddCentralBankInfoComponent,
    AddShareHoldersComponent,
    AddTmlOfficerComponent,
    ContactPersonViewTableDataComponent,
    CompanyViewOnlyComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StepperModule,
    ButtonModule,
    TabsModule,
    FileUploadModule,
  ],
  exports: [
    AddClientComponent,
    UploadDocumentsComponent,
    ClientOnboardingComponent,
    AddAddressComponent,
    AddSalesTurnoverComponent,
    AddContactPersonComponent,
    AddPhoneNumberComponent,
    AddCrAuthorityOfficeComponent,
    AddTaxAuthorityOfficeComponent,
    AddCentralBankInfoComponent,
    AddShareHoldersComponent,
    AddTmlOfficerComponent,
    ContactPersonViewTableDataComponent,
    CompanyViewOnlyComponent,
  ],
})
export class CompaniesModule {}
