import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmRoutingModule } from '../crm-routing.module';
import { AddMandateComponent } from './components/mandate/add-mandate/add-mandate.component';
import { AddChildMandateComponent } from './components/mandate-activities/add-child-mandate/add-child-mandate.component';
import { AddManageMandateTermsComponent } from './components/mandate-activities/add-manage-mandate-terms/add-manage-mandate-terms.component';
import { LeasingFinancialFormComponent } from './components/leasing-financial-form/leasing-financial-form.component';
import { SharedModule } from '../../../shared/shared.module';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { ViewMandateComponent } from './components/mandate/view-mandate/view-mandate.component';
import { ViewOfficersComponent } from './components/mandate-activities/view-officers/view-officers.component';
import { ViewContactPersonsComponent } from './components/mandate-activities/view-contact-persons/view-contact-persons.component';
import { ViewAssetTypeComponent } from './components/mandate-activities/view-asset-type/view-asset-type.component';
import { WizardComponent } from './components/mandate-activities/wizard/wizard.component';
import { ViewManageMandateTermsComponent } from './components/mandate-activities/view-manage-mandate-terms/view-manage-mandate-terms.component';
import { LeasingFinancialFormCompoundComponent } from './components/leasing-financial-form-compound/leasing-financial-form-compound.component';
import { ViewCalculationsComponent } from './components/mandate-activities/view-calculations/view-calculations.component';

@NgModule({
  declarations: [
    AddMandateComponent,
    AddChildMandateComponent,
    AddManageMandateTermsComponent,
    LeasingFinancialFormComponent,
    ViewMandateComponent,
    ViewOfficersComponent,
    ViewContactPersonsComponent,
    ViewAssetTypeComponent,
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
    AddMandateComponent,
    AddChildMandateComponent,
    AddManageMandateTermsComponent,
    LeasingFinancialFormComponent,
  ],
})
export class LeasingMandatesModule {}
