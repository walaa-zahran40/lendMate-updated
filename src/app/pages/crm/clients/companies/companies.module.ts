import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddClientComponent } from './add-client/add-client.component';
import { CompanyAddressesComponent } from './company-addresses/company-addresses.component';
import { CompanyTurnoverComponent } from './company-turnover/company-turnover.component';
import { CompanyPhoneNumbersComponent } from './company-phone-numbers/company-phone-numbers.component';
import { ContactPersonsComponent } from './contact-persons/contact-persons.component';
import { CrAuthorityOfficeComponent } from './cr-authority-office/cr-authority-office.component';
import { TaxAuthorityOfficeComponent } from './tax-authority-office/tax-authority-office.component';
import { CentralBankComponent } from './central-bank/central-bank.component';
import { ShareHolderComponent } from './share-holder/share-holder.component';
import { GuarantorComponent } from './guarantor/guarantor.component';
import { TmlOfficerVisibleComponent } from './tml-officer/tml-officer.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { ComponentsModule } from '../../../../shared/components/components.module';
import { UploadDocumentsComponent } from './upload-documents/upload-documents.component';
import { TabsModule } from 'primeng/tabs';
import { ClientOnboardingComponent } from './client-onboarding/client-onboarding.component';

@NgModule({
  declarations: [
    AddClientComponent,
    CompanyAddressesComponent,
    CompanyTurnoverComponent,
    CompanyPhoneNumbersComponent,
    ContactPersonsComponent,
    CrAuthorityOfficeComponent,
    TaxAuthorityOfficeComponent,
    CentralBankComponent,
    ShareHolderComponent,
    GuarantorComponent,
    TmlOfficerVisibleComponent,
    UploadDocumentsComponent,
    ClientOnboardingComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StepperModule,
    ButtonModule,
    TabsModule,
  ],
  exports: [
    AddClientComponent,
    CompanyAddressesComponent,
    CompanyTurnoverComponent,
    CompanyPhoneNumbersComponent,
    ContactPersonsComponent,
    CrAuthorityOfficeComponent,
    TaxAuthorityOfficeComponent,
    CentralBankComponent,
    ShareHolderComponent,
    GuarantorComponent,
    TmlOfficerVisibleComponent,
    UploadDocumentsComponent,
    ClientOnboardingComponent,
  ],
})
export class CompaniesModule {}
