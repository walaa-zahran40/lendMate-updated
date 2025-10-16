import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared/services/shared.service';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  popupVisible = false;

  constructor(
    private sharedService: SharedService,
    private authService: MsalService
  ) {}

  ngOnInit() {
    this.sharedService.popupVisible$.subscribe((visible) => {
      this.popupVisible = visible;
    });

    this.authService.handleRedirectObservable().subscribe();
  }

  closePopup() {
    this.sharedService.hidePopup();
  }
}
