import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  /**
   * Return true if it’s _safe_ to leave (i.e. no pending edits),
   * or false/Observable<false> if there _are_ unsaved changes.
   */
  canDeactivate: () => boolean | Observable<boolean>;
}
