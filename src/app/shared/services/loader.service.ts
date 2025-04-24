import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private count = 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  show() {
    console.log('LoaderService.show()'); // <— should appear on every HTTP start

    if (++this.count === 1) {
      this.loadingSubject.next(true);
    }
  }

  hide() {
    console.log('LoaderService.hide()'); // <— should appear on every HTTP finish

    if (this.count === 0 || --this.count === 0) {
      this.loadingSubject.next(false);
    }
  }
}
