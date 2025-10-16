import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './team-officers.actions';
import * as Selectors from './team-officers.selectors';
import { Observable } from 'rxjs';
import { TeamOfficer } from './team-officer.model';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class TeamOfficersFacade {
  items$: Observable<TeamOfficer[]> = this.store.select(
    Selectors.selectTeamOfficers
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectTeamOfficersTotal
  );
  history$: Observable<TeamOfficer[]> = this.store.select(
    Selectors.selectTeamOfficersHistory
  );
  current$: Observable<TeamOfficer | undefined> = this.store.select(
    Selectors.selectCurrentTeamOfficer
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectTeamOfficersLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectTeamOfficersError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadTeamOfficers());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadTeamOfficersHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadTeamOfficer({ id }));
  }
  create(data: Partial<TeamOfficer>) {
    this.store.dispatch(Actions.createTeamOfficer({ data }));
  }
  update(id: any, data: Partial<TeamOfficer>) {
    this.store.dispatch(Actions.updateTeamOfficer({ id, data }));
  }
  /** NEW: dispatch the by-teamId loader */
  loadTeamOfficersByTeamId(teamId?: number) {
    if (teamId == null || isNaN(teamId)) {
      console.error(
        '❌ Facade.loadTeamOfficersByTeamId called with invalid id:',
        teamId
      );
      return;
    }
    this.store.dispatch(Actions.loadTeamOfficersByTeamId({ teamId }));
  }

  /** UPDATED: now expects both id & parent teamId */
  delete(id: number, teamId: number) {
    this.store.dispatch(Actions.deleteTeamOfficer({ id, teamId }));
  }
  loadByTeamId(teamId: number) {
    this.store.dispatch(Actions.loadTeamOfficersByTeamId({ teamId }));
  }
}
