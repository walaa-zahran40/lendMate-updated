import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { StepperModule } from 'primeng/stepper';
import { TabsModule } from 'primeng/tabs';
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
import { AddBranchComponent } from './add-branch/add-branch.component';
import { AddBusinessLinesComponent } from './add-business-lines/add-business-lines.component';
import { AddAssetTypesComponent } from './add-asset-types/add-asset-types.component';
import { AddAssestTypeCategoriesComponent } from './add-assest-type-categories/add-assest-type-categories.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { AddSectorsComponent } from './add-sectors/add-sectors.component';
import { AddClientStatusesComponent } from './add-client-statuses/add-client-statuses.component';
import { AddSmeClientCodeComponent } from './add-sme-client-code/add-sme-client-code.component';
import { AddSubSectorsComponent } from './add-sub-sectors/add-sub-sectors.component';
import { AddAuthorityOfficesComponent } from './add-authority-offices/add-authority-offices.component';
import { AddPhoneTypesComponent } from './add-phone-types/add-phone-types.component';
import { AddAddressTypesComponent } from './add-address-types/add-address-types.component';
import { AddGovernoratesComponent } from './add-governorates/add-governorates.component';
import { AddCountriesComponent } from './add-countries/add-countries.component';
import { AddIdentificationTypesComponent } from './add-identification-types/add-identification-types.component';
import { AddAreasComponent } from './add-areas/add-areas.component';
import { AddTaxOfficesComponent } from './add-tax-offices/add-tax-offices.component';
import { AddTmlOfficerTypesComponent } from './add-tml-officer-types/add-tml-officer-types.component';
import { AddCallTypesComponent } from './add-call-types/add-call-types.component';
import { AddCommunicationTypesComponent } from './add-communication-types/add-communication-types.component';
import { AddCallActionTypesComponent } from './add-call-action-types/add-call-action-types.component';
import { AddCommunicationFlowTypesComponent } from './add-communication-flow-types/communication-flow-types.component';
import { AddBranchManagersComponent } from './add-branch-managers/add-branch-managers.component';
import { AddBranchOfficersComponent } from './add-branch-officers/add-branch-officers.component';
import { AddBranchAddressesComponent } from './add-branch-addresses/add-branch-addresses.component';
import { AddClientStatusActionsComponent } from './add-client-status-actions/add-client-status-actions.component';
import { AddCurrenciesExchangeComponent } from './add-currencies-exchange/add-currencies-exchange.component';
import { LookupsRoutingModule } from './lookups-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AddClientDocumentTypesComponent } from './add-client-document-types/add-client-document-types.component';
import { AddClientTypesComponent } from './add-client-types/add-client-types.component';
import { ViewCompanyTypesComponent } from './view-company-types/view-company-types.component';
import { ViewFeesCalculationTypesComponent } from './view-fees-calculation-types/view-fees-calculation-types.component';
import { ViewMandateStatusesComponent } from './view-mandate-statuses/view-mandate-statuses.component';
import { ViewInterestRateBenchmarksComponent } from './view-interest-rate-benchmarks/view-interest-rate-benchmarks.component';
import { ViewFeelTypesComponent } from './view-feel-types/view-feel-types.component';
import { ViewGracePeriodUnitsComponent } from './view-grace-period-units/view-grace-period-units.component';
import { ViewRentStructureTypesComponent } from './view-rent-structure-types/view-rent-structure-types.component';
import { ViewCurrenciesComponent } from './view-currencies/view-currencies.component';
import { WizardCurrenciesComponent } from './wizard-currencies/wizard-currencies.component';
import { ViewCurrencyExchangeComponent } from './view-currency-exchange/view-currency-exchange.component';
import { ViewPaymentMethodsComponent } from './view-payment-methods/view-payment-methods.component';
import { ViewInsuredByComponent } from './view-insured-by/view-insured-by.component';
import { ViewLeasingTypeComponent } from './view-leasing-type/view-leasing-type.component';
import { ViewMandateValidityUnitComponent } from './view-mandate-validity-unit/view-mandate-validity-unit.component';
import { ViewClientDocumentTypesComponent } from './view-client-document-types/view-client-document-types.component';
import { ViewBranchComponent } from './view-branch/view-branch.component';
import { WizardBranchComponent } from './wizard-branch/wizard-branch.component';
import { ViewBranchManagersComponent } from './view-branch-managers/view-branch-managers.component';
import { ViewBranchOfficersComponent } from './view-branch-officers/view-branch-officers.component';
import { ViewBranchAddressesComponent } from './view-branch-addresses/view-branch-addresses.component';
import { ViewBusinessLinesComponent } from './view-business-lines/view-business-lines.component';
import { ViewAssestTypesComponent } from './view-assest-types/view-assest-types.component';
import { ViewAssestTypeCategoriesComponent } from './view-assest-type-categories/view-assest-type-categories.component';

@NgModule({
  declarations: [
    AddTmlOfficerTypesComponent,
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
    AddBranchComponent,
    AddBusinessLinesComponent,
    AddAssetTypesComponent,
    AddAssestTypeCategoriesComponent,
    AddProductsComponent,
    AddSectorsComponent,
    AddClientStatusesComponent,
    AddSmeClientCodeComponent,
    AddSubSectorsComponent,
    AddAuthorityOfficesComponent,
    AddPhoneTypesComponent,
    AddAddressTypesComponent,
    AddGovernoratesComponent,
    AddCountriesComponent,
    AddIdentificationTypesComponent,
    AddAreasComponent,
    AddTaxOfficesComponent,
    AddCallTypesComponent,
    AddCommunicationTypesComponent,
    AddCallActionTypesComponent,
    AddCommunicationFlowTypesComponent,
    AddBranchManagersComponent,
    AddBranchOfficersComponent,
    AddBranchAddressesComponent,
    AddClientStatusActionsComponent,
    AddCurrenciesExchangeComponent,
    AddClientDocumentTypesComponent,
    AddClientTypesComponent,
    ViewCompanyTypesComponent,
    ViewFeesCalculationTypesComponent,
    ViewMandateStatusesComponent,
    ViewInterestRateBenchmarksComponent,
    ViewFeelTypesComponent,
    ViewGracePeriodUnitsComponent,
    ViewRentStructureTypesComponent,
    ViewCurrenciesComponent,
    WizardCurrenciesComponent,
    ViewCurrencyExchangeComponent,
    ViewPaymentMethodsComponent,
    ViewInsuredByComponent,
    ViewLeasingTypeComponent,
    ViewMandateValidityUnitComponent,
    ViewClientDocumentTypesComponent,
    ViewBranchComponent,
    WizardBranchComponent,
    ViewBranchManagersComponent,
    ViewBranchOfficersComponent,
    ViewBranchAddressesComponent,
    ViewBusinessLinesComponent,
    ViewAssestTypesComponent,
    ViewAssestTypeCategoriesComponent,
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
    AddTmlOfficerTypesComponent,
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
    AddClientTypesComponent,
    AddMeetingTypesComponent,
    AddInsuredByComponent,
    AddLeasingTypeComponent,
    AddMandateValidityUnitComponent,
    AddClientDocumentTypesComponent,
    AddBranchComponent,
    AddBusinessLinesComponent,
    AddAssetTypesComponent,
    AddAssestTypeCategoriesComponent,
    AddProductsComponent,
    AddSectorsComponent,
    AddClientStatusesComponent,
    AddSmeClientCodeComponent,
    AddSubSectorsComponent,
    AddAuthorityOfficesComponent,
    AddPhoneTypesComponent,
    AddAddressTypesComponent,
    AddGovernoratesComponent,
    AddCountriesComponent,
    AddIdentificationTypesComponent,
    AddAreasComponent,
    AddTaxOfficesComponent,
    AddCallTypesComponent,
    AddCommunicationTypesComponent,
    AddCallActionTypesComponent,
    AddCommunicationFlowTypesComponent,
    AddBranchManagersComponent,
    AddBranchOfficersComponent,
    AddBranchAddressesComponent,
    AddClientStatusActionsComponent,
    AddCurrenciesExchangeComponent,
  ],
})
export class LookupsModule {}
