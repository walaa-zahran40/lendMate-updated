import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCompanyTypesComponent } from './add-company-types/add-company-types.component';
import { AddFeeCalculationTypesComponent } from './add-fee-calculation-types/add-fee-calculation-types.component';
import { AddMandateStatusesComponent } from './add-mandate-statuses/add-mandate-statuses.component';
import { AddInterestRateBenchmarksComponent } from './add-interest-rate-benchmarks/add-interest-rate-benchmarks.component';
import { AddFeeTypesComponent } from './add-fee-types/add-fee-types.component';
import { AddGracePeriodUnitsComponent } from './add-grace-period-units/add-grace-period-units.component';
import { AddRentStructureTypesComponent } from './add-rent-structure-types/add-rent-structure-types.component';
import { AddCurrenciesComponent } from './add-currencies/add-currencies.component';
import { AddPaymentMethodsComponent } from './add-payment-methods/add-payment-methods.component';
import { AddPaymentTypesComponent } from './add-payment-types/add-payment-types.component';
import { AddPaymentMonthDaysComponent } from './add-payment-month-days/add-payment-month-days.component';
import { AddMeetingTypesComponent } from './add-meeting-types/add-meeting-types.component';
import { AddInsuredByComponent } from './add-insured-by/add-insured-by.component';
import { AddLeasingTypeComponent } from './add-leasing-type/add-leasing-type.component';
import { AddMandateValidityUnitComponent } from './add-mandate-validity-unit/add-mandate-validity-unit.component';
import { ClientDocumentTypesComponent } from './client-document-types/client-document-types.component';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { BusinessLinesComponent } from './business-lines/business-lines.component';
import { AssetTypesComponent } from './asset-types/asset-types.component';
import { AssetTypeCategoriesComponent } from './asset-type-categories/asset-type-categories.component';
import { ProductsComponent } from './products/products.component';
import { SectorsComponent } from './sectors/sectors.component';
import { ClientStatusesComponent } from './client-statuses/client-statuses.component';
import { SmeClientCodeComponent } from './sme-client-code/sme-client-code.component';
import { SubSectorsComponent } from './sub-sectors/sub-sectors.component';
import { AuthorityOfficesComponent } from './authority-offices/authority-offices.component';
import { PhoneTypesComponent } from './phone-types/phone-types.component';
import { AddressTypesComponent } from './address-types/address-types.component';
import { GovernoratesComponent } from './governorates/governorates.component';
import { CountriesComponent } from './countries/countries.component';
import { IdentificationTypesComponent } from './identification-types/identification-types.component';
import { AreasComponent } from './areas/areas.component';
import { TaxOfficesComponent } from './tax-offices/tax-offices.component';
import { TmlOfficerTypesComponent } from './tml-officer-types/tml-officer-types.component';
import { CallTypesComponent } from './call-types/call-types.component';
import { CommunicationTypesComponent } from './communication-types/communication-types.component';
import { CallActionTypesComponent } from './call-action-types/call-action-types.component';
import { CommunicationFlowTypesComponent } from './communication-flow-types/communication-flow-types.component';
import { AddBranchManagersComponent } from './add-branch-managers/add-branch-managers.component';
import { BranchOfficersComponent } from './branch-officers/branch-officers.component';
import { BranchAddressesComponent } from './branch-addresses/branch-addresses.component';
import { ClientStatusActionsComponent } from './client-status-actions/client-status-actions.component';
import { AddCurrenciesExchangeComponent } from './add-currencies-exchange/add-currencies-exchange.component';
import { MandateStatusActionsComponent } from './mandate-status-actions/mandate-status-actions.component';
import { PaymentPeriodsComponent } from './payment-periods/payment-periods.component';
import { LookupsRoutingModule } from './lookups-routing.module';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { StepperModule } from 'primeng/stepper';
import { TabsModule } from 'primeng/tabs';
import { SharedModule } from '../../shared/shared.module';
import { AddClientDocumentTypesComponent } from './add-client-document-types/add-client-document-types.component';

@NgModule({
  declarations: [
    AddCompanyTypesComponent,
    AddFeeCalculationTypesComponent,
    AddMandateStatusesComponent,
    AddInterestRateBenchmarksComponent,
    AddFeeTypesComponent,
    AddGracePeriodUnitsComponent,
    AddRentStructureTypesComponent,
    AddCurrenciesComponent,
    AddPaymentMethodsComponent,
    AddPaymentTypesComponent,
    AddPaymentMonthDaysComponent,
    AddMeetingTypesComponent,
    AddInsuredByComponent,
    AddLeasingTypeComponent,
    AddMandateValidityUnitComponent,
    ClientDocumentTypesComponent,
    AddBranchComponent,
    BusinessLinesComponent,
    AssetTypesComponent,
    AssetTypeCategoriesComponent,
    ProductsComponent,
    SectorsComponent,
    ClientStatusesComponent,
    SmeClientCodeComponent,
    SubSectorsComponent,
    AuthorityOfficesComponent,
    PhoneTypesComponent,
    AddressTypesComponent,
    GovernoratesComponent,
    CountriesComponent,
    IdentificationTypesComponent,
    AreasComponent,
    TaxOfficesComponent,
    TmlOfficerTypesComponent,
    CallTypesComponent,
    CommunicationTypesComponent,
    CallActionTypesComponent,
    CommunicationFlowTypesComponent,
    AddBranchManagersComponent,
    BranchOfficersComponent,
    BranchAddressesComponent,
    ClientStatusActionsComponent,
    AddCurrenciesExchangeComponent,
    MandateStatusActionsComponent,
    PaymentPeriodsComponent,
    AddClientDocumentTypesComponent,
  ],
  imports: [
    CommonModule,
    LookupsRoutingModule,
    SharedModule,
    StepperModule,
    ButtonModule,
    TabsModule,
    FileUploadModule,
  ],
  exports: [
    AddCompanyTypesComponent,
    AddFeeCalculationTypesComponent,
    AddMandateStatusesComponent,
    AddInterestRateBenchmarksComponent,
    AddFeeTypesComponent,
    AddGracePeriodUnitsComponent,
    AddRentStructureTypesComponent,
    AddCurrenciesComponent,
    AddPaymentMethodsComponent,
    AddPaymentTypesComponent,
    AddPaymentMonthDaysComponent,
    AddMeetingTypesComponent,
    AddInsuredByComponent,
    AddLeasingTypeComponent,
    AddMandateValidityUnitComponent,
    AddClientDocumentTypesComponent,
    AddBranchComponent,
    BusinessLinesComponent,
    AssetTypesComponent,
    AssetTypeCategoriesComponent,
    ProductsComponent,
    SectorsComponent,
    ClientStatusesComponent,
    SmeClientCodeComponent,
    SubSectorsComponent,
    AuthorityOfficesComponent,
    PhoneTypesComponent,
    AddressTypesComponent,
    GovernoratesComponent,
    CountriesComponent,
    IdentificationTypesComponent,
    AreasComponent,
    TaxOfficesComponent,
    TmlOfficerTypesComponent,
    CallTypesComponent,
    CommunicationTypesComponent,
    CallActionTypesComponent,
    CommunicationFlowTypesComponent,
    AddBranchManagersComponent,
    BranchOfficersComponent,
    BranchAddressesComponent,
    ClientStatusActionsComponent,
    AddCurrenciesExchangeComponent,
    MandateStatusActionsComponent,
    PaymentPeriodsComponent,
  ],
})
export class LookupsModule {}
