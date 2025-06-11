import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from './shared/services/shared.service';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { filter, takeUntil } from 'rxjs/operators';
import {
  InteractionStatus,
} from '@azure/msal-browser';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements  OnInit, OnDestroy {
  private readonly _destroying$ = new Subject<void>();
  popupVisible = false;
  offices: any;
  tmlOfficers: any;
  languages: any;
  selectedLanguages!: any;
  selectedTmlOfficers!: any;
  selectedOffices!: any;
  constructor(private sharedService: SharedService,  
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService) {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.sharedService.popupVisible$.subscribe((visible) => {
      this.popupVisible = visible;
    });
    this.offices = [
      { name: 'Office', code: 'office' },
      { name: 'Home', code: 'home' },
      { name: 'Remote', code: 'remote' },
    ];
    this.tmlOfficers = [{ name: '4.0 and up', code: '4aup' }];
    this.languages = [{ name: '4.0 and up', code: '4aup' }];
    this.selectedLanguages = [{ name: 'Office', code: 'office' }];
    this.selectedTmlOfficers = [{ name: '4.0 and up', code: '4aup' }];
    this.selectedOffices = [{ name: '4.0 and up', code: '4aup' }];

    this.authService.handleRedirectObservable().subscribe(); 
  }

  closePopup() {
    this.sharedService.hidePopup();
  }
}
