import { Component, Input, OnInit } from '@angular/core';
import { MenuToggleService } from '../../services/menu-toggle.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  checked = true;
  darkMode: boolean = false;
  displayPopup = false;
  user: string | null = null;
  @Input() userName: string | null = null;

  constructor(
    private menuToggleService: MenuToggleService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    this.darkMode = false;
    this.user = this.authService.getLoggedInUser();
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
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
