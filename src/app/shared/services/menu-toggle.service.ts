import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuToggleService {
  private toggleSubject = new BehaviorSubject<boolean>(true);
  toggle$ = this.toggleSubject.asObservable();

  toggleMenu() {
    this.toggleSubject.next(!this.toggleSubject.value);
  }
}
