import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { StepperModule } from 'primeng/stepper';
import { TabsModule } from 'primeng/tabs';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
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
import { AddAssetTypeCategoriesComponent } from './components/add-asset-type-categories/add-asset-type-categories.component';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { AddSectorsComponent } from './components/add-sectors/add-sectors.component';
import { AddClientStatusesComponent } from './components/add-client-statuses/add-client-statuses.component';
import { AddSmeClientCodeComponent } from './components/add-sme-client-code/add-sme-client-code.component';
import { AddSubSectorsComponent } from './components/add-sub-sectors/add-sub-sectors.component';
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
import { AddBranchManagersComponent } from './components/add-branch-managers/add-branch-managers.component';
import { AddBranchOfficersComponent } from './components/add-branch-officers/add-branch-officers.component';
import { AddBranchAddressesComponent } from './components/add-branch-addresses/add-branch-addresses.component';
import { AddClientStatusActionsComponent } from './components/add-client-status-actions/add-client-status-actions.component';
import { AddCurrenciesExchangeComponent } from './components/add-currencies-exchange/add-currencies-exchange.component';
import { LookupsRoutingModule } from './lookups-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AddDocTypesComponent } from './components/add-doc-types/add-doc-types.component';
import { AddClientTypesComponent } from './components/add-client-types/add-client-types.component';
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
import { ViewInsuredByComponent } from './components/view-insured-by/view-insured-by.component';
import { ViewLeasingTypeComponent } from './components/view-leasing-type/view-leasing-type.component';
import { ViewMandateValidityUnitComponent } from './components/view-mandate-validity-unit/view-mandate-validity-unit.component';
import { ViewDocTypesComponent } from './components/view-doc-types/view-doc-types.component';
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
import { ViewSmeClientCodeComponent } from './components/view-sme-client-code/view-sme-client-code.component';
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
import { ViewFeesRangeComponent } from './components/view-fees-range/view-fees-range.component';
import { AddFeesRangeComponent } from './components/add-fees-range/add-fees-range.component';
import { CompanyTypesEffects } from './store/company-types/company-types.effects';
import { companyTypesReducer } from './store/company-types/company-types.reducer';
import { reducer as feeCalcReducer } from './store/fee-calculation-types/fee-calculation-types.reducer';
import { FeeCalculationTypesEffects } from './store/fee-calculation-types/fee-calculation-types.effects';
import { reducer as addressTypeReducer } from './store/address-types/address-types.reducer';
import { AddressTypesEffects } from './store/address-types/address-types.effects';
import { reducer as authorityOfficeReducer } from './store/authority-offices/authority-offices.reducer';
import { AuthorityOfficesEffects } from './store/authority-offices/authority-offices.effects';
import { BranchesEffects } from './store/branches/branches.effects';
import { branchesReducer } from './store/branches/branches.reducer';
import { reducer as callActionTypesReducer } from './store/call-action-types/call-action-types.reducer';
import { CallActionTypesEffects } from './store/call-action-types/call-action-types.effects';
import { currenciesReducer as currenciesReducer } from './store/currencies/currencies.reducer';
import { reducer as callTypesReducer } from './store/call-types/call-types.reducer';
import { CallTypesEffects } from './store/call-types/call-types.effects';
import { CurrenciesEffects } from './store/currencies/currencies.effects';
import { businessLinesReducer } from './store/businessLines/businessLines.reducer';
import { BusinessLinesEffects } from './store/businessLines/businessLines.effects';
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
import { ViewMeetingTypesComponent } from './components/view-meeting-types/view-meeting-types.component';
import { reducer as PaymentMethodsReducer } from './store/payment-methods/payment-methods.reducer';
import { PaymentMethodsEffects } from './store/payment-methods/payment-methods.effects';
import { ViewPaymentTypesComponent } from './components/view-payment-types/view-payment-types.component';
import { reducer as PaymentTypesReducer } from './store/payment-types/payment-types.reducer';
import { PaymentTypesEffects } from './store/payment-types/payment-types.effects';
import { AssetTypeCategoriesEffects } from './store/asset-type-categories/asset-type-categories.effects';
import { assetTypeCategoriesReducer } from './store/asset-type-categories/asset-type-categories.reducer';
import { AssetTypesEffects } from './store/asset-types/asset-types.effects';
import { assetTypesReducer } from './store/asset-types/asset-types.reducer';
import { reducer as PhoneTypesReducer } from './store/phone-types/phone-types.reducer';
import { PhoneTypesEffects } from './store/phone-types/phone-types.effects';
import { reducer as RentStructureTypesReducer } from './store/rent-structure-types/rent-structure-types.reducer';
import { RentStructureTypesEffects } from './store/rent-structure-types/rent-structure-types.effects';
import { reducer as SectorsReducer } from './store/sectors/sectors.reducer';
import { SectorsEffects } from './store/sectors/sectors.effects';
import { reducer as TmlOfficerTypesReducer } from './store/tml-officer-types/tml-officer-types.reducer';
import { TmlOfficerTypesEffects } from './store/tml-officer-types/tml-officer-types.effects';
import { MandateStatusesEffects } from './store/mandate-statuses/mandate-statuses.effects';
import { mandateStatusesReducer } from './store/mandate-statuses/mandate-statuses.reducer';
import { reducer as SubSectorsReducer } from './store/sub-sectors/sub-sectors.reducer';
import { SubSectorsEffects } from './store/sub-sectors/sub-sectors.effects';
import { clientStatusesReducer } from './store/client-statuses/client-statuses.reducer';
import { ClientStatusesEffects } from './store/client-statuses/client-statuses.effects';
import { reducer as docTypesReducer } from './store/doc-types/doc-types.reducer';
import { DocTypesEffects } from './store/doc-types/doc-types.effects';
import { CountriesEffects } from './store/countries/countries.effects';
import { countriesReducer } from './store/countries/countries.reducer';
import { reducer as AreasReducer } from './store/areas/areas.reducer';
import { AreasEffects } from './store/areas/areas.effects';

import { reducer as MandateValidityUnitsReducer } from './store/mandate-validity-units/mandate-validity-units.reducer';
import { MandateValidityUnitsEffects } from './store/mandate-validity-units/mandate-validity-units.effects';
import { governoratesReducer } from './store/governorates/governorates.reducer';
import { GovernoratesEffects } from './store/governorates/governorates.effects';
@NgModule({
  declarations: [
    AddTmlOfficerTypesComponent,
    AddCompanyTypesComponent,
    AddFeeCalculationTypesComponent,
    AddMandateStatusesComponent,
    AddInterestRateBenchmarksComponent,
    AddFeeTypesComponent,
    AddPeriodUnitsComponent,
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
    AddAssetTypeCategoriesComponent,
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
    AddDocTypesComponent,
    AddClientTypesComponent,
    ViewCompanyTypesComponent,
    ViewFeesCalculationTypesComponent,
    ViewMandateStatusesComponent,
    ViewMeetingTypesComponent,
    ViewInterestRateBenchmarksComponent,
    ViewFeeTypesComponent,
    ViewPeriodUnitsComponent,
    ViewRentStructureTypesComponent,
    ViewCurrenciesComponent,
    WizardCurrenciesComponent,
    ViewCurrencyExchangeComponent,
    ViewPaymentMethodsComponent,
    ViewInsuredByComponent,
    ViewLeasingTypeComponent,
    ViewPaymentTypesComponent,
    ViewMandateValidityUnitComponent,
    ViewDocTypesComponent,
    ViewBranchComponent,
    WizardBranchComponent,
    ViewBranchManagersComponent,
    ViewBranchOfficersComponent,
    ViewBranchAddressesComponent,
    ViewBusinessLinesComponent,
    ViewAssetTypesComponent,
    ViewAssetTypeCategoriesComponent,
    ViewProductsComponent,
    ViewSectorsComponent,
    ViewClientStatusesComponent,
    WizardClientStatusComponent,
    ViewClientStatusComponent,
    ViewSmeClientCodeComponent,
    ViewSubSectorsComponent,
    ViewClientTypesComponent,
    ViewAuthorityOfficesComponent,
    ViewPhoneTypesComponent,
    ViewAddressTypesComponent,
    ViewGovernoratesComponent,
    ViewCountriesComponent,
    ViewIdentificationTypesComponent,
    ViewAreasComponent,
    ViewTaxOfficesComponent,
    ViewTmlOfficerTypesComponent,
    ViewCallTypesComponent,
    ViewCommunicationTypesComponent,
    ViewCallActionTypesComponent,
    ViewCommunicationFlowTypeComponent,
    ViewFeesRangeComponent,
    AddFeesRangeComponent,
  ],
  imports: [
    CommonModule,
    LookupsRoutingModule,
    SharedModule,
    StepperModule,
    ButtonModule,
    TabsModule,
    FileUploadModule,
    StoreModule.forFeature('companyTypes', companyTypesReducer),
    EffectsModule.forFeature([CompanyTypesEffects]),
    StoreModule.forFeature('feeCalculationTypes', feeCalcReducer),
    EffectsModule.forFeature([FeeCalculationTypesEffects]),
    StoreModule.forFeature('addressTypes', addressTypeReducer),
    EffectsModule.forFeature([AddressTypesEffects]),
    StoreModule.forFeature('authorityOffices', authorityOfficeReducer),
    EffectsModule.forFeature([AuthorityOfficesEffects]),
    StoreModule.forFeature('branches', branchesReducer),
    EffectsModule.forFeature([BranchesEffects]),
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
    StoreModule.forFeature('subSectors', SubSectorsReducer),
    EffectsModule.forFeature([SubSectorsEffects]),
    StoreModule.forFeature('clientStatuses', clientStatusesReducer),
    EffectsModule.forFeature([ClientStatusesEffects]),
    StoreModule.forFeature('docTypes', docTypesReducer),
    EffectsModule.forFeature([DocTypesEffects]),
    EffectsModule.forFeature([AreasEffects]),
    StoreModule.forFeature('mandateValidityUnits', MandateValidityUnitsReducer),
    EffectsModule.forFeature([MandateValidityUnitsEffects]),
    StoreModule.forFeature('areas', AreasReducer),
    EffectsModule.forFeature([AreasEffects]),
    StoreModule.forFeature('governorates', governoratesReducer),
    EffectsModule.forFeature([GovernoratesEffects]),
  ],
  exports: [
    AddFeeCalculationTypesComponent,
    AddMandateStatusesComponent,
    AddInterestRateBenchmarksComponent,
    AddFeeTypesComponent,
    AddPeriodUnitsComponent,
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
    AddDocTypesComponent,
    AddBranchComponent,
    AddBusinessLinesComponent,
    AddAssetTypesComponent,
    AddAssetTypeCategoriesComponent,
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
    ViewBranchComponent,
  ],
})
export class LookupsModule {}
