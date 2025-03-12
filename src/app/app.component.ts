import { Component } from '@angular/core';
import { SharedService } from './shared/services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  popupVisible = false;
  offices: any;
  tmlOfficers: any;
  languages: any;
  selectedLanguages!: any;
  selectedTmlOfficers!: any;
  selectedOffices!: any;
  constructor(private sharedService: SharedService) {}

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
  }

  closePopup() {
    this.sharedService.hidePopup();
  }
}
