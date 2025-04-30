import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyTypesComponent } from './components/add-company-types/add-company-types.component';
import { AddFeeCalculationTypesComponent } from './components/add-fee-calculation-types/add-fee-calculation-types.component';
import { AddMandateStatusesComponent } from './components/add-mandate-statuses/add-mandate-statuses.component';
import { AddInterestRateBenchmarksComponent } from './components/add-interest-rate-benchmarks/add-interest-rate-benchmarks.component';
import { AddFeeTypesComponent } from './components/add-fee-types/add-fee-types.component';
import { AddGracePeriodUnitsComponent } from './components/add-grace-period-units/add-grace-period-units.component';
import { AddRentStructureTypesComponent } from './components/add-rent-structure-types/add-rent-structure-types.component';
import { AddCurrenciesComponent } from './components/add-currencies/add-currencies.component';
import { AddPaymentMethodsComponent } from './components/add-payment-methods/add-payment-methods.component';
import { AddPaymentTypesComponent } from './components/add-payment-types/add-payment-types.component';
import { AddPaymentMonthDaysComponent } from './components/add-payment-month-days/add-payment-month-days.component';
import { AddMeetingTypesComponent } from './components/add-meeting-types/add-meeting-types.component';
import { AddInsuredByComponent } from './components/add-insured-by/add-insured-by.component';
import { AddLeasingTypeComponent } from './components/add-leasing-type/add-leasing-type.component';
import { AddMandateValidityUnitComponent } from './components/add-mandate-validity-unit/add-mandate-validity-unit.component';
import { AddBranchComponent } from './components/add-branch/add-branch.component';
import { AddBusinessLinesComponent } from './components/add-business-lines/add-business-lines.component';
import { AddAssetTypesComponent } from './components/add-asset-types/add-asset-types.component';
import { AddCurrenciesExchangeComponent } from './components/add-currencies-exchange/add-currencies-exchange.component';
import { AddClientDocumentTypesComponent } from './components/add-client-document-types/add-client-document-types.component';
import { AddBranchManagersComponent } from './components/add-branch-managers/add-branch-managers.component';
import { AddBranchAddressesComponent } from './components/add-branch-addresses/add-branch-addresses.component';
import { AddBranchOfficersComponent } from './components/add-branch-officers/add-branch-officers.component';
import { AddAssetTypeCategoriesComponent } from './components/add-asset-type-categories/add-asset-type-categories.component';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { AddSectorsComponent } from './components/add-sectors/add-sectors.component';
import { AddClientStatusesComponent } from './components/add-client-statuses/add-client-statuses.component';
import { AddClientStatusActionsComponent } from './components/add-client-status-actions/add-client-status-actions.component';
import { AddSmeClientCodeComponent } from './components/add-sme-client-code/add-sme-client-code.component';
import { AddSubSectorsComponent } from './components/add-sub-sectors/add-sub-sectors.component';
import { AddClientTypesComponent } from './components/add-client-types/add-client-types.component';
import { AddAuthorityOfficesComponent } from './components/add-authority-offices/add-authority-offices.component';
import { AddPhoneTypesComponent } from './components/add-phone-types/add-phone-types.component';
import { AddAddressTypesComponent } from './components/add-address-types/add-address-types.component';
import { AddGovernoratesComponent } from './components/add-governorates/add-governorates.component';
import { AddCountriesComponent } from './components/add-countries/add-countries.component';
import { AddIdentificationTypesComponent } from './components/add-identification-types/add-identification-types.component';
import { AddAreasComponent } from './components/add-areas/add-areas.component';
import { AddTaxOfficesComponent } from './components/add-tax-offices/add-tax-offices.component';
import { AddTmlOfficerTypesComponent } from './components/add-tml-officer-types/add-tml-officer-types.component';
import { AddCallTypesComponent } from './components/add-call-types/add-call-types.component';
import { AddCommunicationTypesComponent } from './components/add-communication-types/add-communication-types.component';
import { AddCallActionTypesComponent } from './components/add-call-action-types/add-call-action-types.component';
import { AddCommunicationFlowTypesComponent } from './components/add-communication-flow-types/communication-flow-types.component';
import { ViewCompanyTypesComponent } from './components/view-company-types/view-company-types.component';
import { ViewFeesCalculationTypesComponent } from './components/view-fees-calculation-types/view-fees-calculation-types.component';
import { ViewMandateStatusesComponent } from './components/view-mandate-statuses/view-mandate-statuses.component';
import { ViewInterestRateBenchmarksComponent } from './components/view-interest-rate-benchmarks/view-interest-rate-benchmarks.component';
import { ViewFeeTypesComponent } from './components/view-fee-types/view-fee-types.component';
import { ViewGracePeriodUnitsComponent } from './components/view-grace-period-units/view-grace-period-units.component';
import { ViewRentStructureTypesComponent } from './components/view-rent-structure-types/view-rent-structure-types.component';
import { ViewCurrenciesComponent } from './components/view-currencies/view-currencies.component';
import { WizardCurrenciesComponent } from './components/wizard-currencies/wizard-currencies.component';
import { ViewCurrencyExchangeComponent } from './components/view-currency-exchange/view-currency-exchange.component';
import { ViewPaymentMethodsComponent } from './components/view-payment-methods/view-payment-methods.component';
import { ViewPaymentTypesComponent } from './components/view-payment-types/view-payment-types.component';
import { ViewPaymentMonthDaysComponent } from './components/view-payment-month-days/view-payment-month-days.component';
import { ViewMeetingTypesComponent } from './components/view-meeting-types/view-meeting-types.component';
import { ViewInsuredByComponent } from './components/view-insured-by/view-insured-by.component';
import { ViewLeasingTypeComponent } from './components/view-leasing-type/view-leasing-type.component';
import { ViewMandateValidityUnitComponent } from './components/view-mandate-validity-unit/view-mandate-validity-unit.component';
import { ViewClientDocumentTypesComponent } from './components/view-client-document-types/view-client-document-types.component';
import { ViewBranchComponent } from './components/view-branch/view-branch.component';
import { WizardBranchComponent } from './components/wizard-branch/wizard-branch.component';
import { ViewBranchManagersComponent } from './components/view-branch-managers/view-branch-managers.component';
import { ViewBranchOfficersComponent } from './components/view-branch-officers/view-branch-officers.component';
import { ViewBranchAddressesComponent } from './components/view-branch-addresses/view-branch-addresses.component';
import { ViewBusinessLinesComponent } from './components/view-business-lines/view-business-lines.component';
import { ViewAssestTypesComponent } from './components/view-assest-types/view-assest-types.component';
import { ViewAssetTypeCategoriesComponent } from './components/view-asset-type-categories/view-asset-type-categories.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { ViewSectorsComponent } from './components/view-sectors/view-sectors.component';
import { ViewClientStatusesComponent } from './components/view-client-statuses/view-client-statuses.component';
import { WizardClientStatusComponent } from './components/wizard-client-status/wizard-client-status.component';
import { ViewClientStatusComponent } from './components/view-client-status/view-client-status.component';
import { ViewSmeClientCodeComponent } from './components/view-sme-client-code/view-sme-client-code.component';
import { ViewSubSectorComponent } from './components/view-sub-sector/view-sub-sector.component';
import { ViewClientTypesComponent } from './components/view-client-types/view-client-types.component';
import { ViewAuthorityOfficesComponent } from './components/view-authority-offices/view-authority-offices.component';
import { ViewPhoneTypesComponent } from './components/view-phone-types/view-phone-types.component';
import { ViewAddressTypesComponent } from './components/view-address-types/view-address-types.component';
import { ViewGovernoratesComponent } from './components/view-governorates/view-governorates.component';
import { ViewCountriesComponent } from './components/view-countries/view-countries.component';
import { ViewIdentificationTypesComponent } from './components/view-identification-types/view-identification-types.component';
import { ViewAreasComponent } from './components/view-areas/view-areas.component';
import { ViewTaxOfficesComponent } from './components/view-tax-offices/view-tax-offices.component';
import { ViewTmlOfficerTypesComponent } from './components/view-tml-officer-types/view-tml-officer-types.component';
import { ViewCallTypesComponent } from './components/view-call-types/view-call-types.component';
import { ViewCommunicationTypesComponent } from './components/view-communication-types/view-communication-types.component';
import { ViewCallActionTypesComponent } from './components/view-call-action-types/view-call-action-types.component';
import { ViewCommunicationFlowTypeComponent } from './components/view-communication-flow-type/view-communication-flow-type.component';
import { ViewFeesRangeComponent } from './components/view-fees-range/view-fees-range.component';
import { AddFeesRangeComponent } from './components/add-fees-range/add-fees-range.component';

const routes: Routes = [
  //Company Types
  {
    path: 'add-company-types',
    component: AddCompanyTypesComponent,
  },
  {
    path: 'edit-company-types/:id',
    component: AddCompanyTypesComponent,
  },
  {
    path: 'view-company-types',
    component: ViewCompanyTypesComponent,
  },
  //Fee Calculation Types
  {
    path: 'add-fee-calculation-types',
    component: AddFeeCalculationTypesComponent,
  },
  {
    path: 'edit-fee-calculation-types/:id',
    component: AddFeeCalculationTypesComponent,
  },
  {
    path: 'view-fee-calculation-types',
    component: ViewFeesCalculationTypesComponent,
  },
  //Address Types
  {
    path: 'add-address-types',
    component: AddAddressTypesComponent,
  },
  {
    path: 'edit-address-types/:id',
    component: AddAddressTypesComponent,
  },
  //-----
  {
    path: 'add-mandate-statuses',
    component: AddMandateStatusesComponent,
  },
  {
    path: 'add-interest-rate-benchmarks',
    component: AddInterestRateBenchmarksComponent,
  },
  {
    path: 'add-fees-types',
    component: AddFeeTypesComponent,
  },
  {
    path: 'add-grace-period-units',
    component: AddGracePeriodUnitsComponent,
  },
  {
    path: 'add-rent-structure-types',
    component: AddRentStructureTypesComponent,
  },
  {
    path: 'add-currencies',
    component: AddCurrenciesComponent,
  },
  {
    path: 'add-currencies-exchange',
    component: AddCurrenciesExchangeComponent,
  },
  {
    path: 'add-payment-methods',
    component: AddPaymentMethodsComponent,
  },
  {
    path: 'add-payment-types',
    component: AddPaymentTypesComponent,
  },
  {
    path: 'add-payment-month-days',
    component: AddPaymentMonthDaysComponent,
  },
  {
    path: 'add-meeting-types',
    component: AddMeetingTypesComponent,
  },
  {
    path: 'add-insured-by',
    component: AddInsuredByComponent,
  },
  {
    path: 'add-leasing-type',
    component: AddLeasingTypeComponent,
  },
  {
    path: 'add-mandate-validity-unit',
    component: AddMandateValidityUnitComponent,
  },
  {
    path: 'add-client-document-types',
    component: AddClientDocumentTypesComponent,
  },
  {
    path: 'add-branch',
    component: AddBranchComponent,
  },
  {
    path: 'add-branch-addresses',
    component: AddBranchAddressesComponent,
  },
  {
    path: 'add-branch-officers',
    component: AddBranchOfficersComponent,
  },

  {
    path: 'add-branch-managers',
    component: AddBranchManagersComponent,
  },
  {
    path: 'add-business-lines',
    component: AddBusinessLinesComponent,
  },
  {
    path: 'add-assest-types',
    component: AddAssetTypesComponent,
  },
  {
    path: 'add-assest-type-categories',
    component: AddAssetTypeCategoriesComponent,
  },
  {
    path: 'add-products',
    component: AddProductsComponent,
  },
  {
    path: 'add-sectors',
    component: AddSectorsComponent,
  },
  {
    path: 'add-client-statuses',
    component: AddClientStatusesComponent,
  },
  {
    path: 'add-client-status-actions',
    component: AddClientStatusActionsComponent,
  },
  {
    path: 'add-sme-client-code',
    component: AddSmeClientCodeComponent,
  },
  {
    path: 'add-sub-sectors',
    component: AddSubSectorsComponent,
  },
  {
    path: 'add-client-types',
    component: AddClientTypesComponent,
  },
  {
    path: 'add-authority-offices',
    component: AddAuthorityOfficesComponent,
  },
  {
    path: 'add-phone-types',
    component: AddPhoneTypesComponent,
  },

  {
    path: 'add-governorates',
    component: AddGovernoratesComponent,
  },
  {
    path: 'add-countries',
    component: AddCountriesComponent,
  },
  {
    path: 'add-fees-range',
    component: AddFeesRangeComponent,
  },
  {
    path: 'add-identification-types',
    component: AddIdentificationTypesComponent,
  },
  {
    path: 'add-areas',
    component: AddAreasComponent,
  },
  {
    path: 'add-tax-officers',
    component: AddTaxOfficesComponent,
  },
  {
    path: 'add-tml-officer-types',
    component: AddTmlOfficerTypesComponent,
  },
  {
    path: 'add-call-types',
    component: AddCallTypesComponent,
  },
  {
    path: 'add-communication-types',
    component: AddCommunicationTypesComponent,
  },
  {
    path: 'add-call-action-types',
    component: AddCallActionTypesComponent,
  },
  {
    path: 'add-communication-flow-type',
    component: AddCommunicationFlowTypesComponent,
  },

  {
    path: 'view-mandate-statuses',
    component: ViewMandateStatusesComponent,
  },
  {
    path: 'view-interest-rate-benchmarks',
    component: ViewInterestRateBenchmarksComponent,
  },
  {
    path: 'view-fee-types',
    component: ViewFeeTypesComponent,
  },
  {
    path: 'view-fees-range',
    component: ViewFeesRangeComponent,
  },
  {
    path: 'view-grace-period-units',
    component: ViewGracePeriodUnitsComponent,
  },
  {
    path: 'view-rent-structure-types',
    component: ViewRentStructureTypesComponent,
  },
  {
    path: 'view-currencies',
    component: ViewCurrenciesComponent,
  },
  {
    path: 'view-currency-exchange-rate',
    component: ViewCurrencyExchangeComponent,
  },
  {
    path: 'view-payment-methods',
    component: ViewPaymentMethodsComponent,
  },
  {
    path: 'view-payment-types',
    component: ViewPaymentTypesComponent,
  },
  {
    path: 'view-payment-month-days',
    component: ViewPaymentMonthDaysComponent,
  },
  {
    path: 'view-meeting-types',
    component: ViewMeetingTypesComponent,
  },
  {
    path: 'view-insured-by',
    component: ViewInsuredByComponent,
  },
  {
    path: 'view-leasing-type',
    component: ViewLeasingTypeComponent,
  },
  {
    path: 'view-mandate-validity-unit',
    component: ViewMandateValidityUnitComponent,
  },
  {
    path: 'view-client-document-types',
    component: ViewClientDocumentTypesComponent,
  },
  {
    path: 'view-branch',
    component: ViewBranchComponent,
  },
  {
    path: 'view-branch-managers',
    component: ViewBranchManagersComponent,
  },
  {
    path: 'view-branch-officers',
    component: ViewBranchOfficersComponent,
  },
  {
    path: 'view-branch-addresses',
    component: ViewBranchAddressesComponent,
  },
  {
    path: 'view-business-lines',
    component: ViewBusinessLinesComponent,
  },
  {
    path: 'view-assest-types',
    component: ViewAssestTypesComponent,
  },
  {
    path: 'view-assest-type-categories',
    component: ViewAssetTypeCategoriesComponent,
  },
  {
    path: 'view-products',
    component: ViewProductsComponent,
  },
  {
    path: 'view-sectors',
    component: ViewSectorsComponent,
  },
  {
    path: 'view-client-statuses',
    component: ViewClientStatusesComponent,
  },
  {
    path: 'view-client-status',
    component: ViewClientStatusComponent,
  },
  {
    path: 'view-sme-client-code',
    component: ViewSmeClientCodeComponent,
  },
  {
    path: 'view-sub-sector',
    component: ViewSubSectorComponent,
  },
  {
    path: 'view-client-types',
    component: ViewClientTypesComponent,
  },
  {
    path: 'view-authority-offices',
    component: ViewAuthorityOfficesComponent,
  },
  {
    path: 'view-phone-types',
    component: ViewPhoneTypesComponent,
  },
  {
    path: 'view-address-types',
    component: ViewAddressTypesComponent,
  },
  {
    path: 'view-governorates',
    component: ViewGovernoratesComponent,
  },
  {
    path: 'view-countries',
    component: ViewCountriesComponent,
  },
  {
    path: 'view-identification-types',
    component: ViewIdentificationTypesComponent,
  },
  {
    path: 'view-areas',
    component: ViewAreasComponent,
  },
  {
    path: 'view-tax-offices',
    component: ViewTaxOfficesComponent,
  },
  {
    path: 'view-tml-officer-types',
    component: ViewTmlOfficerTypesComponent,
  },
  {
    path: 'view-call-types',
    component: ViewCallTypesComponent,
  },
  {
    path: 'view-communication-types',
    component: ViewCommunicationTypesComponent,
  },
  {
    path: 'view-call-action-type',
    component: ViewCallActionTypesComponent,
  },
  {
    path: 'view-communication-flow-type',
    component: ViewCommunicationFlowTypeComponent,
  },
  {
    path: 'wizard-currencies',
    component: WizardCurrenciesComponent,
  },
  {
    path: 'wizard-branch',
    component: WizardBranchComponent,
  },
  {
    path: 'wizard-client-status',
    component: WizardClientStatusComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LookupsRoutingModule {}
