import {
  Component,
  ElementRef,
  Inject,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
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
import { Subject, filter, takeUntil } from 'rxjs';
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
    // this.authService.handleRedirectObservable();
    // this.authService.loginRedirect();

    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(async () => {
        await this.setLoginDisplay();
      });

    this.msalBroadcastService.msalSubject$
      .pipe(takeUntil(this._destroying$))
      .subscribe((msg: EventMessage) => {
        console.log('MSAL Event Type:', msg.error);
        console.log('Full Event Message:', msg);

        if (msg.eventType === EventType.LOGIN_SUCCESS) {
          this.handleLoginSuccess(msg);
        }
      });
  }

  ngOnDestroy(): void {
    this._destroying$.next();
    this._destroying$.complete();
  }

  login() {
    // debugger;
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest);
      debugger;
    } else {
      debugger;

      this.authService.loginRedirect();
      debugger;
    }
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

          // only navigate once permissions are available
          const sub = this.permissionService.permissionsLoaded$.subscribe(
            () => {
              sub.unsubscribe();
              console.log('directed');
              this.router.navigate(['/crm/clients/view-clients-onboarding']);
            }
          );
          // reload and broadcast API permissions
          this.permissionService.loadPermissions();
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
