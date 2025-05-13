import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './team-lead-officers.actions';
import * as Selectors from './team-lead-officers.selectors';
import { Observable } from 'rxjs';
import { TeamLeadOfficer } from './team-lead-officer.model';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class TeamLeadOfficersFacade {
  items$: Observable<TeamLeadOfficer[]> = this.store.select(
    Selectors.selectTeamLeadOfficers
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectTeamLeadOfficersTotal
  );
  history$: Observable<TeamLeadOfficer[]> = this.store.select(
    Selectors.selectTeamLeadOfficersHistory
  );
  current$: Observable<TeamLeadOfficer | undefined> = this.store.select(
    Selectors.selectCurrentTeamLeadOfficer
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectTeamLeadOfficersLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectTeamLeadOfficersError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadTeamLeadOfficers());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadTeamLeadOfficersHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadTeamLeadOfficer({ id }));
  }
  create(data: Partial<TeamLeadOfficer>) {
    this.store.dispatch(Actions.createTeamLeadOfficer({ data }));
  }
  update(id: any, data: Partial<TeamLeadOfficer>) {
    this.store.dispatch(Actions.updateTeamLeadOfficer({ id, data }));
  }
  /** NEW: dispatch the by-teamId loader */
  loadTeamLeadOfficersByTeamId(teamId?: number) {
    if (teamId == null || isNaN(teamId)) {
      console.error(
        '❌ Facade.loadTeamLeadOfficersByTeamId called with invalid id:',
        teamId
      );
      return;
    }
    this.store.dispatch(Actions.loadTeamLeadOfficersByTeamId({ teamId }));
  }

  /** UPDATED: now expects both id & parent teamId */
  delete(id: number, teamId: number) {
    this.store.dispatch(Actions.deleteTeamLeadOfficer({ id, teamId }));
  }
  loadByTeamId(teamId: number) {
    this.store.dispatch(Actions.loadTeamLeadOfficersByTeamId({ teamId }));
  }
}
