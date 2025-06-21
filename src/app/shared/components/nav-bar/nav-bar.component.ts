import { Component, OnInit } from '@angular/core';
import { MenuToggleService } from '../../services/menu-toggle.service';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { PermissionService } from '../../../pages/login/store/permissions/permission.service';
import { filter, takeUntil } from 'rxjs/operators';
import { InteractionStatus } from '@azure/msal-browser';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  checked = true;
  loginDisplay = false;
  darkMode: boolean = false;
  displayPopup = false;
  username: string = '';

  constructor(
    private menuToggleService: MenuToggleService,
    private authService: MsalService,
    private permissionService: PermissionService,
    private msalBroadcastService: MsalBroadcastService,
    private cookieService: CookieService
  ) {}
  ngOnInit() {
    this.darkMode = false;
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.setUsername();
      });
  }
  private setUsername() {
    const accounts = this.authService.instance.getAllAccounts();
    if (accounts.length > 0) {
      // MSAL puts the display name into account.name
      this.username = accounts[0].name || '';
    } else {
      this.username = '';
    }
  }
  private setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }
  toggleMenu() {
    this.menuToggleService.toggleMenu();
  }

  showDialog() {
    this.displayPopup = true;
  }
  onCardClick(index: number): void {
    if (index === 0) {
      console.log('showed');
      this.showDialog();
    }
  }
  hideDialog() {
    this.displayPopup = false;
  }

  toggleTheme(isDark: boolean) {
    this.darkMode = isDark;

    document.body.classList.toggle('dark-theme', isDark);
  }

  logout() {
    this.authService.logoutRedirect({
      postLogoutRedirectUri: '/',
    });
    this.permissionService.clearPermissions();
    this.cookieService.delete('authToken');
    this.cookieService.delete('username');
    this.cookieService.delete('role');
  }
}
