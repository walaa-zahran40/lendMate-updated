import { Component, OnInit } from '@angular/core';
import { MenuToggleService } from '../../services/menu-toggle.service';

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

  constructor(private menuToggleService: MenuToggleService) {}
  ngOnInit() {
    this.darkMode = false;
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
}
