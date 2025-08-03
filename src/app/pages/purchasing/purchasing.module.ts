import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SharedModule } from 'primeng/api';
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
    ReactiveFormsModule,
    DialogModule,
    ComponentsModule,
    SelectModule,
    DatePickerModule,
    StoreModule.forFeature('assets', assetsReducer),
    EffectsModule.forFeature([AssetsEffects]),
  ],
  exports: [
    ViewAssetsComponent,
    AddAssetComponent,
    ViewPurchasingOrdersComponent,
    AddPurchasingOrderComponent,
  ],
})
export class PurchasingModule {}
