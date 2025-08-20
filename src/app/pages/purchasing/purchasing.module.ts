import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { TabsModule } from 'primeng/tabs';
import { PurchasingRoutingModule } from './purchasing-routing.module';
import { ComponentsModule } from '../../shared/components/components.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ViewAssetsComponent } from './components/assets/view-assets/view-assets.component';
import { AddAssetComponent } from './components/assets/add-asset/add-asset.component';
import { ViewPurchasingOrdersComponent } from './components/purchasing-orders/view-purchasing-orders/view-purchasing-orders.component';
import { AddPurchasingOrderComponent } from './components/purchasing-orders/add-purchasing-order/add-purchasing-order.component';
import { WizardAssetComponent } from './components/assets/activities/wizard-asset/wizard-asset.component';
import { ViewEvaluationInformationComponent } from './components/assets/activities/evaluation-information/view-evaluation-information/view-evaluation-information.component';
import { AddEvaluationInformationComponent } from './components/assets/activities/evaluation-information/add-evaluation-information/add-evaluation-information.component';
import { ViewLicenseInformationComponent } from './components/assets/activities/license-information/view-license-information/view-license-information.component';
import { AddLicenseInformationComponent } from './components/assets/activities/license-information/add-license-information/add-license-information.component';
import { AssetsEffects } from './store/assets/assets.effects';
import { reducer as assetsReducer } from './store/assets/assets.reducer';
import { StepperModule } from 'primeng/stepper';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { VehiclesEffects } from './store/vehicles/vehicles.effects';
import { reducer as vehiclesReducer } from './store/vehicles/vehicles.reducer';
import { EquipmentsEffects } from './store/equipments/equipments.effects';
import { reducer as equipmentsReducer } from './store/equipments/equipments.reducer';
import { PropertiesEffects } from './store/properties/properties.effects';
import { reducer as propertiesReducer } from './store/properties/properties.reducer';
import { LicenseInformationEffects } from './store/license-information/license-information.effects';
import { reducer as licenseInformationReducer } from './store/license-information/license-information.reducer';
import { EvaluationInformationEffects } from './store/evaluation-information/evaluation-information.effects';
import { reducer as evaluationInformationReducer } from './store/evaluation-information/evaluation-information.reducer';
import { PurchasingOrdersEffects } from './store/purchasing-orders/purchasing-orders.effects';
import { reducer as purchasingOrdersReducer } from './store/purchasing-orders/purchasing-orders.reducer';
import { WizardPurchasingOrdersComponent } from './components/purchasing-orders/activities/wizard-purchasing-orders/wizard-purchasing-orders.component';
import { AddPurchasingOrdersFileComponent } from './components/purchasing-orders/activities/purchasing-orders-files/add-purchasing-orders-file/add-purchasing-orders-file.component';
import { ViewPurchasingOrdersFilesComponent } from './components/purchasing-orders/activities/purchasing-orders-files/view-purchasing-orders-files/view-purchasing-orders-files.component';

@NgModule({
  declarations: [
    ViewAssetsComponent,
    AddAssetComponent,
    ViewPurchasingOrdersComponent,
    AddPurchasingOrderComponent,
    WizardAssetComponent,
    ViewEvaluationInformationComponent,
    AddEvaluationInformationComponent,
    ViewLicenseInformationComponent,
    AddLicenseInformationComponent,
    WizardPurchasingOrdersComponent,
    AddPurchasingOrdersFileComponent,
    ViewPurchasingOrdersFilesComponent,
  ],
  imports: [
    CommonModule,
    PurchasingRoutingModule,
    SharedModule,
    TabsModule,
    ButtonModule,
    FullCalendarModule,
    CheckboxModule,
    CalendarModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    DialogModule,
    TranslateModule,
    ComponentsModule,
    SelectModule,
    DatePickerModule,
    StepperModule,
    StoreModule.forFeature('assets', assetsReducer),
    EffectsModule.forFeature([AssetsEffects]),
    StoreModule.forFeature('vehicles', vehiclesReducer),
    EffectsModule.forFeature([VehiclesEffects]),
    StoreModule.forFeature('equipments', equipmentsReducer),
    EffectsModule.forFeature([EquipmentsEffects]),
    StoreModule.forFeature('properties', propertiesReducer),
    EffectsModule.forFeature([PropertiesEffects]),
    StoreModule.forFeature('licenseInformation', licenseInformationReducer),
    EffectsModule.forFeature([LicenseInformationEffects]),
    StoreModule.forFeature(
      'evaluationInformation',
      evaluationInformationReducer
    ),

    EffectsModule.forFeature([EvaluationInformationEffects]),
    EffectsModule.forFeature([PurchasingOrdersEffects]),
    StoreModule.forFeature('purchasingOrders', purchasingOrdersReducer),
  ],
  exports: [
    ViewAssetsComponent,
    AddAssetComponent,
    ViewPurchasingOrdersComponent,
    AddPurchasingOrderComponent,
    WizardAssetComponent,
    ViewEvaluationInformationComponent,
    AddEvaluationInformationComponent,
    ViewLicenseInformationComponent,
    AddLicenseInformationComponent,
  ],
})
export class PurchasingModule {}
