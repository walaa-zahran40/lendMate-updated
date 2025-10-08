import {
  Component,
  ElementRef,
  Inject,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { Router, RouterStateSnapshot } from '@angular/router';

import {
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalService,
  MsalBroadcastService,
} from '@azure/msal-angular';

import {
  InteractionStatus,
  EventMessage,
  RedirectRequest,
  EventType,
} from '@azure/msal-browser';

import { Subject, filter, take, takeUntil } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { jwtDecode } from 'jwt-decode';

import { environment } from '../../../../environments/environment';

import { PermissionService } from '../store/permissions/permission.service';

interface CustomJwtPayload {
  name: string;

  role: string;

  preferred_username: string;

  [key: string]: any;
}

@Component({
  selector: 'app-login',

  standalone: false,

  templateUrl: './login.component.html',

  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('nav', { static: false }) nav!: ElementRef;

  loginDisplay = false;

  private readonly _destroying$ = new Subject<void>();

  private attemptedGuardNav = false;

  constructor(
    private router: Router,

    private elementRef: ElementRef,

    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,

    private authService: MsalService,

    private msalBroadcastService: MsalBroadcastService,

    private http: HttpClient,

    private permissionService: PermissionService
  ) {
    const savedLang = sessionStorage.getItem('language') || 'en';

    const isArabic = savedLang === 'ar';

    document.documentElement.lang = savedLang;

    document.body.classList.toggle('arabic', isArabic);
  }

  ngOnInit(): void {
    console.log('after redirect');

    this.msalBroadcastService.inProgress$

      .pipe(
        filter((status) => status === InteractionStatus.None),

        takeUntil(this._destroying$)
      )

      .subscribe(() => {
        this.setLoginDisplay();

        // 🔑 Only navigate ONCE to the guarded route.

        if (!this.loginDisplay && !this.attemptedGuardNav) {
          this.attemptedGuardNav = true; // 👈 gate subsequent calls

          this.router.navigate(['/crm/clients/view-clients-onboarding']);
        }
      });

    this.msalBroadcastService.msalSubject$

      .pipe(takeUntil(this._destroying$))

      .subscribe((msg: EventMessage) => {
        console.log('MSAL Event Type:', msg.error);

        console.log('Full Event Message:', msg);

        if (msg.eventType === EventType.LOGIN_SUCCESS) {
          this.handleLoginSuccess(msg);

          console.log('[MSAL] origin:', window.location.origin);
        }
      });
  }

  ngOnDestroy(): void {
    this._destroying$.next();

    this._destroying$.complete();
  }

  private buildLoginRequest(): RedirectRequest {
    // Resolve guard request (can be object or function)

    let guardReq: any | undefined;

    if (typeof this.msalGuardConfig.authRequest === 'function') {
      const state: RouterStateSnapshot = this.router.routerState.snapshot;

      guardReq = this.msalGuardConfig.authRequest(this.authService, state);
    } else {
      guardReq = this.msalGuardConfig.authRequest;
    }

    // Ensure scopes is a concrete string[]

    const baseScopes = ['openid', 'profile', 'email']; // add 'User.Read' or API scopes if needed

    const mergedScopes = [
      ...baseScopes,

      ...(Array.isArray(guardReq?.scopes) ? guardReq.scopes : []),
    ];

    // Build a proper RedirectRequest

    const loginRequest: RedirectRequest = {
      scopes: mergedScopes,

      ...guardReq, // keep other fields like extraQueryParameters, redirectStartPage, etc.
    };

    return loginRequest;
  }

  login() {
    const req = this.buildLoginRequest();

    this.authService.loginRedirect(req);
  }

  handleLoginSuccess(msg: EventMessage): void {
    debugger;

    const idToken = (msg.payload as any).idToken;

    const decodedToken: any = jwtDecode(idToken);

    const profile = {
      displayName: decodedToken.name,

      givenName: decodedToken.preferred_username,

      surname: decodedToken.name,

      userPrincipalName: decodedToken.preferred_username,
    };

    sessionStorage.setItem('username', decodedToken.name);

    sessionStorage.setItem('role', decodedToken.role || '');

    this.performLoginPostRequest(profile);
  }

  performLoginPostRequest(profile: any): void {
    const url = environment.apiUrl + 'auth/Login';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http

      .post<{ token: string; tokenKey: string }>(url, profile, { headers })

      .subscribe(
        ({ token, tokenKey }) => {
          if (!token) {
            console.error('Token not found in response');

            this.authService.logoutRedirect();

            return;
          }

          // decode and stash identity

          const decoded = jwtDecode<CustomJwtPayload>(token);

          sessionStorage.setItem('authToken', token);

          sessionStorage.setItem('tokenKey', tokenKey);

          sessionStorage.setItem(
            'username',

            decoded[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
            ]
          );

          sessionStorage.setItem(
            'role',

            decoded[
              'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
            ]
          );

          sessionStorage.setItem('decodedToken', JSON.stringify(decoded));

          // reload and broadcast API permissions

          this.permissionService.loadPermissions();

          // navigate once and auto-unsubscribe

          this.permissionService.permissionsLoaded$

            .pipe(take(1))

            .subscribe(() => {
              console.log('directed');

              this.router.navigate(['/crm/clients/view-clients-onboarding']);
            });
        },

        (err) => {
          console.error('Login request failed:', err);

          this.authService.logoutRedirect();
        }
      );
  }

  setLoginDisplay(): void {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  toggleClasses(): void {
    const nav = this.nav.nativeElement;

    if (nav) {
      nav.classList.toggle('hideNav');
    }
  }

  isLoginPage(): boolean {
    return this.router.url === '/';
  }
}
