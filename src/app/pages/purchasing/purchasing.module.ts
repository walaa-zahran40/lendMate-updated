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
import { ViewAssetsComponent } from './components/assets/view-assets/view-assets.component';
import { AddAssetComponent } from './components/assets/add-asset/add-asset.component';
import { ViewPurchasingOrdersComponent } from './components/purchasing-orders/view-purchasing-orders/view-purchasing-orders.component';
import { AddPurchasingOrderComponent } from './components/purchasing-orders/add-purchasing-order/add-purchasing-order.component';
import { ComponentsModule } from '../../shared/components/components.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
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
@NgModule({
  declarations: [
    ViewAssetsComponent,
    AddAssetComponent,
    ViewPurchasingOrdersComponent,
    AddPurchasingOrderComponent,
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
  ],
  exports: [
    ViewAssetsComponent,
    AddAssetComponent,
    ViewPurchasingOrdersComponent,
    AddPurchasingOrderComponent,
  ],
})
export class PurchasingModule {}
