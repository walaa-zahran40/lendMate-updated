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
import { ViewMandateComponent } from './view-mandate/view-mandate.component';
import { ViewOfficersComponent } from './view-officers/view-officers.component';
import { ViewContactPersonsComponent } from './view-contact-persons/view-contact-persons.component';
import { ViewAssestTypeComponent } from './view-assest-type/view-assest-type.component';
import { WizardComponent } from './wizard/wizard.component';
import { ViewCalculationsComponent } from './view-calculations/view-calculations.component';

@NgModule({
  declarations: [
    AddMandateComponent,
    AddChildMandateComponent,
    AddManageMandateTermsComponent,
    LeasingFinancialFormComponent,
    ViewMandateComponent,
    ViewOfficersComponent,
    ViewContactPersonsComponent,
    ViewAssestTypeComponent,
    WizardComponent,
    ViewCalculationsComponent,
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
