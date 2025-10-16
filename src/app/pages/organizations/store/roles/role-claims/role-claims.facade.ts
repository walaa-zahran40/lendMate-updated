import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './role-claims.actions';
import * as Selectors from './role-claims.selectors';
import { Observable } from 'rxjs';
import { RoleClaim } from './role-claim.model';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class RoleClaimsFacade {
  items$: Observable<RoleClaim[]> = this.store.select(
    Selectors.selectRoleClaims
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectRoleClaimsTotal
  );
  history$: Observable<RoleClaim[]> = this.store.select(
    Selectors.selectRoleClaimsHistory
  );
  current$: Observable<RoleClaim | undefined> = this.store.select(
    Selectors.selectCurrentRoleClaim
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectRoleClaimsLoading
  );
  error$: Observable<any> = this.store.select(Selectors.selectRoleClaimsError);
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadRoleClaims());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadRoleClaimsHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadRoleClaim({ id }));
  }
  create(data: Partial<RoleClaim>) {
    this.store.dispatch(Actions.createRoleClaim({ data }));
  }
  update(id: any, data: Partial<RoleClaim>) {
    this.store.dispatch(Actions.updateRoleClaim({ id, data }));
  }
  /** NEW: dispatch the by-roleId loader */
  loadRoleClaimsByRoleId(roleId?: number) {
    if (roleId == null || isNaN(roleId)) {
      console.error(
        '❌ Facade.loadRoleClaimsByRoleId called with invalid id:',
        roleId
      );
      return;
    }
    this.store.dispatch(Actions.loadRoleClaimsByRoleId({ roleId }));
  }

  /** UPDATED: now expects both id & parent roleId */
  delete(id: number, roleId: number) {
    this.store.dispatch(Actions.deleteRoleClaim({ id, roleId }));
  }
  loadByRoleId(roleId: number) {
    this.store.dispatch(Actions.loadRoleClaimsByRoleId({ roleId }));
  }
}
