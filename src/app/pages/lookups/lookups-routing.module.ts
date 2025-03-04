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
import { MeetingTypesComponent } from './meeting-types/meeting-types.component';
import { InsuredByComponent } from './insured-by/insured-by.component';
import { LeasingTypeComponent } from './leasing-type/leasing-type.component';
import { MandateValidityUnitComponent } from './mandate-validity-unit/mandate-validity-unit.component';
import { ClientDocumentTypesComponent } from './client-document-types/client-document-types.component';
import { BranchComponent } from './branch/branch.component';
import { BusinessLinesComponent } from './business-lines/business-lines.component';
import { AssetTypesComponent } from './asset-types/asset-types.component';
import { AddCurrenciesExchangeComponent } from './add-currencies-exchange/add-currencies-exchange.component';

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
    path: 'meeting-types',
    component: MeetingTypesComponent,
  },
  {
    path: 'insured-by',
    component: InsuredByComponent,
  },
  {
    path: 'leasing-type',
    component: LeasingTypeComponent,
  },
  {
    path: 'mandate-validity-unit',
    component: MandateValidityUnitComponent,
  },
  {
    path: 'client-document-types',
    component: ClientDocumentTypesComponent,
  },
  {
    path: 'branch',
    component: BranchComponent,
  },
  {
    path: 'business-lines',
    component: BusinessLinesComponent,
  },
  {
    path: 'asset-types',
    component: AssetTypesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LookupsRoutingModule {}
