import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { StepperModule } from 'primeng/stepper';
import { TabsModule } from 'primeng/tabs';
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
import { AddClientDocumentTypesComponent } from './components/add-client-document-types/add-client-document-types.component';
import { AddClientTypesComponent } from './components/add-client-types/add-client-types.component';
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
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
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
import { CurrenciesEffects } from './store/currencies/currencies.effects';
import { currenciesReducer as currenciesReducer } from './store/currencies/currencies.reducer';

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
    AddClientDocumentTypesComponent,
    AddClientTypesComponent,
    ViewCompanyTypesComponent,
    ViewFeesCalculationTypesComponent,
    ViewMandateStatusesComponent,
    ViewInterestRateBenchmarksComponent,
    ViewFeeTypesComponent,
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
    ViewAssetTypeCategoriesComponent,
    ViewProductsComponent,
    ViewSectorsComponent,
    ViewClientStatusesComponent,
    WizardClientStatusComponent,
    ViewClientStatusComponent,
    ViewSmeClientCodeComponent,
    ViewSubSectorComponent,
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
