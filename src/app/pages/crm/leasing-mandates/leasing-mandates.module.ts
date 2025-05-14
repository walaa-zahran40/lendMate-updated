import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmRoutingModule } from '../crm-routing.module';
import { AddLeasingMandateComponent } from './components/add-leasing-mandate/add-leasing-mandate.component';
import { AddChildMandateComponent } from './components/add-child-mandate/add-child-mandate.component';
import { AddManageMandateTermsComponent } from './components/add-manage-mandate-terms/add-manage-mandate-terms.component';
import { LeasingFinancialFormComponent } from './components/leasing-financial-form/leasing-financial-form.component';
import { SharedModule } from '../../../shared/shared.module';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { ViewLeasingMandatesComponent } from './components/view-leasing-mandates/view-leasing-mandates.component';
import { ViewOfficersComponent } from './components/view-officers/view-officers.component';
import { ViewContactPersonsComponent } from './components/view-contact-persons/view-contact-persons.component';
import { ViewAssestTypeComponent } from './components/view-assest-type/view-assest-type.component';
import { WizardComponent } from './components/wizard/wizard.component';
import { ViewManageMandateTermsComponent } from './components/view-manage-mandate-terms/view-manage-mandate-terms.component';
import { LeasingFinancialFormCompoundComponent } from './components/leasing-financial-form-compound/leasing-financial-form-compound.component';
import { ViewCalculationsComponent } from './components/view-calculations/view-calculations.component';

@NgModule({
  declarations: [
    AddLeasingMandateComponent,
    AddChildMandateComponent,
    AddManageMandateTermsComponent,
    LeasingFinancialFormComponent,
    ViewLeasingMandatesComponent,
    ViewOfficersComponent,
    ViewContactPersonsComponent,
    ViewAssestTypeComponent,
    WizardComponent,
    ViewCalculationsComponent,
    ViewManageMandateTermsComponent,
    LeasingFinancialFormCompoundComponent,
  ],
  imports: [
    CommonModule,
    CrmRoutingModule,
    SharedModule,
    TabsModule,
    ButtonModule,
  ],
  exports: [
    AddLeasingMandateComponent,
    AddChildMandateComponent,
    AddManageMandateTermsComponent,
    LeasingFinancialFormComponent,
  ],
})
export class LeasingMandatesModule {}
