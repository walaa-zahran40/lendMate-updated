import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AddCurrenciesExchangeComponent } from './add-currencies-exchange/add-currencies-exchange.component';
import { AddClientDocumentTypesComponent } from './add-client-document-types/add-client-document-types.component';
import { AddBranchManagersComponent } from './add-branch-managers/add-branch-managers.component';
import { AddBranchAddressesComponent } from './add-branch-addresses/add-branch-addresses.component';
import { AddBranchOfficersComponent } from './add-branch-officers/add-branch-officers.component';
import { AddAssestTypeCategoriesComponent } from './add-assest-type-categories/add-assest-type-categories.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { AddSectorsComponent } from './add-sectors/add-sectors.component';
import { AddClientStatusesComponent } from './add-client-statuses/add-client-statuses.component';
import { AddClientStatusActionsComponent } from './add-client-status-actions/add-client-status-actions.component';
import { AddSmeClientCodeComponent } from './add-sme-client-code/add-sme-client-code.component';
import { AddSubSectorsComponent } from './add-sub-sectors/add-sub-sectors.component';
import { AddClientTypesComponent } from './add-client-types/add-client-types.component';
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
import { ViewCompanyTypesComponent } from './view-company-types/view-company-types.component';
import { ViewFeesCalculationTypesComponent } from './view-fees-calculation-types/view-fees-calculation-types.component';
import { ViewMandateStatusesComponent } from './view-mandate-statuses/view-mandate-statuses.component';

const routes: Routes = [
  {
    path: 'add-company-types',
    component: AddCompanyTypesComponent,
  },
  {
    path: 'add-fee-calculation-types',
    component: AddFeeCalculationTypesComponent,
  },
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
    component: AddAssestTypeCategoriesComponent,
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
    path: 'add-address-types',
    component: AddAddressTypesComponent,
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
    path: 'view-company-types',
    component: ViewCompanyTypesComponent,
  },
  {
    path: 'view-fees-calculation-types',
    component: ViewFeesCalculationTypesComponent,
  },
  {
    path: 'view-mandate-statuses',
    component: ViewMandateStatusesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LookupsRoutingModule {}
