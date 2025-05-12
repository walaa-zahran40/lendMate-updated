import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor';
import { uiReducer } from './shared/store/ui-state.reducer';
import { PreloadAllModules, RouterModule } from '@angular/router';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PagesModule,
    NgbModule,
    SelectModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    ButtonModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreModule.forFeature('ui', uiReducer),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },

    provideHttpClient(),

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
