import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeasingMandateDetailsComponent } from './leasing-mandate-details/leasing-mandate-details.component';
import { AdditionalTermsComponent } from './additional-terms/additional-terms.component';
import { DownloadLeasingMandateComponent } from './download-leasing-mandate/download-leasing-mandate.component';
import { FinancialFormComponent } from './financial-form/financial-form.component';



@NgModule({
  declarations: [
    LeasingMandateDetailsComponent,
    AdditionalTermsComponent,
    DownloadLeasingMandateComponent,
    FinancialFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LeasingMandatesModule { }
