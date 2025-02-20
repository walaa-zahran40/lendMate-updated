import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesComponent } from './companies/companies.component';
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

@NgModule({
  declarations: [
    CompaniesComponent,
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
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    CompaniesComponent,
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
  ],
})
export class CompaniesModule {}
