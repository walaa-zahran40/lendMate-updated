import {
  IPublicClientApplication,
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation,
  LogLevel,
} from '@azure/msal-browser';
import {
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
} from '@azure/msal-angular';
import { environment } from './src/environments/environment';
const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '34d975ae-71fa-4b39-90d4-7140cbb4ed69',
      authority:
        'https://login.microsoftonline.com/018f98f9-fb07-4f3f-88ff-dc93c2807a98',
      redirectUri: window.location.origin, // ✅ simple & correct
      navigateToLoginRequestUrl: false,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.SessionStorage,
      storeAuthStateInCookie: isIE,
    },
    system: {
      allowRedirectInIframe: true, // ✅ needed if your app can load in an iframe
      loggerOptions: {
        loggerCallback: (level, message, containsPii) => {
          if (containsPii) return;
          console.log(level, message);
        },
        logLevel: LogLevel.Verbose,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', [
    'user.read',
  ]);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read'],
    },
  };
}
