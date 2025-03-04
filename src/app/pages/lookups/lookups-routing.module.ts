import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyTypesComponent } from './add-company-types/add-company-types.component';
import { AddFeeCalculationTypesComponent } from './add-fee-calculation-types/add-fee-calculation-types.component';
import { AddMandateStatusesComponent } from './add-mandate-statuses/add-mandate-statuses.component';
import { InterestRateBenchmarksComponent } from './interest-rate-benchmarks/interest-rate-benchmarks.component';
import { FeeTypesComponent } from './fee-types/fee-types.component';
import { GracePeriodUnitsComponent } from './grace-period-units/grace-period-units.component';
import { RentStructureTypesComponent } from './rent-structure-types/rent-structure-types.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { PaymentTypesComponent } from './payment-types/payment-types.component';
import { PaymentMonthDaysComponent } from './payment-month-days/payment-month-days.component';
import { MeetingTypesComponent } from './meeting-types/meeting-types.component';
import { InsuredByComponent } from './insured-by/insured-by.component';
import { LeasingTypeComponent } from './leasing-type/leasing-type.component';
import { MandateValidityUnitComponent } from './mandate-validity-unit/mandate-validity-unit.component';
import { ClientDocumentTypesComponent } from './client-document-types/client-document-types.component';
import { BranchComponent } from './branch/branch.component';
import { BusinessLinesComponent } from './business-lines/business-lines.component';
import { AssetTypesComponent } from './asset-types/asset-types.component';

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
    path: 'interest-rate-benchmarks',
    component: InterestRateBenchmarksComponent,
  },
  {
    path: 'fee-types',
    component: FeeTypesComponent,
  },
  {
    path: 'grace-period-units',
    component: GracePeriodUnitsComponent,
  },
  {
    path: 'rent-structure-types',
    component: RentStructureTypesComponent,
  },
  {
    path: 'currencies',
    component: CurrenciesComponent,
  },
  {
    path: 'payment-methods',
    component: PaymentMethodsComponent,
  },
  {
    path: 'payment-types',
    component: PaymentTypesComponent,
  },
  {
    path: 'payment-month-days',
    component: PaymentMonthDaysComponent,
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
