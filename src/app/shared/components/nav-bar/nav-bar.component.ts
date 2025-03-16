import { Component } from '@angular/core';
import { MenuToggleService } from '../../services/menu-toggle.service';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  checked = true;
  darkMode: boolean = false;
  constructor(private menuToggleService: MenuToggleService) {}

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  toggleMenu() {
    this.menuToggleService.toggleMenu();
  }
}
