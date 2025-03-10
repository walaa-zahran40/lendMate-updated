import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAddressComponent } from './add-address/add-address.component';
import { AddCentralBankInfoComponent } from './add-central-bank-info/add-central-bank-info.component';
import { AddClientComponent } from './add-client/add-client.component';
import { AddContactPersonComponent } from './add-contact-person/add-contact-person.component';
import { AddCrAuthorityOfficeComponent } from './add-cr-authority-office/add-cr-authority-office.component';
import { AddPhoneNumberComponent } from './add-phone-number/add-phone-number.component';
import { AddSalesTurnoverComponent } from './add-sales-turnover/add-sales-turnover.component';
import { AddShareHoldersComponent } from './add-share-holders/add-share-holders.component';
import { AddTaxAuthorityOfficeComponent } from './add-tax-authority-office/add-tax-authority-office.component';
import { AddTmlOfficerComponent } from './add-tml-officer/add-tml-officer.component';
import { ClientOnboardingComponent } from './client-onboarding/client-onboarding.component';
import { CompanyViewOnlyComponent } from './company-view-only/company-view-only.component';
import { ContactPersonViewTableDataComponent } from './contact-person-view-table-data/contact-person-view-table-data.component';
import { UploadDocumentsComponent } from './upload-documents/upload-documents.component';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { StepperModule } from 'primeng/stepper';
import { TabsModule } from 'primeng/tabs';
import { SharedModule } from '../../../shared/shared.module';
import { ViewClientsComponent } from './view-clients/view-clients.component';
import { ViewUploadDocumentsComponent } from './view-upload-documents/view-upload-documents.component';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

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
    ViewClientsComponent,
    ViewUploadDocumentsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StepperModule,
    ButtonModule,
    TabsModule,
    FileUploadModule,
    IconField,
    InputIcon,
  ],
})
export class ClientsModule {}
