import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ViewPaymentTypesComponent } from './pages/lookups/view-payment-types/view-payment-types.component';
import { ViewPaymentMonthDaysComponent } from './pages/lookups/view-payment-month-days/view-payment-month-days.component';
import { ViewMeetingTypesComponent } from './pages/lookups/view-meeting-types/view-meeting-types.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ClientsEffects } from './pages/crm/clients/state/clients/clients.effects';
import { clientsReducer } from './pages/crm/clients/state/clients/clients.reducer';

@NgModule({
  declarations: [
    AppComponent,
    ViewPaymentTypesComponent,
    ViewPaymentMonthDaysComponent,
    ViewMeetingTypesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PagesModule,
    NgbModule,
    SelectModule,
    FormsModule,
    ButtonModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  providers: [
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
  exports: [SharedModule],
})
export class AppModule {}
