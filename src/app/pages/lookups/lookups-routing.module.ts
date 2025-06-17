import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyTypesComponent } from './components/company-types/add-company-types/add-company-types.component';
import { AddFeeCalculationTypesComponent } from './components/fee-calculation-types/add-fee-calculation-types/add-fee-calculation-types.component';
import { AddInterestRateBenchmarksComponent } from './components/interest-rate-benchmarks/add-interest-rate-benchmarks/add-interest-rate-benchmarks.component';
import { AddFeeTypesComponent } from './components/fee-types/add-fee-types/add-fee-types.component';
import { AddPeriodUnitsComponent } from './components/period-units/add-period-units/add-period-units.component';
import { AddRentStructureTypesComponent } from './components/rent-structure-types/add-rent-structure-types/add-rent-structure-types.component';
import { AddCurrenciesComponent } from './components/currencies/add-currencies/add-currencies.component';
import { AddPaymentMethodsComponent } from './components/payment-methods/add-payment-methods/add-payment-methods.component';
import { AddPaymentTypesComponent } from './components/payment-types/add-payment-types/add-payment-types.component';
import { AddPaymentMonthDaysComponent } from './components/payment-month-days/add-payment-month-days/add-payment-month-days.component';
import { AddMeetingTypesComponent } from './components/meeting-types/add-meeting-types/add-meeting-types.component';
import { AddInsuredByComponent } from './components/insured-by/add-insured-by/add-insured-by.component';
import { AddLeasingTypeComponent } from './components/leasing-types/add-leasing-type/add-leasing-type.component';
import { AddMandateValidityUnitComponent } from './components/mandate-validity-units/add-mandate-validity-unit/add-mandate-validity-unit.component';
import { AddBusinessLinesComponent } from './components/business-lines/add-business-lines/add-business-lines.component';
import { AddAssetTypesComponent } from './components/asset-types/add-asset-types/add-asset-types.component';
import { AddCurrenciesExchangeComponent } from './components/currencies/add-currencies-exchange/add-currencies-exchange.component';
import { AddAssetTypeCategoriesComponent } from './components/asset-type-categories/add-asset-type-categories/add-asset-type-categories.component';
import { AddProductsComponent } from './components/products/add-products/add-products.component';
import { AddSectorsComponent } from './components/sectors/add-sectors/add-sectors.component';
import { AddSMEClientCodesComponent } from './components/sme-client-codes/add-sme-client-code/add-sme-client-code.component';
import { AddSubSectorsComponent } from './components/sub-sectors/add-sub-sectors/add-sub-sectors.component';
import { AddClientTypesComponent } from './components/client-types/add-client-types/add-client-types.component';
import { AddAuthorityOfficesComponent } from './components/authority-offices/add-authority-offices/add-authority-offices.component';
import { AddPhoneTypesComponent } from './components/phone-types/add-phone-types/add-phone-types.component';
import { AddAddressTypesComponent } from './components/address-types/add-address-types/add-address-types.component';
import { AddGovernoratesComponent } from './components/governorates/add-governorates/add-governorates.component';
import { AddCountriesComponent } from './components/countries/add-countries/add-countries.component';
import { AddIdentificationTypesComponent } from './components/identification-types/add-identification-types/add-identification-types.component';
import { AddAreasComponent } from './components/areas/add-areas/add-areas.component';
import { AddTaxOfficesComponent } from './components/tax-offices/add-tax-offices/add-tax-offices.component';
import { AddTmlOfficerTypesComponent } from './components/tml-officer-types/add-tml-officer-types/add-tml-officer-types.component';
import { AddCallTypesComponent } from './components/call-types/add-call-types/add-call-types.component';
import { AddCommunicationTypesComponent } from './components/communication-types/add-communication-types/add-communication-types.component';
import { AddCallActionTypesComponent } from './components/call-action-types/add-call-action-types/add-call-action-types.component';
import { AddCommunicationFlowTypesComponent } from './components/communication-flow-types/add-communication-flow-types/communication-flow-types.component';
import { ViewCompanyTypesComponent } from './components/company-types/view-company-types/view-company-types.component';
import { ViewFeesCalculationTypesComponent } from './components/fee-calculation-types/view-fees-calculation-types/view-fees-calculation-types.component';
import { ViewInterestRateBenchmarksComponent } from './components/interest-rate-benchmarks/view-interest-rate-benchmarks/view-interest-rate-benchmarks.component';
import { ViewFeeTypesComponent } from './components/fee-types/view-fee-types/view-fee-types.component';
import { ViewPeriodUnitsComponent } from './components/period-units/view-period-units/view-period-units.component';
import { ViewRentStructureTypesComponent } from './components/rent-structure-types/view-rent-structure-types/view-rent-structure-types.component';
import { ViewCurrenciesComponent } from './components/currencies/view-currencies/view-currencies.component';
import { WizardCurrenciesComponent } from './components/currencies/wizard-currencies/wizard-currencies.component';
import { ViewCurrencyExchangeComponent } from './components/currencies/view-currency-exchange/view-currency-exchange.component';
import { ViewPaymentMethodsComponent } from './components/payment-methods/view-payment-methods/view-payment-methods.component';
import { ViewPaymentTypesComponent } from './components/payment-types/view-payment-types/view-payment-types.component';
import { ViewPaymentMonthDaysComponent } from './components/payment-month-days/view-payment-month-days/view-payment-month-days.component';
import { ViewMeetingTypesComponent } from './components/meeting-types/view-meeting-types/view-meeting-types.component';
import { ViewInsuredByComponent } from './components/insured-by/view-insured-by/view-insured-by.component';
import { ViewLeasingTypeComponent } from './components/leasing-types/view-leasing-type/view-leasing-type.component';
import { ViewMandateValidityUnitComponent } from './components/mandate-validity-units/view-mandate-validity-unit/view-mandate-validity-unit.component';
import { ViewBusinessLinesComponent } from './components/business-lines/view-business-lines/view-business-lines.component';
import { ViewAssetTypesComponent } from './components/asset-types/view-asset-types/view-asset-types.component';
import { ViewAssetTypeCategoriesComponent } from './components/asset-type-categories/view-asset-type-categories/view-asset-type-categories.component';
import { ViewProductsComponent } from './components/products/view-products/view-products.component';
import { ViewSectorsComponent } from './components/sectors/view-sectors/view-sectors.component';
import { ViewSMEClientCodesComponent } from './components/sme-client-codes/view-sme-client-code/view-sme-client-code.component';
import { ViewSubSectorsComponent } from './components/sub-sectors/view-sub-sectors/view-sub-sectors.component';
import { ViewClientTypesComponent } from './components/client-types/view-client-types/view-client-types.component';
import { ViewAuthorityOfficesComponent } from './components/authority-offices/view-authority-offices/view-authority-offices.component';
import { ViewPhoneTypesComponent } from './components/phone-types/view-phone-types/view-phone-types.component';
import { ViewAddressTypesComponent } from './components/address-types/view-address-types/view-address-types.component';
import { ViewGovernoratesComponent } from './components/governorates/view-governorates/view-governorates.component';
import { ViewCountriesComponent } from './components/countries/view-countries/view-countries.component';
import { ViewIdentificationTypesComponent } from './components/identification-types/view-identification-types/view-identification-types.component';
import { ViewAreasComponent } from './components/areas/view-areas/view-areas.component';
import { ViewTaxOfficesComponent } from './components/tax-offices/view-tax-offices/view-tax-offices.component';
import { ViewTmlOfficerTypesComponent } from './components/tml-officer-types/view-tml-officer-types/view-tml-officer-types.component';
import { ViewCallTypesComponent } from './components/call-types/view-call-types/view-call-types.component';
import { ViewCommunicationTypesComponent } from './components/communication-types/view-communication-types/view-communication-types.component';
import { ViewCallActionTypesComponent } from './components/call-action-types/view-call-action-types/view-call-action-types.component';
import { ViewCommunicationFlowTypeComponent } from './components/communication-flow-types/view-communication-flow-type/view-communication-flow-type.component';
import { AddDocTypesComponent } from './components/doc-types/add-doc-types/add-doc-types.component';
import { ViewDocTypesComponent } from './components/doc-types/view-doc-types/view-doc-types.component';
import { AddWorkFlowActionTypesComponent } from './components/workflow-action-types/add-workflow-action-types/add-workflow-action-types.component';
import { ViewWorkFlowActionTypesComponent } from './components/workflow-action-types/view-workflow-action-types/view-workflow-action-types.component';
import { AddClientStatusesComponent } from './components/client-statuses/add-client-status/add-client-status.component';
import { ViewClientStatusActionsComponent } from './components/client-statuses/view-client-status-actions/view-client-status-actions.component';
import { ViewClientStatusesComponent } from './components/client-statuses/view-client-statuses/view-client-statuses.component';
import { AddClientStatusActionsComponent } from './components/client-statuses/add-client-status-action/add-client-status-actions.component';
import { AddClientOfficerTypesComponent } from './components/client-officer-types/add-client-officer-types/add-client-officer-types.component';
import { ViewClientOfficerTypesComponent } from './components/client-officer-types/view-client-officer-types/view-client-officer-types.component';
import { AddAuthorizationGroupsComponent } from './components/authorization-groups/add-authorization-groups/add-authorization-groups.component';
import { ViewAuthorizationGroupsComponent } from './components/authorization-groups/view-authorization-groups/view-authorization-groups.component';
import { AddFollowupTypesComponent } from './components/followup-types/add-followup-types/add-followup-types.component';
import { ViewFollowUpTypesComponent } from './components/followup-types/view-followup-types/view-followup-types.component';
import { AddInterestTypesComponent } from './components/interestType-types/add-interest-types/add-interest-types.component';
import { ViewInterestTypesComponent } from './components/interestType-types/view-interest-types/view-interest-types.component';
import { AddFeeRangesComponent } from './components/fee-ranges/add-fee-ranges/add-fee-ranges.component';
import { ViewFeeRangesComponent } from './components/fee-ranges/view-fee-ranges/view-fee-ranges.component';
import { ViewPaymentPeriodsComponent } from './components/payment-periods/view-payment-periods/view-payment-periods.component';
import { AddPaymentPeriodsComponent } from './components/payment-periods/add-payment-periods/add-payment-periods.component';
import { AddPaymentTimingTermsComponent } from './components/payment-timing-terms/add-payment-timing-terms/add-payment-timing-terms.component';
import { ViewPaymentTimingTermsComponent } from './components/payment-timing-terms/view-payment-timing-terms/view-payment-timing-terms.component';
import { ViewNotificationGroupsComponent } from './components/notification-groups/view-notification-groups/view-notification-groups.component';
import { AddNotificationGroupsComponent } from './components/notification-groups/add-notification-groups/add-notification-groups.component';
import { ViewNotificationGroupOfficersComponent } from './components/notification-group-officers/view-notification-group-officers/view-notification-notification-group-officers.component';
import { AddNotificationGroupOfficersComponent } from './components/notification-group-officers/add-notification-group-officers/add-notification-group-officers.component';
import { ViewAuthorizationGroupOfficersComponent } from './components/authorization-group-officers/view-authorization-group-officers/view-authorization-group-officers.component';
import { AddAuthorizationGroupOfficersComponent } from './components/authorization-group-officers/add-authorization-group-officers/add-authorization-group-officers.component';
import { ViewConditionExpressionsComponent } from './components/condition-expressions/view-condition-expressions/view-condition-expressions.component';
import { AddConditionExpressionsComponent } from './components/condition-expressions/add-condition-expressions/add-condition-expressions.component';
import { AddConditionsComponent } from './components/conditions/add-conditions/add-conditions.component';
import { ViewConditionsComponent } from './components/conditions/view-conditions/view-conditions.component';
import { WizardClientStatusActionComponent } from './components/client-statuses/wizard-client-status-action/wizard-client-status-action.component';
import { AddActionAuthorizationGroupsComponent } from './components/client-statuses/ClientStatusActionActivities/ClientStatusActionAuthorizationGroup/add-action-authorization-group/add-action-authorization-group.component';
import { ViewActionAuthorizationGroupsComponent } from './components/client-statuses/ClientStatusActionActivities/ClientStatusActionAuthorizationGroup/view-action-authorization-group/view-action-authorization-group.component';
import { AddActionNotificationGroupsComponent } from './components/client-statuses/ClientStatusActionActivities/ClientStatusActionNotificationGroup/add-action-notification-group/add-action-notification-group.component';
import { ViewActionNotificationGroupsComponent } from './components/client-statuses/ClientStatusActionActivities/ClientStatusActionNotificationGroup/view-action-notification-group/view-action-notification-group.component';
import { AddMandateStatusActionsComponent } from './components/mandate-statuses/add-mandate-status-action/add-mandate-status-actions.component';
import { AddMandateStatusesComponent } from './components/mandate-statuses/add-mandate-status/add-mandate-status.component';
import { ViewMandateStatusActionsComponent } from './components/mandate-statuses/view-mandate-status-actions/view-mandate-status-actions.component';
import { ViewMandateStatusesComponent } from './components/mandate-statuses/view-mandate-statuses/view-mandate-statuses.component';
import { WizardMandateStatusActionComponent } from './components/mandate-statuses/wizard-mandate-status-action/wizard-mandate-status-action.component';
import { AddMandateActionAuthorizationGroupsComponent } from './components/mandate-statuses/Activities/MandateStatusActionAuthorizationGroup/add-mandate-authorization-group/add-mandate-authorization-group.component';
import { ViewMandateActionAuthorizationGroupsComponent } from './components/mandate-statuses/Activities/MandateStatusActionAuthorizationGroup/view-mandate-authorization-group/view-mandate-authorization-group.component';
import { AddMandateActionNotificationGroupsComponent } from './components/mandate-statuses/Activities/MandateStatusActionNotificationGroup/add-mandate-notification-group/add-mandate-notification-group.component';
import { ViewMandateActionNotificationGroupsComponent } from './components/mandate-statuses/Activities/MandateStatusActionNotificationGroup/view-mandate-notification-group/view-mandate-notification-group.component';
import { PendingChangesGuard } from '../../shared/guards/pending-changes.guard';

const routes: Routes = [
  /**Lookup Module */

  //Followup Types
  {
    path: 'add-followup-types',
    component: AddFollowupTypesComponent,
  },
  {
    path: 'edit-followup-types/:id',
    component: AddFollowupTypesComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-followup-types',
    component: ViewFollowUpTypesComponent,
  },

  //Interest Types
  {
    path: 'add-interest-types',
    component: AddInterestTypesComponent,
  },
  {
    path: 'edit-interest-types/:id',
    component: AddInterestTypesComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-interest-types',
    component: ViewInterestTypesComponent,
  },

  //fees ranges
  {
    path: 'add-fee-ranges',
    component: AddFeeRangesComponent,
  },
  {
    path: 'edit-fee-ranges/:id',
    component: AddFeeRangesComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-fee-ranges',
    component: ViewFeeRangesComponent,
  },

  //Company Types
  {
    path: 'add-company-types',
    component: AddCompanyTypesComponent,
  },
  {
    path: 'edit-company-types/:id',
    component: AddCompanyTypesComponent,
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-authority-offices',
    component: ViewAuthorityOfficesComponent,
  },

  //countries
  {
    path: 'add-countries',
    component: AddCountriesComponent,
  },
  {
    path: 'edit-countries/:id',
    component: AddCountriesComponent,
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-call-action-types',
    component: ViewCallActionTypesComponent,
  },
  //client-officer-types
  {
    path: 'add-client-officer-types',
    component: AddClientOfficerTypesComponent,
  },
  {
    path: 'edit-client-officer-types/:id',
    component: AddClientOfficerTypesComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-client-officer-types',
    component: ViewClientOfficerTypesComponent,
  },
  //Areas
  {
    path: 'add-areas',
    component: AddAreasComponent,
  },
  {
    path: 'edit-areas/:id',
    component: AddAreasComponent,
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-currency-exchange-rates',
    component: ViewCurrencyExchangeComponent,
  },
  {
    path: 'view-currency-exchange-rates/:currencyId',
    component: ViewCurrencyExchangeComponent,
  },

  //Asset Types
  {
    path: 'add-asset-types',
    component: AddAssetTypesComponent,
  },
  {
    path: 'edit-asset-types/:id',
    component: AddAssetTypesComponent,
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-payment-types',
    component: ViewPaymentTypesComponent,
  },

  //Payment Periods
  {
    path: 'add-payment-periods',
    component: AddPaymentPeriodsComponent,
  },
  {
    path: 'edit-payment-periods/:id',
    component: AddPaymentPeriodsComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-payment-periods',
    component: ViewPaymentPeriodsComponent,
  },

  //Payment Timing Terms
  {
    path: 'add-payment-timing-terms',
    component: AddPaymentTimingTermsComponent,
  },
  {
    path: 'edit-payment-timing-terms/:id',
    component: AddPaymentTimingTermsComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-payment-timing-terms',
    component: ViewPaymentTimingTermsComponent,
  },

  //payment month days
  {
    path: 'add-payment-month-day',
    component: AddPaymentMonthDaysComponent,
  },
  {
    path: 'edit-payment-month-day/:id',
    component: AddPaymentMonthDaysComponent,
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-document-types',
    component: ViewDocTypesComponent,
  },
  //Client Statuses
  {
    path: 'add-client-status',
    component: AddClientStatusesComponent,
  },
  {
    path: 'view-client-status-actions/:clientStatusId',
    component: ViewClientStatusActionsComponent,
  },
  {
    path: 'edit-client-status/:id',
    component: AddClientStatusesComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-client-statuses',
    component: ViewClientStatusesComponent,
  },
  {
    path: 'wizard-client-status-action/:clientStatusActionId',
    component: WizardClientStatusActionComponent,
  },
  {
    path: 'add-client-status-actions',
    component: AddClientStatusActionsComponent,
  },
  {
    path: 'edit-client-status-actions/:id',
    component: AddClientStatusActionsComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-client-status-actions',
    component: ViewClientStatusActionsComponent,
  },

  //Mandate Statuses
  {
    path: 'add-mandate-status',
    component: AddMandateStatusesComponent,
  },
  {
    path: 'view-mandate-status-actions/:mandateStatusId',
    component: ViewMandateStatusActionsComponent,
  },
  {
    path: 'edit-mandate-status/:id',
    component: AddMandateStatusesComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-mandate-statuses',
    component: ViewMandateStatusesComponent,
  },
  {
    path: 'wizard-mandate-status-action/:mandateStatusActionId',
    component: WizardMandateStatusActionComponent,
  },
  {
    path: 'add-mandate-status-actions',
    component: AddMandateStatusActionsComponent,
  },
  {
    path: 'edit-mandate-status-actions/:id',
    component: AddMandateStatusActionsComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-mandate-status-actions',
    component: ViewMandateStatusActionsComponent,
  },

  {
    path: 'add-mandate-validity-unit',
    component: AddMandateValidityUnitComponent,
  },

  {
    path: 'edit-mandate-validity-unit/:id',
    component: AddMandateValidityUnitComponent,
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
  },

  {
    path: 'add-governorate',
    component: AddGovernoratesComponent,
  },
  {
    path: 'edit-governorate/:id',
    component: AddGovernoratesComponent,
    canDeactivate: [PendingChangesGuard],
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
    canDeactivate: [PendingChangesGuard],
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
  //Address Types
  {
    path: 'add-authorization-groups',
    component: AddAuthorizationGroupsComponent,
  },
  {
    path: 'edit-authorization-groups/:id',
    component: AddAuthorizationGroupsComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-authorization-groups',
    component: ViewAuthorizationGroupsComponent,
  },

  //notification groups
  {
    path: 'add-notification-groups',
    component: AddNotificationGroupsComponent,
  },
  {
    path: 'edit-notification-groups/:id',
    component: AddNotificationGroupsComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-notification-groups',
    component: ViewNotificationGroupsComponent,
  },

  //notification group officers
  {
    path: 'add-notification-group-officers',
    component: AddNotificationGroupOfficersComponent,
  },
  {
    path: 'edit-notification-group-officers/:id',
    component: AddNotificationGroupOfficersComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-notification-group-officers',
    component: ViewNotificationGroupOfficersComponent,
  },

  //ConditionExpression
  {
    path: 'add-condition-expressions',
    component: AddConditionExpressionsComponent,
  },
  {
    path: 'edit-condition-expressions/:id',
    component: AddConditionExpressionsComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-condition-expressions',
    component: ViewConditionExpressionsComponent,
  },

  //Conditions
  {
    path: 'add-conditions',
    component: AddConditionsComponent,
  },
  {
    path: 'edit-conditions/:id',
    component: AddConditionsComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-conditions',
    component: ViewConditionsComponent,
  },

  //notification group officers
  {
    path: 'add-authorization-group-officers',
    component: AddAuthorizationGroupOfficersComponent,
  },
  {
    path: 'edit-authorization-group-officers/:id',
    component: AddAuthorizationGroupOfficersComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-authorization-group-officers',
    component: ViewAuthorizationGroupOfficersComponent,
  },

  {
    path: 'add-action-authorizationGroups',
    component: AddActionAuthorizationGroupsComponent,
  },
  {
    path: 'add-action-authorizationGroups/:clientStatusActionId',
    component: AddActionAuthorizationGroupsComponent,
  },
  {
    path: 'edit-action-authorizationGroups/:id',
    component: AddActionAuthorizationGroupsComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-action-authorizationGroups/:clientStatusActionId',
    component: ViewActionAuthorizationGroupsComponent,
  },
  {
    path: 'add-action-notificationGroups',
    component: AddActionNotificationGroupsComponent,
  },
  {
    path: 'add-action-notificationGroups/:clientStatusActionId',
    component: AddActionNotificationGroupsComponent,
  },
  {
    path: 'edit-action-notificationGroups/:id',
    component: AddActionNotificationGroupsComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-action-notificationGroups/:clientStatusActionId',
    component: ViewActionNotificationGroupsComponent,
  },

  {
    path: 'add-mandate-action-authorizationGroups',
    component: AddMandateActionAuthorizationGroupsComponent,
  },
  {
    path: 'add-mandate-action-authorizationGroups/:mandateStatusActionId',
    component: AddMandateActionAuthorizationGroupsComponent,
  },
  {
    path: 'edit-mandate-action-authorizationGroups/:id',
    component: AddMandateActionAuthorizationGroupsComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-mandate-action-authorizationGroups/:mandateStatusActionId',
    component: ViewMandateActionAuthorizationGroupsComponent,
  },
  {
    path: 'add-mandate-action-notificationGroups',
    component: AddMandateActionNotificationGroupsComponent,
  },
  {
    path: 'add-mandate-action-notificationGroups/:mandateStatusActionId',
    component: AddMandateActionNotificationGroupsComponent,
  },
  {
    path: 'edit-mandate-action-notificationGroups/:id',
    component: AddMandateActionNotificationGroupsComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-mandate-action-notificationGroups/:mandateStatusActionId',
    component: ViewMandateActionNotificationGroupsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LookupsRoutingModule {}
