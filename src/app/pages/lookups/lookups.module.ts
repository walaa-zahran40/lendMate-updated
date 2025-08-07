import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { StepperModule } from 'primeng/stepper';
import { TabsModule } from 'primeng/tabs';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
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
import { AddAssetTypeCategoriesComponent } from './components/asset-type-categories/add-asset-type-categories/add-asset-type-categories.component';
import { AddProductsComponent } from './components/products/add-products/add-products.component';
import { AddSectorsComponent } from './components/sectors/add-sectors/add-sectors.component';
import { AddSMEClientCodesComponent } from './components/sme-client-codes/add-sme-client-code/add-sme-client-code.component';
import { AddSubSectorsComponent } from './components/sub-sectors/add-sub-sectors/add-sub-sectors.component';
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
import { AddCurrenciesExchangeComponent } from './components/currencies/add-currencies-exchange/add-currencies-exchange.component';
import { LookupsRoutingModule } from './lookups-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AddDocTypesComponent } from './components/doc-types/add-doc-types/add-doc-types.component';
import { AddClientTypesComponent } from './components/client-types/add-client-types/add-client-types.component';
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
import { ViewInsuredByComponent } from './components/insured-by/view-insured-by/view-insured-by.component';
import { ViewLeasingTypeComponent } from './components/leasing-types/view-leasing-type/view-leasing-type.component';
import { ViewMandateValidityUnitComponent } from './components/mandate-validity-units/view-mandate-validity-unit/view-mandate-validity-unit.component';
import { ViewDocTypesComponent } from './components/doc-types/view-doc-types/view-doc-types.component';
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
import { CompanyTypesEffects } from './store/company-types/company-types.effects';
import { reducer as companyTypesReducer } from './store/company-types/company-types.reducer';
import { reducer as feeCalcReducer } from './store/fee-calculation-types/fee-calculation-types.reducer';
import { FeeCalculationTypesEffects } from './store/fee-calculation-types/fee-calculation-types.effects';
import { reducer as addressTypeReducer } from './store/address-types/address-types.reducer';
import { AddressTypesEffects } from './store/address-types/address-types.effects';
import { reducer as authorityOfficeReducer } from './store/authority-offices/authority-offices.reducer';
import { AuthorityOfficesEffects } from './store/authority-offices/authority-offices.effects';
import { reducer as callActionTypesReducer } from './store/call-action-types/call-action-types.reducer';
import { reducer as clientOfficerTypesReducer } from './store/client-officer-types/client-officer-types.reducer';
import { CallActionTypesEffects } from './store/call-action-types/call-action-types.effects';
import { reducer as currenciesReducer } from './store/currencies/currencies.reducer';
import { reducer as callTypesReducer } from './store/call-types/call-types.reducer';
import { CallTypesEffects } from './store/call-types/call-types.effects';
import { CurrenciesEffects } from './store/currencies/currencies.effects';
import { reducer as businessLinesReducer } from './store/business-lines/business-lines.reducer';
import { BusinessLinesEffects } from './store/business-lines/business-lines.effects';
import { reducer as clientTypesReducer } from './store/client-types/client-types.reducer';
import { ClientTypesEffects } from './store/client-types/client-types.effects';
import { reducer as communicationFlowTypesReducer } from './store/communication-flow-types/communication-flow-types.reducer';
import { CommunicationFlowTypesEffects } from './store/communication-flow-types/communication-flow-types.effects';
import { reducer as communicationTypesReducer } from './store/communication-types/communication-types.reducer';
import { CommunicationTypesEffects } from './store/communication-types/communication-types.effects';
import { reducer as gracePeriodUnitsReducer } from './store/period-units/period-units.reducer';
import { GracePeriodUnitsEffects } from './store/period-units/period-units.effects';
import { reducer as IdentificationTypesReducer } from './store/identification-types/identification-types.reducer';
import { IdentificationTypesEffects } from './store/identification-types/identification-types.effects';
import { reducer as InsuredByReducer } from './store/insured-by/insured-by.reducer';
import { InsuredByEffects } from './store/insured-by/insured-by.effects';
import { reducer as InterestRateBenchmarksReducer } from './store/interest-rate-benchmarks/interest-rate-benchmarks.reducer';
import { InterestRateBenchMarksEffects } from './store/interest-rate-benchmarks/interest-rate-benchmarks.effects';
import { reducer as LeasingTypesReducer } from './store/leasing-types/leasing-types.reducer';
import { LeasingTypesEffects } from './store/leasing-types/leasing-types.effects';
import { reducer as MeetingTypesReducer } from './store/meeting-types/meeting-types.reducer';
import { MeetingTypesEffects } from './store/meeting-types/meeting-types.effects';
import { ViewMeetingTypesComponent } from './components/meeting-types/view-meeting-types/view-meeting-types.component';
import { reducer as PaymentMethodsReducer } from './store/payment-methods/payment-methods.reducer';
import { PaymentMethodsEffects } from './store/payment-methods/payment-methods.effects';
import { ViewPaymentTypesComponent } from './components/payment-types/view-payment-types/view-payment-types.component';
import { reducer as PaymentTypesReducer } from './store/payment-types/payment-types.reducer';
import { PaymentTypesEffects } from './store/payment-types/payment-types.effects';
import { AssetTypeCategoriesEffects } from './store/asset-type-categories/asset-type-categories.effects';
import { reducer as assetTypeCategoriesReducer } from './store/asset-type-categories/asset-type-categories.reducer';
import { AssetTypesEffects } from './store/asset-types/asset-types.effects';
import { reducer as assetTypesReducer } from './store/asset-types/asset-types.reducer';
import { reducer as PhoneTypesReducer } from './store/phone-types/phone-types.reducer';
import { PhoneTypesEffects } from './store/phone-types/phone-types.effects';
import { reducer as RentStructureTypesReducer } from './store/rent-structure-types/rent-structure-types.reducer';
import { RentStructureTypesEffects } from './store/rent-structure-types/rent-structure-types.effects';
import { reducer as SectorsReducer } from './store/sectors/sectors.reducer';
import { SectorsEffects } from './store/sectors/sectors.effects';
import { reducer as TmlOfficerTypesReducer } from './store/tml-officer-types/tml-officer-types.reducer';
import { TmlOfficerTypesEffects } from './store/tml-officer-types/tml-officer-types.effects';
import { reducer as SubSectorsReducer } from './store/sub-sectors/sub-sectors.reducer';
import { SubSectorsEffects } from './store/sub-sectors/sub-sectors.effects';
import { reducer as docTypesReducer } from './store/doc-types/doc-types.reducer';
import { DocTypesEffects } from './store/doc-types/doc-types.effects';
import { CountriesEffects } from './store/countries/countries.effects';
import { reducer as countriesReducer } from './store/countries/countries.reducer';
import { reducer as AreasReducer } from './store/areas/areas.reducer';
import { AreasEffects } from './store/areas/areas.effects';
import { reducer as MandateValidityUnitsReducer } from './store/mandate-validity-units/mandate-validity-units.reducer';
import { MandateValidityUnitsEffects } from './store/mandate-validity-units/mandate-validity-units.effects';
import { reducer as WorkflowActionTypesReducer } from './store/workflow-action-types/workflow-action-types.reducer';
import { WorkflowActionTypesEffects } from './store/workflow-action-types/workflow-action-types.effects';
import { reducer as governoratesReducer } from './store/governorates/governorates.reducer';
import { GovernoratesEffects } from './store/governorates/governorates.effects';
import { TaxOfficesEffects } from './store/tax_offices/tax_offices.effects';
import { reducer as taxOfficesReducer } from './store/tax_offices/tax_offices.reducer';
import { AddWorkFlowActionTypesComponent } from './components/workflow-action-types/add-workflow-action-types/add-workflow-action-types.component';
import { ViewWorkFlowActionTypesComponent } from './components/workflow-action-types/view-workflow-action-types/view-workflow-action-types.component';
import { CurrencyExchangeRatesEffects } from './store/currency-exchange-rates/currency-exchange-rates.effects';
import { currencyExchangeRatesReducer } from './store/currency-exchange-rates/currency-exchange-rates.reducer';
import { reducer as paymentMonthDaysReducer } from './store/payment-month-days/payment-month-days.reducer';
import { PaymentMonthDaysEffects } from './store/payment-month-days/payment-month-days.effects';
import { ViewPaymentMonthDaysComponent } from './components/payment-month-days/view-payment-month-days/view-payment-month-days.component';
import { reducer as feeTypesReducer } from './store/fee-types/fee-types.reducer';
import { FeeTypesEffects } from './store/fee-types/fee-types.effects';
import { ProductsEffects } from './store/products/products.effects';
import { reducer as productsReducer } from './store/products/products.reducer';
import { reducer as smeClientCodesReducer } from './store/sme-client-codes/sme-client-codes.reducer';
import { SMEClientCodesEffects } from './store/sme-client-codes/sme-client-codes.effects';
import { ViewClientStatusesComponent } from './components/client-statuses/view-client-statuses/view-client-statuses.component';
import { ClientStatusActionsEffects } from './store/client-statuses-actions/client-status-actions.effects';
import { reducer as clientStatusActionsReducer } from './store/client-statuses-actions/client-status-actions.reducer';
import { AddClientStatusActionsComponent } from './components/client-statuses/add-client-status-action/add-client-status-actions.component';
import { AddClientStatusesComponent } from './components/client-statuses/add-client-status/add-client-status.component';
import { ViewClientStatusActionsComponent } from './components/client-statuses/view-client-status-actions/view-client-status-actions.component';
import { ClientStatusesEffects } from './store/client-statuses/client-statuses.effects';
import { clientStatusesReducer } from './store/client-statuses/client-statuses.reducer';
import { AddClientOfficerTypesComponent } from './components/client-officer-types/add-client-officer-types/add-client-officer-types.component';
import { ViewClientOfficerTypesComponent } from './components/client-officer-types/view-client-officer-types/view-client-officer-types.component';
import { ClientOfficerTypesEffects } from './store/client-officer-types/client-officer-types.effects';
import { AddAuthorizationGroupsComponent } from './components/authorization-groups/add-authorization-groups/add-authorization-groups.component';
import { ViewAuthorizationGroupsComponent } from './components/authorization-groups/view-authorization-groups/view-authorization-groups.component';
import { AuthorizationGroupsEffects } from './store/authorization-groups/authorization-groups.effects';
import { reducer as authorizationGroupsReducer } from './store/authorization-groups/authorization-groups.reducer';
import { ViewInterestTypesComponent } from './components/interest-types/view-interest-types/view-interest-types.component';
import { ViewFollowUpTypesComponent } from './components/followup-types/view-followup-types/view-followup-types.component';
import { followupTypesReducer } from './store/followup-types/followup-types.reducer';
import { FollowupTypesEffects } from './store/followup-types/followup-types.effects';
import { AddFollowupTypesComponent } from './components/followup-types/add-followup-types/add-followup-types.component';
import { AddInterestTypesComponent } from './components/interest-types/add-interest-types/add-interest-types.component';
import { interestTypeReducer } from './store/interest-types/interest-types.reducer';
import { InterestTypesEffects } from './store/interest-types/interest-types.effects';
import { ViewFeeRangesComponent } from './components/fee-ranges/view-fee-ranges/view-fee-ranges.component';
import { AddFeeRangesComponent } from './components/fee-ranges/add-fee-ranges/add-fee-ranges.component';
import { FeeRangesEffects } from './store/fee-ranges/fee-ranges.effects';
import { feeRangesReducer } from './store/fee-ranges/fee-ranges.reducer';
import { AddPaymentPeriodsComponent } from './components/payment-periods/add-payment-periods/add-payment-periods.component';
import { ViewPaymentPeriodsComponent } from './components/payment-periods/view-payment-periods/view-payment-periods.component';
import { paymentPeriodReducer } from './store/payment-periods/payment-periods.reducer';
import { PaymentPeriodsEffects } from './store/payment-periods/payment-periods.effects';
import { paymentTimingTermsReducer } from './store/payment-timing-terms/payment-timing-terms.reducer';
import { PaymentTimingTermsEffects } from './store/payment-timing-terms/payment-timing-terms.effects';
import { ViewPaymentTimingTermsComponent } from './components/payment-timing-terms/view-payment-timing-terms/view-payment-timing-terms.component';
import { AddPaymentTimingTermsComponent } from './components/payment-timing-terms/add-payment-timing-terms/add-payment-timing-terms.component';
import { AddNotificationGroupsComponent } from './components/notification-groups/add-notification-groups/add-notification-groups.component';
import { ViewNotificationGroupsComponent } from './components/notification-groups/view-notification-groups/view-notification-groups.component';
import { notificationGroupReducer } from './store/notification-groups/notification-groups.reducer';
import { NotificationGroupsEffects } from './store/notification-groups/notification-groups.effects';
import { AddNotificationGroupOfficersComponent } from './components/notification-group-officers/add-notification-group-officers/add-notification-group-officers.component';
import { ViewNotificationGroupOfficersComponent } from './components/notification-group-officers/view-notification-group-officers/view-notification-notification-group-officers.component';
import { notificationGroupOfficerReducer } from './store/notification-group-officers/notification-group-officers.reducer';
import { NotificationGroupOfficersEffects } from './store/notification-group-officers/notification-group-officers.effects';
import { AuthorizationGroupOfficersEffects } from './store/authorization-group-officers/authorization-group-officers.effects';
import { authorizationGroupOfficerReducer } from './store/authorization-group-officers/authorization-group-officers.reducer';
import { AddAuthorizationGroupOfficersComponent } from './components/authorization-group-officers/add-authorization-group-officers/add-authorization-group-officers.component';
import { ViewAuthorizationGroupOfficersComponent } from './components/authorization-group-officers/view-authorization-group-officers/view-authorization-group-officers.component';
import { ViewConditionExpressionsComponent } from './components/condition-expressions/view-condition-expressions/view-condition-expressions.component';
import { AddConditionExpressionsComponent } from './components/condition-expressions/add-condition-expressions/add-condition-expressions.component';
import { conditionExpressionsReducer } from './store/condition-expressions/condition-expressions.reducer';
import { ConditionExpressionsEffects } from './store/condition-expressions/condition-expressions.effects';
import { AddConditionsComponent } from './components/conditions/add-conditions/add-conditions.component';
import { ViewConditionsComponent } from './components/conditions/view-conditions/view-conditions.component';
import { conditionsReducer } from './store/conditions/conditions.reducer';
import { ConditionsEffects } from './store/conditions/conditions.effects';
import { WizardClientStatusActionComponent } from './components/client-statuses/wizard-client-status-action/wizard-client-status-action.component';
import { AddActionAuthorizationGroupsComponent } from './components/client-statuses/ClientStatusActionActivities/ClientStatusActionAuthorizationGroup/add-action-authorization-group/add-action-authorization-group.component';
import { ViewActionAuthorizationGroupsComponent } from './components/client-statuses/ClientStatusActionActivities/ClientStatusActionAuthorizationGroup/view-action-authorization-group/view-action-authorization-group.component';
import { actionAuthorizationGroupsReducer } from './store/client-statuses-actions-activities/ClientStatusActionAuthorizationGroup/action-authorization-groups.reducer';
import { ActionAuthorizationGroupsEffects } from './store/client-statuses-actions-activities/ClientStatusActionAuthorizationGroup/action-authorization-groups.effects';
import { AddActionNotificationGroupsComponent } from './components/client-statuses/ClientStatusActionActivities/ClientStatusActionNotificationGroup/add-action-notification-group/add-action-notification-group.component';
import { ViewActionNotificationGroupsComponent } from './components/client-statuses/ClientStatusActionActivities/ClientStatusActionNotificationGroup/view-action-notification-group/view-action-notification-group.component';
import { actionNotificationGroupsReducer } from './store/client-statuses-actions-activities/ClientStatusActionNotificationGroup/action-notification-groups.reducer';
import { ActionNotificationGroupsEffects } from './store/client-statuses-actions-activities/ClientStatusActionNotificationGroup/action-notification-groups.effects';
import { AddMandateStatusesComponent } from './components/mandate-statuses/add-mandate-status/add-mandate-status.component';
import { ViewMandateStatusesComponent } from './components/mandate-statuses/view-mandate-statuses/view-mandate-statuses.component';
import { AddMandateStatusActionsComponent } from './components/mandate-statuses/add-mandate-status-action/add-mandate-status-actions.component';
import { ViewMandateStatusActionsComponent } from './components/mandate-statuses/view-mandate-status-actions/view-mandate-status-actions.component';
import { MandateStatusesEffects } from './store/mandate-statuses/mandate-statuses/mandate-statuses.effects';
import { mandateStatusesReducer } from './store/mandate-statuses/mandate-statuses/mandate-statuses.reducer';
import { MandateStatusActionsEffects } from './store/mandate-statuses/mandate-statuses-actions/mandate-status-actions.effects';
import { reducer as mandateStatusActionsReducer } from './store/mandate-statuses/mandate-statuses-actions/mandate-status-actions.reducer';
import { WizardMandateStatusActionComponent } from './components/mandate-statuses/wizard-mandate-status-action/wizard-mandate-status-action.component';
import { AddMandateActionAuthorizationGroupsComponent } from './components/mandate-statuses/Activities/MandateStatusActionAuthorizationGroup/add-mandate-authorization-group/add-mandate-authorization-group.component';
import { AddMandateActionNotificationGroupsComponent } from './components/mandate-statuses/Activities/MandateStatusActionNotificationGroup/add-mandate-notification-group/add-mandate-notification-group.component';
import { mandateActionAuthorizationGroupsReducer } from './store/mandate-statuses-actions-activities/MandateStatusActionAuthorizationGroup/action-authorization-groups.reducer';
import { MandateActionAuthorizationGroupsEffects } from './store/mandate-statuses-actions-activities/MandateStatusActionAuthorizationGroup/action-authorization-groups.effects';
import { mandateActionNotificationGroupsReducer } from './store/mandate-statuses-actions-activities/MandateStatusActionNotificationGroup/action-notification-groups.reducer';
import { MandateActionNotificationGroupsEffects } from './store/mandate-statuses-actions-activities/MandateStatusActionNotificationGroup/action-notification-groups.effects';
import { ViewMandateActionAuthorizationGroupsComponent } from './components/mandate-statuses/Activities/MandateStatusActionAuthorizationGroup/view-mandate-authorization-group/view-mandate-authorization-group.component';
import { ViewMandateActionNotificationGroupsComponent } from './components/mandate-statuses/Activities/MandateStatusActionNotificationGroup/view-mandate-notification-group/view-mandate-notification-group.component';
import { AddVehicleManufacturerComponent } from './components/vehicle-manufacturers/add-vehicle-manufacturer/add-vehicle-manufacturer.component';
import { ViewVehicleManufacturersComponent } from './components/vehicle-manufacturers/view-vehicle-manufacturers/view-vehicle-manufacturers.component';
import { reducer as vehicleManufacturersReducer } from './store/vehicle-manufacturers/vehicle-manufacturers.reducer';
import { VehicleManufacturersEffects } from './store/vehicle-manufacturers/vehicle-manufacturers.effects';
import { VehicleModelsEffects } from './store/vehicle-models/vehicle-models.effects';
import { reducer as vehicleModelsReducer } from './store/vehicle-models/vehicle-models.reducer';
import { AddVehicleModelComponent } from './components/vehicle-models/add-vehicle-model/add-vehicle-model.component';
import { ViewVehicleModelsComponent } from './components/vehicle-models/view-vehicle-models/view-vehicle-models.component';

@NgModule({
  declarations: [
    AddTmlOfficerTypesComponent,
    AddCompanyTypesComponent,
    AddNotificationGroupsComponent,
    AddFeeCalculationTypesComponent,
    AddInterestRateBenchmarksComponent,
    AddFeeTypesComponent,
    AddNotificationGroupOfficersComponent,
    AddAuthorizationGroupOfficersComponent,
    ViewAuthorizationGroupOfficersComponent,
    AddPeriodUnitsComponent,
    AddRentStructureTypesComponent,
    AddCurrenciesComponent,
    AddConditionExpressionsComponent,
    AddConditionsComponent,
    AddPaymentMethodsComponent,
    AddWorkFlowActionTypesComponent,
    AddPaymentTypesComponent,
    AddPaymentTimingTermsComponent,
    AddPaymentPeriodsComponent,
    AddPaymentMonthDaysComponent,
    AddMeetingTypesComponent,
    AddInsuredByComponent,
    AddLeasingTypeComponent,
    AddMandateValidityUnitComponent,
    AddBusinessLinesComponent,
    AddAssetTypesComponent,
    AddAssetTypeCategoriesComponent,
    AddProductsComponent,
    AddSectorsComponent,
    AddSMEClientCodesComponent,
    AddSubSectorsComponent,
    AddAuthorityOfficesComponent,
    AddPhoneTypesComponent,
    AddAddressTypesComponent,
    AddInterestTypesComponent,
    AddGovernoratesComponent,
    AddCountriesComponent,
    AddFollowupTypesComponent,
    AddFeeRangesComponent,
    ViewFeeRangesComponent,
    AddInterestTypesComponent,
    AddIdentificationTypesComponent,
    AddAreasComponent,
    AddTaxOfficesComponent,
    AddCallTypesComponent,
    AddCommunicationTypesComponent,
    AddCallActionTypesComponent,
    AddClientOfficerTypesComponent,
    AddCommunicationFlowTypesComponent,
    AddCurrenciesExchangeComponent,
    AddDocTypesComponent,
    AddClientTypesComponent,
    ViewCompanyTypesComponent,
    ViewFeesCalculationTypesComponent,
    ViewMeetingTypesComponent,
    ViewInterestRateBenchmarksComponent,
    ViewFeeTypesComponent,
    ViewNotificationGroupOfficersComponent,
    ViewAuthorizationGroupOfficersComponent,
    ViewPeriodUnitsComponent,
    ViewRentStructureTypesComponent,
    ViewCurrenciesComponent,
    ViewConditionExpressionsComponent,
    ViewConditionsComponent,
    WizardCurrenciesComponent,
    ViewPaymentMonthDaysComponent,
    AddPaymentMonthDaysComponent,
    ViewCurrencyExchangeComponent,
    ViewPaymentMethodsComponent,
    ViewInsuredByComponent,
    ViewLeasingTypeComponent,
    ViewPaymentTypesComponent,
    ViewPaymentTimingTermsComponent,
    ViewPaymentPeriodsComponent,
    ViewMandateValidityUnitComponent,
    ViewDocTypesComponent,
    ViewBusinessLinesComponent,
    ViewAssetTypesComponent,
    ViewAssetTypeCategoriesComponent,
    ViewProductsComponent,
    ViewSectorsComponent,
    ViewSMEClientCodesComponent,
    ViewSubSectorsComponent,
    ViewClientTypesComponent,
    ViewInterestTypesComponent,
    ViewFollowUpTypesComponent,
    ViewFeeRangesComponent,
    AddFeeRangesComponent,
    ViewAuthorityOfficesComponent,
    ViewPhoneTypesComponent,
    ViewAddressTypesComponent,
    ViewGovernoratesComponent,
    ViewCountriesComponent,
    ViewIdentificationTypesComponent,
    ViewAreasComponent,
    ViewTaxOfficesComponent,
    ViewTmlOfficerTypesComponent,
    AddClientStatusActionsComponent,
    ViewClientStatusActionsComponent,
    ViewClientStatusesComponent,
    AddClientStatusesComponent,
    AddMandateStatusActionsComponent,
    ViewMandateStatusActionsComponent,
    ViewMandateStatusesComponent,
    AddMandateStatusesComponent,
    WizardClientStatusActionComponent,
    WizardMandateStatusActionComponent,
    ViewCallTypesComponent,
    ViewCommunicationTypesComponent,
    ViewCallActionTypesComponent,
    ViewClientOfficerTypesComponent,
    ViewCommunicationFlowTypeComponent,
    ViewWorkFlowActionTypesComponent,
    ViewProductsComponent,
    AddAuthorizationGroupsComponent,
    ViewAuthorizationGroupsComponent,
    ViewNotificationGroupsComponent,
    AddActionAuthorizationGroupsComponent,
    ViewActionAuthorizationGroupsComponent,
    AddActionNotificationGroupsComponent,
    ViewActionNotificationGroupsComponent,
    AddMandateActionAuthorizationGroupsComponent,
    ViewMandateActionAuthorizationGroupsComponent,
    AddMandateActionNotificationGroupsComponent,
    ViewMandateActionNotificationGroupsComponent,
    AddVehicleManufacturerComponent,
    ViewVehicleManufacturersComponent,
    AddVehicleModelComponent,
    ViewVehicleModelsComponent,
  ],
  imports: [
    CommonModule,
    LookupsRoutingModule,
    SharedModule,
    StepperModule,
    ButtonModule,
    TabsModule,
    FileUploadModule,
    StoreModule.forFeature('vehicleManufacturers', vehicleManufacturersReducer),
    EffectsModule.forFeature([VehicleManufacturersEffects]),
    StoreModule.forFeature('vehicleModels', vehicleModelsReducer),
    EffectsModule.forFeature([VehicleModelsEffects]),

    StoreModule.forFeature('companyTypes', companyTypesReducer),
    EffectsModule.forFeature([CompanyTypesEffects]),
    StoreModule.forFeature('feeCalculationTypes', feeCalcReducer),
    EffectsModule.forFeature([FeeCalculationTypesEffects]),
    StoreModule.forFeature('addressTypes', addressTypeReducer),
    EffectsModule.forFeature([AddressTypesEffects]),
    StoreModule.forFeature('authorityOffices', authorityOfficeReducer),
    EffectsModule.forFeature([AuthorityOfficesEffects]),
    StoreModule.forFeature('currencies', currenciesReducer),
    EffectsModule.forFeature([CurrenciesEffects]),
    StoreModule.forFeature('callActionTypes', callActionTypesReducer),
    EffectsModule.forFeature([CallActionTypesEffects]),
    StoreModule.forFeature('callTypes', callTypesReducer),
    EffectsModule.forFeature([CallTypesEffects]),
    StoreModule.forFeature('businessLines', businessLinesReducer),
    EffectsModule.forFeature([BusinessLinesEffects]),
    StoreModule.forFeature('clientTypes', clientTypesReducer),
    EffectsModule.forFeature([ClientTypesEffects]),
    StoreModule.forFeature(
      'communicationFlowTypes',
      communicationFlowTypesReducer
    ),
    EffectsModule.forFeature([CommunicationFlowTypesEffects]),
    StoreModule.forFeature('communicationTypes', communicationTypesReducer),
    EffectsModule.forFeature([CommunicationTypesEffects]),
    StoreModule.forFeature('gracePeriodUnits', gracePeriodUnitsReducer),
    EffectsModule.forFeature([GracePeriodUnitsEffects]),
    StoreModule.forFeature('identificationTypes', IdentificationTypesReducer),
    EffectsModule.forFeature([IdentificationTypesEffects]),
    StoreModule.forFeature('insuredBy', InsuredByReducer),
    EffectsModule.forFeature([InsuredByEffects]),
    StoreModule.forFeature(
      'interestRateBenchmarks',
      InterestRateBenchmarksReducer
    ),
    EffectsModule.forFeature([InterestRateBenchMarksEffects]),
    StoreModule.forFeature('leasingTypes', LeasingTypesReducer),
    EffectsModule.forFeature([LeasingTypesEffects]),
    StoreModule.forFeature('meetingTypes', MeetingTypesReducer),
    EffectsModule.forFeature([MeetingTypesEffects]),
    StoreModule.forFeature('paymentMethods', PaymentMethodsReducer),
    EffectsModule.forFeature([PaymentMethodsEffects]),
    StoreModule.forFeature('paymentTypes', PaymentTypesReducer),
    EffectsModule.forFeature([PaymentTypesEffects]),
    StoreModule.forFeature('assetTypeCategories', assetTypeCategoriesReducer),
    EffectsModule.forFeature([AssetTypeCategoriesEffects]),
    StoreModule.forFeature('assetTypes', assetTypesReducer),
    EffectsModule.forFeature([AssetTypesEffects]),
    StoreModule.forFeature('phoneTypes', PhoneTypesReducer),
    EffectsModule.forFeature([PhoneTypesEffects]),
    StoreModule.forFeature('rentStructureTypes', RentStructureTypesReducer),
    EffectsModule.forFeature([RentStructureTypesEffects]),
    StoreModule.forFeature('countries', countriesReducer),
    EffectsModule.forFeature([CountriesEffects]),
    StoreModule.forFeature('sectors', SectorsReducer),
    EffectsModule.forFeature([SectorsEffects]),
    StoreModule.forFeature('tmlOfficerTypes', TmlOfficerTypesReducer),
    EffectsModule.forFeature([TmlOfficerTypesEffects]),
    StoreModule.forFeature('mandateStatuses', mandateStatusesReducer),
    EffectsModule.forFeature([MandateStatusesEffects]),
    StoreModule.forFeature('mandateStatusActions', mandateStatusActionsReducer),
    EffectsModule.forFeature([MandateStatusActionsEffects]),
    StoreModule.forFeature('subSectors', SubSectorsReducer),
    EffectsModule.forFeature([SubSectorsEffects]),
    StoreModule.forFeature('clientStatuses', clientStatusesReducer),
    EffectsModule.forFeature([ClientStatusesEffects]),
    StoreModule.forFeature('docTypes', docTypesReducer),
    EffectsModule.forFeature([DocTypesEffects]),
    StoreModule.forFeature('mandateValidityUnits', MandateValidityUnitsReducer),
    EffectsModule.forFeature([MandateValidityUnitsEffects]),
    StoreModule.forFeature('areas', AreasReducer),
    EffectsModule.forFeature([AreasEffects]),
    StoreModule.forFeature('governorates', governoratesReducer),
    EffectsModule.forFeature([GovernoratesEffects]),
    StoreModule.forFeature('taxOffices', taxOfficesReducer),
    EffectsModule.forFeature([TaxOfficesEffects]),
    StoreModule.forFeature('workflowActionTypes', WorkflowActionTypesReducer),
    EffectsModule.forFeature([WorkflowActionTypesEffects]),
    StoreModule.forFeature(
      'currencyExchangeRates',
      currencyExchangeRatesReducer
    ),
    EffectsModule.forFeature([CurrencyExchangeRatesEffects]),
    StoreModule.forFeature('paymentMonthDays', paymentMonthDaysReducer),
    EffectsModule.forFeature([PaymentMonthDaysEffects]),
    StoreModule.forFeature('paymentMonthDays', paymentMonthDaysReducer),
    EffectsModule.forFeature([PaymentMonthDaysEffects]),
    StoreModule.forFeature('feeTypes', feeTypesReducer),
    EffectsModule.forFeature([FeeTypesEffects]),
    StoreModule.forFeature('products', productsReducer),
    EffectsModule.forFeature([ProductsEffects]),
    StoreModule.forFeature('sMEClientCodes', smeClientCodesReducer),
    EffectsModule.forFeature([SMEClientCodesEffects]),
    StoreModule.forFeature('clientStatusActions', clientStatusActionsReducer),
    EffectsModule.forFeature([ClientStatusActionsEffects]),
    StoreModule.forFeature('clientOfficerTypes', clientOfficerTypesReducer),
    EffectsModule.forFeature([ClientOfficerTypesEffects]),
    StoreModule.forFeature('authorizationGroups', authorizationGroupsReducer),
    EffectsModule.forFeature([AuthorizationGroupsEffects]),
    StoreModule.forFeature('followupTypes', followupTypesReducer),
    EffectsModule.forFeature([FollowupTypesEffects]),
    StoreModule.forFeature('interestTypes', interestTypeReducer),
    EffectsModule.forFeature([InterestTypesEffects]),
    StoreModule.forFeature('feeRanges', feeRangesReducer),
    EffectsModule.forFeature([FeeRangesEffects]),
    StoreModule.forFeature('paymentPeriods', paymentPeriodReducer),
    EffectsModule.forFeature([PaymentPeriodsEffects]),
    StoreModule.forFeature('paymentTimingTerms', paymentTimingTermsReducer),
    EffectsModule.forFeature([PaymentTimingTermsEffects]),
    StoreModule.forFeature('notificationGroups', notificationGroupReducer),
    EffectsModule.forFeature([NotificationGroupsEffects]),
    StoreModule.forFeature(
      'notificationGroupOfficers',
      notificationGroupOfficerReducer
    ),
    EffectsModule.forFeature([NotificationGroupOfficersEffects]),
    StoreModule.forFeature(
      'authorizationGroupOfficers',
      authorizationGroupOfficerReducer
    ),
    EffectsModule.forFeature([AuthorizationGroupOfficersEffects]),
    StoreModule.forFeature('conditionExpressions', conditionExpressionsReducer),
    EffectsModule.forFeature([ConditionExpressionsEffects]),
    StoreModule.forFeature('conditions', conditionsReducer),
    EffectsModule.forFeature([ConditionsEffects]),
    StoreModule.forFeature(
      'actionAuthorizationGroups',
      actionAuthorizationGroupsReducer
    ),
    EffectsModule.forFeature([ActionAuthorizationGroupsEffects]),
    StoreModule.forFeature(
      'actionNotificationGroups',
      actionNotificationGroupsReducer
    ),
    EffectsModule.forFeature([ActionNotificationGroupsEffects]),

    StoreModule.forFeature(
      'mandateActionAuthorizationGroups',
      mandateActionAuthorizationGroupsReducer
    ),
    EffectsModule.forFeature([MandateActionAuthorizationGroupsEffects]),
    StoreModule.forFeature(
      'mandateActionNotificationGroups',
      mandateActionNotificationGroupsReducer
    ),
    EffectsModule.forFeature([MandateActionNotificationGroupsEffects]),
  ],
  exports: [
    AddMandateStatusesComponent,
    AddInterestRateBenchmarksComponent,
    AddFeeTypesComponent,
    AddNotificationGroupOfficersComponent,
    AddAuthorizationGroupOfficersComponent,
    AddPeriodUnitsComponent,
    AddRentStructureTypesComponent,
    AddCurrenciesComponent,
    AddConditionExpressionsComponent,
    AddConditionsComponent,
    AddPaymentMethodsComponent,
    AddPaymentTypesComponent,
    AddPaymentTimingTermsComponent,
    AddPaymentPeriodsComponent,
    AddPaymentMonthDaysComponent,
    AddClientTypesComponent,
    AddMeetingTypesComponent,
    AddInsuredByComponent,

    AddLeasingTypeComponent,
    AddMandateValidityUnitComponent,
    AddDocTypesComponent,
    AddBusinessLinesComponent,
    AddAssetTypesComponent,
    AddAssetTypeCategoriesComponent,
    ViewVehicleManufacturersComponent,

    AddProductsComponent,
    AddSectorsComponent,
    AddSMEClientCodesComponent,
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
    AddClientOfficerTypesComponent,
    AddCommunicationFlowTypesComponent,
    AddCurrenciesExchangeComponent,
    ViewSMEClientCodesComponent,
    ViewClientOfficerTypesComponent,
    AddAuthorizationGroupsComponent,
    AddNotificationGroupsComponent,
    AddActionAuthorizationGroupsComponent,
    AddActionNotificationGroupsComponent,
    AddMandateActionAuthorizationGroupsComponent,
    AddMandateActionNotificationGroupsComponent,
    AddVehicleManufacturerComponent,
    AddVehicleModelComponent,
    ViewVehicleModelsComponent,
  ],
})
export class LookupsModule {}
