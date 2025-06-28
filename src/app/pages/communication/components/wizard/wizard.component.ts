import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wizard',
  standalone: false,
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.scss',
})
export class WizardComponent {
  cards: any[] = [];
  displayPopup = false;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.cards = [
      [
        {
          imgUrl: '/assets/images/shared/card/details.svg',
          imgAlt: 'details',
          title: 'Meeting Details',
          content: '',
        },
        {
          imgUrl: '/assets/images/shared/card/followup.svg',
          imgAlt: 'followup',
          title: 'Follow Ups',
          content: '',
          link: '/communication/add-follow-up',
        },
        {
          imgUrl: '/assets/images/shared/card/followup.svg',
          imgAlt: 'followup',
          title: 'Follow Ups Points',
          content: '',
          link: '/communication/add-follow-ups-points',
        },
      ],
    ];
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
  navigateTo(link: string) {
    this.router.navigate([link]);
  }
}
