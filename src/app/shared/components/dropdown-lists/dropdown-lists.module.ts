import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressTypesComponent } from '../../../pages/lookups/address-types/address-types.component';
import { AreaDropdownComponent } from './area-dropdown/area-dropdown.component';
import { AssetTypeCategoriesDropdownComponent } from './asset-type-categories-dropdown/asset-type-categories-dropdown.component';
import { AssetTypesDropdownComponent } from './asset-types-dropdown/asset-types-dropdown.component';
import { BusinessLinesDropdownComponent } from './business-lines-dropdown/business-lines-dropdown.component';
import { CallActionTypesDropdownComponent } from './call-action-types-dropdown/call-action-types-dropdown.component';
import { CallTypesDropdownComponent } from './call-types-dropdown/call-types-dropdown.component';
import { ClientDocumentTypesDropdownComponent } from './client-document-types-dropdown/client-document-types-dropdown.component';
import { ClientDropdownComponent } from './client-dropdown/client-dropdown.component';
import { ClientIdentitiesDropdownComponent } from './client-identities-dropdown/client-identities-dropdown.component';
import { ClientStatusesDropdownComponent } from './client-statuses-dropdown/client-statuses-dropdown.component';
import { ClientTypesDropdownComponent } from './client-types-dropdown/client-types-dropdown.component';
import { CommunicationFlowTypesDropdownComponent } from './communication-flow-types-dropdown/communication-flow-types-dropdown.component';
import { CompanyTypesDropdownComponent } from './company-types-dropdown/company-types-dropdown.component';
import { ComponentDropdownComponent } from './component-dropdown/component-dropdown.component';
import { ContactPersonsDropdownComponent } from './contact-persons-dropdown/contact-persons-dropdown.component';
import { CountryDropdownComponent } from './country-dropdown/country-dropdown.component';
import { CrdropdownComponent } from './crdropdown/crdropdown.component';
import { CurrenciesDropdownComponent } from './currencies-dropdown/currencies-dropdown.component';
import { CurrencyExchangeRatesDropdownComponent } from './currency-exchange-rates-dropdown/currency-exchange-rates-dropdown.component';
import { DepartmentsDropdownComponent } from './departments-dropdown/departments-dropdown.component';
import { FeeCalculationTypeDropdownComponent } from './fee-calculation-type-dropdown/fee-calculation-type-dropdown.component';
import { FeeTypeDropdownComponent } from './fee-type-dropdown/fee-type-dropdown.component';
import { FollowUpPointsDropdownComponent } from './follow-up-points-dropdown/follow-up-points-dropdown.component';
import { AddressTypesDropdownComponent } from './address-types-dropdown/address-types-dropdown.component';
import { GovernorateDropdownComponent } from './governorate-dropdown/governorate-dropdown.component';
import { GracePeriodUnitsDropdownComponent } from './grace-period-units-dropdown/grace-period-units-dropdown.component';
import { IdentificationTypeDropdownComponent } from './identification-type-dropdown/identification-type-dropdown.component';
import { InsuredByDropdownComponent } from './insured-by-dropdown/insured-by-dropdown.component';
import { InterestRateBenchmarksDropdownComponent } from './interest-rate-benchmarks-dropdown/interest-rate-benchmarks-dropdown.component';
import { LeasingTypesDropdownComponent } from './leasing-types-dropdown/leasing-types-dropdown.component';
import { LegalFormDropdownComponent } from './legal-form-dropdown/legal-form-dropdown.component';
import { LegalFormLawDropdownComponent } from './legal-form-law-dropdown/legal-form-law-dropdown.component';
import { MandateAdditionalTermsDropdownComponent } from './mandate-additional-terms-dropdown/mandate-additional-terms-dropdown.component';
import { MandateStatusActionDropdownComponent } from './mandate-status-action-dropdown/mandate-status-action-dropdown.component';
import { MandateStatusDropdownComponent } from './mandate-status-dropdown/mandate-status-dropdown.component';
import { MandateValidityUnitDropdownComponent } from './mandate-validity-unit-dropdown/mandate-validity-unit-dropdown.component';
import { MeetingTypesDropdownComponent } from './meeting-types-dropdown/meeting-types-dropdown.component';
import { OfficersDropdownComponent } from './officers-dropdown/officers-dropdown.component';
import { OperationsDropdownComponent } from './operations-dropdown/operations-dropdown.component';
import { PagesDropdownComponent } from './pages-dropdown/pages-dropdown.component';
import { PaymentMethodsDropdownComponent } from './payment-methods-dropdown/payment-methods-dropdown.component';
import { PaymentMonthDaysDropdownComponent } from './payment-month-days-dropdown/payment-month-days-dropdown.component';
import { PaymentPeriodsDropdownComponent } from './payment-periods-dropdown/payment-periods-dropdown.component';
import { PaymentTimingTermsDropdownComponent } from './payment-timing-terms-dropdown/payment-timing-terms-dropdown.component';
import { PhoneTypesDropdownComponent } from './phone-types-dropdown/phone-types-dropdown.component';
import { ProductDropdownComponent } from './product-dropdown/product-dropdown.component';
import { RentStructureTypesDropdownComponent } from './rent-structure-types-dropdown/rent-structure-types-dropdown.component';
import { SectorsDropdownComponent } from './sectors-dropdown/sectors-dropdown.component';
import { SmeDropdownComponent } from './sme-dropdown/sme-dropdown.component';
import { SubSectorsDropdownComponent } from './sub-sectors-dropdown/sub-sectors-dropdown.component';
import { TaxDropdownComponent } from './tax-dropdown/tax-dropdown.component';
import { TeamsDropdownComponent } from './teams-dropdown/teams-dropdown.component';
import { TmlOfficerTypesDropdownComponent } from './tml-officer-types-dropdown/tml-officer-types-dropdown.component';

@NgModule({
  declarations: [
    AddressTypesDropdownComponent,
    AreaDropdownComponent,
    AssetTypeCategoriesDropdownComponent,
    AssetTypesDropdownComponent,
    BusinessLinesDropdownComponent,
    CallActionTypesDropdownComponent,
    CallTypesDropdownComponent,
    ClientDocumentTypesDropdownComponent,
    ClientDropdownComponent,
    ClientIdentitiesDropdownComponent,
    ClientStatusesDropdownComponent,
    ClientTypesDropdownComponent,
    CommunicationFlowTypesDropdownComponent,
    CompanyTypesDropdownComponent,
    ComponentDropdownComponent,
    ContactPersonsDropdownComponent,
    CountryDropdownComponent,
    CrdropdownComponent,
    CurrenciesDropdownComponent,
    CurrencyExchangeRatesDropdownComponent,
    DepartmentsDropdownComponent,
    FeeCalculationTypeDropdownComponent,
    FeeTypeDropdownComponent,
    FollowUpPointsDropdownComponent,
    GovernorateDropdownComponent,
    GracePeriodUnitsDropdownComponent,
    IdentificationTypeDropdownComponent,
    InsuredByDropdownComponent,
    InterestRateBenchmarksDropdownComponent,
    LeasingTypesDropdownComponent,
    LegalFormDropdownComponent,
    LegalFormLawDropdownComponent,
    MandateAdditionalTermsDropdownComponent,
    MandateStatusActionDropdownComponent,
    MandateStatusDropdownComponent,
    MandateValidityUnitDropdownComponent,
    MeetingTypesDropdownComponent,
    OfficersDropdownComponent,
    OperationsDropdownComponent,
    PagesDropdownComponent,
    PaymentMethodsDropdownComponent,
    PaymentMonthDaysDropdownComponent,
    PaymentPeriodsDropdownComponent,
    PaymentTimingTermsDropdownComponent,
    PhoneTypesDropdownComponent,
    ProductDropdownComponent,
    RentStructureTypesDropdownComponent,
    SectorsDropdownComponent,
    SmeDropdownComponent,
    SubSectorsDropdownComponent,
    TaxDropdownComponent,
    TeamsDropdownComponent,
    TmlOfficerTypesDropdownComponent,
  ],
  imports: [CommonModule],
})
export class DropdownListsModule {}
