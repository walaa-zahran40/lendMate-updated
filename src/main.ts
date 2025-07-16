/// <reference types="@angular/localize" />
import { enableProdMode } from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { PublicClientApplication } from '@azure/msal-browser';
import { environment } from './environments/environment';

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true,
  })
  .catch((err) => console.error(err));

const msalInstance = new PublicClientApplication({
  auth: {
    clientId: 'your-client-id',
    authority: 'https://login.microsoftonline.com/your-tenant-id',
    redirectUri: 'http://localhost:3000',
  },
});

msalInstance.initialize(); // 👈 This is REQUIRED before any other call
if (environment.production) {
  enableProdMode();
}
