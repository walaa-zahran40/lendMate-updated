import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyTypesComponent } from './components/add-company-types/add-company-types.component';
import { AddFeeCalculationTypesComponent } from './components/add-fee-calculation-types/add-fee-calculation-types.component';
import { AddMandateStatusesComponent } from './components/add-mandate-statuses/add-mandate-statuses.component';
import { AddInterestRateBenchmarksComponent } from './components/add-interest-rate-benchmarks/add-interest-rate-benchmarks.component';
import { AddFeeTypesComponent } from './components/add-fee-types/add-fee-types.component';
import { AddPeriodUnitsComponent } from './components/add-period-units/add-period-units.component';
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
import { AddBranchManagersComponent } from './components/add-branch-managers/add-branch-managers.component';
import { AddBranchAddressesComponent } from './components/add-branch-addresses/add-branch-addresses.component';
import { AddBranchOfficersComponent } from './components/add-branch-officers/add-branch-officers.component';
import { AddAssetTypeCategoriesComponent } from './components/add-asset-type-categories/add-asset-type-categories.component';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { AddSectorsComponent } from './components/add-sectors/add-sectors.component';
import { AddClientStatusesComponent } from './components/add-client-statuses/add-client-statuses.component';
import { AddClientStatusActionsComponent } from './components/add-client-status-actions/add-client-status-actions.component';
import { AddSMEClientCodesComponent } from './components/add-sme-client-code/add-sme-client-code.component';
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
import { ViewPeriodUnitsComponent } from './components/view-period-units/view-period-units.component';
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
import { ViewBranchComponent } from './components/view-branch/view-branch.component';
import { WizardBranchComponent } from './components/wizard-branch/wizard-branch.component';
import { ViewBranchManagersComponent } from './components/view-branch-managers/view-branch-managers.component';
import { ViewBranchOfficersComponent } from './components/view-branch-officers/view-branch-officers.component';
import { ViewBranchAddressesComponent } from './components/view-branch-addresses/view-branch-addresses.component';
import { ViewBusinessLinesComponent } from './components/view-business-lines/view-business-lines.component';
import { ViewAssetTypesComponent } from './components/view-asset-types/view-asset-types.component';
import { ViewAssetTypeCategoriesComponent } from './components/view-asset-type-categories/view-asset-type-categories.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { ViewSectorsComponent } from './components/view-sectors/view-sectors.component';
import { ViewClientStatusesComponent } from './components/view-client-statuses/view-client-statuses.component';
import { WizardClientStatusComponent } from './components/wizard-client-status/wizard-client-status.component';
import { ViewClientStatusComponent } from './components/view-client-status-actions/view-client-status.component';
import { ViewSMEClientCodesComponent } from './components/view-sme-client-code/view-sme-client-code.component';
import { ViewSubSectorsComponent } from './components/view-sub-sectors/view-sub-sectors.component';
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
import { AddDocTypesComponent } from './components/add-doc-types/add-doc-types.component';
import { ViewDocTypesComponent } from './components/view-doc-types/view-doc-types.component';
import { AddWorkFlowActionTypesComponent } from './components/add-workflow-action-types/add-workflow-action-types.component';
import { ViewWorkFlowActionTypesComponent } from './components/view-workflow-action-types/view-workflow-action-types.component';

const routes: Routes = [
  /**Lookup Module */
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
  //Workflow Action Types
  {
    path: 'add-workflow-action-types',
    component: AddWorkFlowActionTypesComponent,
  },
  {
    path: 'edit-workflow-action-types/:id',
    component: AddWorkFlowActionTypesComponent,
  },
  {
    path: 'view-workflow-action-types',
    component: ViewWorkFlowActionTypesComponent,
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
  {
    path: 'view-address-types',
    component: ViewAddressTypesComponent,
  },
  //Authority Offices
  {
    path: 'add-authority-offices',
    component: AddAuthorityOfficesComponent,
  },
  {
    path: 'edit-authority-offices/:id',
    component: AddAuthorityOfficesComponent,
  },
  {
    path: 'view-authority-offices',
    component: ViewAuthorityOfficesComponent,
  },
  //Branch
  {
    path: 'add-branch',
    component: AddBranchComponent,
  },
  {
    path: 'edit-branch/:id',
    component: AddBranchComponent,
  },
  {
    path: 'view-branches',
    component: ViewBranchComponent,
  },
  {
    path: 'wizard-branch/:branchId',
    component: WizardBranchComponent,
  },
  //countries
  {
    path: 'add-countries',
    component: AddCountriesComponent,
  },
  {
    path: 'edit-countries/:id',
    component: AddCountriesComponent,
  },
  {
    path: 'view-countries',
    component: ViewCountriesComponent,
  },
  //sectors
  {
    path: 'add-sectors',
    component: AddSectorsComponent,
  },
  {
    path: 'edit-sectors/:id',
    component: AddSectorsComponent,
  },
  {
    path: 'view-sectors',
    component: ViewSectorsComponent,
  },
  //sub sectors
  {
    path: 'add-sub-sectors',
    component: AddSubSectorsComponent,
  },
  {
    path: 'edit-sub-sectors/:id',
    component: AddSubSectorsComponent,
  },
  {
    path: 'view-sub-sectors',
    component: ViewSubSectorsComponent,
  },
  //tml officers
  {
    path: 'add-tml-officer-types',
    component: AddTmlOfficerTypesComponent,
  },
  {
    path: 'edit-tml-officer-types/:id',
    component: AddTmlOfficerTypesComponent,
  },
  {
    path: 'view-tml-officer-types',
    component: ViewTmlOfficerTypesComponent,
  },
  //Call Action Types
  {
    path: 'add-call-action-types',
    component: AddCallActionTypesComponent,
  },
  {
    path: 'edit-call-action-types/:id',
    component: AddCallActionTypesComponent,
  },
  {
    path: 'view-call-action-types',
    component: ViewCallActionTypesComponent,
  },
  //Areas
  {
    path: 'add-areas',
    component: AddAreasComponent,
  },
  {
    path: 'edit-areas/:id',
    component: AddAreasComponent,
  },
  {
    path: 'view-areas',
    component: ViewAreasComponent,
  },
  //Currencies
  {
    path: 'add-currencies',
    component: AddCurrenciesComponent,
  },
  {
    path: 'edit-currencies/:id',
    component: AddCurrenciesComponent,
  },
  {
    path: 'view-currencies',
    component: ViewCurrenciesComponent,
  },
  {
    path: 'wizard-currencies/:currencyId',
    component: WizardCurrenciesComponent,
  },
  //Asset Type categories
  {
    path: 'add-asset-type-categories',
    component: AddAssetTypeCategoriesComponent,
  },
  {
    path: 'edit-asset-type-categories/:id',
    component: AddAssetTypeCategoriesComponent,
  },

  {
    path: 'view-asset-type-categories',
    component: ViewAssetTypeCategoriesComponent,
  },

  //Currencies Exchange
  {
    path: 'add-currency-exchange-rates',
    component: AddCurrenciesExchangeComponent,
  },
  {
    path: 'add-currency-exchange-rates/:currencyId',
    component: AddCurrenciesExchangeComponent,
  },

  {
    path: 'edit-currency-exchange-rates/:id',
    component: AddCurrenciesExchangeComponent,
  },
  {
    path: 'view-currency-exchange-rates',
    component: ViewCurrencyExchangeComponent,
  },
  {
    path: 'view-currency-exchange-rates/:currencyId',
    component: ViewCurrencyExchangeComponent,
  },
  //Asset mandate status
  {
    path: 'add-mandate-statuses',
    component: AddMandateStatusesComponent,
  },
  {
    path: 'edit-mandate-statuses/:id',
    component: AddMandateStatusesComponent,
  },

  {
    path: 'view-mandate-statuses',
    component: ViewMandateStatusesComponent,
  },

  //Asset Types
  {
    path: 'add-asset-types',
    component: AddAssetTypesComponent,
  },
  {
    path: 'edit-asset-types/:id',
    component: AddAssetTypesComponent,
  },

  {
    path: 'view-asset-types',
    component: ViewAssetTypesComponent,
  },

  //Asset Types
  {
    path: 'add-fee-types',
    component: AddFeeTypesComponent,
  },
  {
    path: 'edit-fee-types/:id',
    component: AddFeeTypesComponent,
  },

  {
    path: 'view-fee-types',
    component: ViewFeeTypesComponent,
  },

  //Call Types
  {
    path: 'add-call-types',
    component: AddCallTypesComponent,
  },
  {
    path: 'edit-call-types/:id',
    component: AddCallTypesComponent,
  },
  {
    path: 'view-call-types',
    component: ViewCallTypesComponent,
  },

  //Business Lines
  {
    path: 'add-business-lines',
    component: AddBusinessLinesComponent,
  },
  {
    path: 'edit-business-lines/:id',
    component: AddBusinessLinesComponent,
  },
  {
    path: 'view-business-lines',
    component: ViewBusinessLinesComponent,
  },
  //Client Types
  {
    path: 'add-client-types',
    component: AddClientTypesComponent,
  },
  {
    path: 'edit-client-types/:id',
    component: AddClientTypesComponent,
  },
  {
    path: 'view-client-types',
    component: ViewClientTypesComponent,
  },
  //Communication Flow Types
  {
    path: 'add-communication-flow-types',
    component: AddCommunicationFlowTypesComponent,
  },
  {
    path: 'edit-communication-flow-types/:id',
    component: AddCommunicationFlowTypesComponent,
  },
  {
    path: 'view-communication-flow-types',
    component: ViewCommunicationFlowTypeComponent,
  },
  //Communication Types
  {
    path: 'add-communication-types',
    component: AddCommunicationTypesComponent,
  },
  {
    path: 'edit-communication-types/:id',
    component: AddCommunicationTypesComponent,
  },
  {
    path: 'view-communication-types',
    component: ViewCommunicationTypesComponent,
  },
  //Grace period units
  {
    path: 'add-period-units',
    component: AddPeriodUnitsComponent,
  },
  {
    path: 'edit-period-units/:id',
    component: AddPeriodUnitsComponent,
  },
  {
    path: 'view-period-units',
    component: ViewPeriodUnitsComponent,
  },
  //Identification Types
  {
    path: 'add-identification-types',
    component: AddIdentificationTypesComponent,
  },
  {
    path: 'edit-identification-types/:id',
    component: AddIdentificationTypesComponent,
  },
  {
    path: 'view-identification-types',
    component: ViewIdentificationTypesComponent,
  },
  //Insured By
  {
    path: 'add-insured-by',
    component: AddInsuredByComponent,
  },
  {
    path: 'edit-insured-by/:id',
    component: AddInsuredByComponent,
  },
  {
    path: 'view-insured-by',
    component: ViewInsuredByComponent,
  },
  //Interest Rate Benchmark
  {
    path: 'add-interest-rate-benchmarks',
    component: AddInterestRateBenchmarksComponent,
  },
  {
    path: 'edit-interest-rate-benchmarks/:id',
    component: AddInterestRateBenchmarksComponent,
  },
  {
    path: 'view-interest-rate-benchmarks',
    component: ViewInterestRateBenchmarksComponent,
  },
  //Leasing Types
  {
    path: 'add-leasing-types',
    component: AddLeasingTypeComponent,
  },
  {
    path: 'edit-leasing-types/:id',
    component: AddLeasingTypeComponent,
  },
  {
    path: 'view-leasing-types',
    component: ViewLeasingTypeComponent,
  },
  //Meeting Types
  {
    path: 'add-meeting-types',
    component: AddMeetingTypesComponent,
  },
  {
    path: 'edit-meeting-types/:id',
    component: AddMeetingTypesComponent,
  },
  {
    path: 'view-meeting-types',
    component: ViewMeetingTypesComponent,
  },
  //Payment Methods
  {
    path: 'add-payment-methods',
    component: AddPaymentMethodsComponent,
  },
  {
    path: 'edit-payment-methods/:id',
    component: AddPaymentMethodsComponent,
  },
  {
    path: 'view-payment-methods',
    component: ViewPaymentMethodsComponent,
  },
  //Payment Types
  {
    path: 'add-payment-types',
    component: AddPaymentTypesComponent,
  },
  {
    path: 'edit-payment-types/:id',
    component: AddPaymentTypesComponent,
  },
  {
    path: 'view-payment-types',
    component: ViewPaymentTypesComponent,
  },
  //payment month days
  {
    path: 'add-payment-month-day',
    component: AddPaymentMonthDaysComponent,
  },
  {
    path: 'edit-payment-month-day/:id',
    component: AddPaymentMonthDaysComponent,
  },
  {
    path: 'view-payment-month-days',
    component: ViewPaymentMonthDaysComponent,
  },
  //Phone Types
  {
    path: 'add-phone-types',
    component: AddPhoneTypesComponent,
  },
  {
    path: 'edit-phone-types/:id',
    component: AddPhoneTypesComponent,
  },
  {
    path: 'view-phone-types',
    component: ViewPhoneTypesComponent,
  },
  //Rent Structure Types
  {
    path: 'add-rent-structure-types',
    component: AddRentStructureTypesComponent,
  },
  {
    path: 'edit-rent-structure-types/:id',
    component: AddRentStructureTypesComponent,
  },
  {
    path: 'view-rent-structure-types',
    component: ViewRentStructureTypesComponent,
  },
  //SME Client Code
  {
    path: 'add-sme-client-code',
    component: AddSMEClientCodesComponent,
  },
  {
    path: 'edit-sme-client-code/:id',
    component: AddSMEClientCodesComponent,
  },
  {
    path: 'view-sme-client-codes',
    component: ViewSMEClientCodesComponent,
  },
  //Doc Types
  {
    path: 'add-document-types',
    component: AddDocTypesComponent,
  },
  {
    path: 'edit-document-types/:id',
    component: AddDocTypesComponent,
  },
  {
    path: 'view-document-types',
    component: ViewDocTypesComponent,
  },
  {
    path: 'add-mandate-statuses',
    component: AddMandateStatusesComponent,
  },

  {
    path: 'add-fees-types',
    component: AddFeeTypesComponent,
  },

  {
    path: 'add-mandate-validity-unit',
    component: AddMandateValidityUnitComponent,
  },

  {
    path: 'edit-mandate-validity-unit/:id',
    component: AddMandateValidityUnitComponent,
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
    path: 'add-asset-types',
    component: AddAssetTypesComponent,
  },
  {
    path: 'add-products',
    component: AddProductsComponent,
  },
  {
    path: 'edit-products/:id',
    component: AddProductsComponent,
  },
  {
    path: 'add-client-status-actions',
    component: AddClientStatusActionsComponent,
  },

  {
    path: 'add-governorates',
    component: AddGovernoratesComponent,
  },
  {
    path: 'edit-governorates/:id',
    component: AddGovernoratesComponent,
  },
  {
    path: 'add-countries',
    component: AddCountriesComponent,
  },

  {
    path: 'add-tax-offices',
    component: AddTaxOfficesComponent,
  },
  {
    path: 'edit-tax-offices/:id',
    component: AddTaxOfficesComponent,
  },
  {
    path: 'add-tml-officer-types',
    component: AddTmlOfficerTypesComponent,
  },

  {
    path: 'view-fee-types',
    component: ViewFeeTypesComponent,
  },

  {
    path: 'view-period-units',
    component: ViewPeriodUnitsComponent,
  },

  {
    path: 'view-mandate-validity-unit',
    component: ViewMandateValidityUnitComponent,
  },

  {
    path: 'view-branch-managers/:branchId',
    component: ViewBranchManagersComponent,
  },
  {
    path: 'view-branch-officers/:branchId',
    component: ViewBranchOfficersComponent,
  },
  {
    path: 'view-branch-addresses/:branchId',
    component: ViewBranchAddressesComponent,
  },
  {
    path: 'view-business-lines',
    component: ViewBusinessLinesComponent,
  },
  {
    path: 'view-asset-types',
    component: ViewAssetTypesComponent,
  },
  {
    path: 'view-products',
    component: ViewProductsComponent,
  },

  {
    path: 'view-client-status',
    component: ViewClientStatusComponent,
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
    path: 'view-tax-offices',
    component: ViewTaxOfficesComponent,
  },
  {
    path: 'view-tml-officer-types',
    component: ViewTmlOfficerTypesComponent,
  },

  //Client status
  {
    path: 'add-client-statuses',
    component: AddClientStatusesComponent,
  },
  {
    path: 'view-client-status-actions/:clientStatusId',
    component: ViewClientStatusComponent,
  },
  {
    path: 'edit-client-statuses/:id',
    component: AddClientStatusesComponent,
  },
  {
    path: 'view-client-statuses',
    component: ViewClientStatusesComponent,
  },
  {
    path: 'wizard-client-status/:clientStatusId',
    component: WizardClientStatusComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LookupsRoutingModule {}
