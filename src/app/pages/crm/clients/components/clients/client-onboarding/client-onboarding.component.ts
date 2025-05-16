import { Component } from '@angular/core';

@Component({
  selector: 'app-client-onboarding',
  standalone: false,
  templateUrl: './client-onboarding.component.html',
  styleUrl: './client-onboarding.component.scss',
})
export class ClientOnboardingComponent {
  clientOnboardingCompanyShowMain = true;
  clientOnboarding = true;
  saveInfo() {
    console.log('saved');
  }
}
