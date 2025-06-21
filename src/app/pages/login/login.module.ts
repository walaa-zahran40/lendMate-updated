import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {
  IPublicClientApplication,
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation,
  LogLevel,
} from '@azure/msal-browser';
import {
  MsalGuard,
  MsalInterceptor,
  MsalBroadcastService,
  MsalInterceptorConfiguration,
  MsalModule,
  MsalService,
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalGuardConfiguration,
  MsalRedirectComponent,
} from '@azure/msal-angular';
import { environment } from '../../../environments/environment';
import { PermissionService } from './store/permissions/permission.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../shared/interceptors/auth.interceptor';

// const isIE =
//   window.navigator.userAgent.indexOf('MSIE ') > -1 ||
//   window.navigator.userAgent.indexOf('Trident/') > -1;

// export function MSALInstanceFactory(): IPublicClientApplication {
//   return new PublicClientApplication({
//     auth: {
//       clientId: '34d975ae-71fa-4b39-90d4-7140cbb4ed69',
//       authority:
//         'https://login.microsoftonline.com/018f98f9-fb07-4f3f-88ff-dc93c2807a98',
//       redirectUri: environment.redirectUri,
//     },
//     cache: {
//       cacheLocation: BrowserCacheLocation.SessionStorage,
//       storeAuthStateInCookie: isIE,
//     },
//     system: {
//       loggerOptions: {
//         loggerCallback: (level, message, containsPii) => {
//           if (containsPii) return;
//           switch (level) {
//             case LogLevel.Error:
//               console.error(message);
//               break;
//             case LogLevel.Info:
//               console.info(message);
//               break;
//             case LogLevel.Verbose:
//               console.debug(message);
//               break;
//             case LogLevel.Warning:
//               console.warn(message);
//               break;
//           }
//         },
//         logLevel: LogLevel.Verbose,
//         piiLoggingEnabled: false,
//       },
//     },
//   });
// }

// export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
//   const protectedResourceMap = new Map<string, Array<string>>();
//   protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);

//   return {
//     interactionType: InteractionType.Redirect,
//     protectedResourceMap,
//   };
// }

// export function MSALGuardConfigFactory(): MsalGuardConfiguration {
//   return {
//     interactionType: InteractionType.Redirect,
//     authRequest: {
//       scopes: ['user.read'],
//     },
//   };
// }

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    // MsalModule
  ],
  // providers: [
  //   PermissionService,
  //       {
  //         provide: HTTP_INTERCEPTORS,
  //         useClass: MsalInterceptor,
  //         multi: true,
  //       },
  //       {
  //         provide: MSAL_INSTANCE,
  //         useFactory: MSALInstanceFactory,
  //       },
  //       {
  //         provide: MSAL_GUARD_CONFIG,
  //         useFactory: MSALGuardConfigFactory,
  //       },
  //       {
  //         provide: MSAL_INTERCEPTOR_CONFIG,
  //         useFactory: MSALInterceptorConfigFactory,
  //       },
  //       MsalService,
  //       MsalGuard,
  //       MsalBroadcastService,
  // ],
  // bootstrap: [MsalRedirectComponent]
})
export class LoginModule {}
