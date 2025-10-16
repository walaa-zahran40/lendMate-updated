import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuToggleService {
  private _visible$ = new BehaviorSubject<boolean>(true);
  readonly visible$ = this._visible$.asObservable();

  toggleMenu(): void {
    this._visible$.next(!this._visible$.value);
  }
  show(): void {
    this._visible$.next(true);
  }
  hide(): void {
    this._visible$.next(false);
  }
}
