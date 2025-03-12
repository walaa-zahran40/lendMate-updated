import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private popupVisible = new BehaviorSubject<boolean>(false);
  popupVisible$ = this.popupVisible.asObservable();

  showPopup() {
    this.popupVisible.next(true);
  }

  hidePopup() {
    this.popupVisible.next(false);
  }
}
