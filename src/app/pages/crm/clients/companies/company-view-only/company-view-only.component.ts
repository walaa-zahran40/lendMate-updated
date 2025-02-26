import { Component } from '@angular/core';

@Component({
  selector: 'app-company-view-only',
  standalone: false,
  templateUrl: './company-view-only.component.html',
  styleUrl: './company-view-only.component.scss',
})
export class CompanyViewOnlyComponent {
  close() {
    console.log('added');
  }
}
