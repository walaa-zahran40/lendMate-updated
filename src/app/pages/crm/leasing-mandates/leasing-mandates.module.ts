import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmRoutingModule } from '../crm-routing.module';
import { AddMandateComponent } from './add-mandate/add-mandate.component';
import { AddChildMandateComponent } from './add-child-mandate/add-child-mandate.component';
import { AddManageMandateTermsComponent } from './add-manage-mandate-terms/add-manage-mandate-terms.component';
import { LeasingFinancialFormComponent } from './leasing-financial-form/leasing-financial-form.component';
import { SharedModule } from '../../../shared/shared.module';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AddMandateComponent,
    AddChildMandateComponent,
    AddManageMandateTermsComponent,
    LeasingFinancialFormComponent,
  ],
  imports: [
    CommonModule,
    CrmRoutingModule,
    SharedModule,
    TabsModule,
    ButtonModule,
  ],
  exports: [
    AddMandateComponent,
    AddChildMandateComponent,
    AddManageMandateTermsComponent,
    LeasingFinancialFormComponent,
  ],
})
export class LeasingMandatesModule {}
