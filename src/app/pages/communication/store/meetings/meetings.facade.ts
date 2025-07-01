import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './meetings.actions';
import * as Selectors from './meetings.selectors';
import { Meeting } from './meeting.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors'; // adjust path if needed

@Injectable({ providedIn: 'root' })
export class MeetingsFacade {
  all$ = this.store.select(Selectors.selectAllMeetings);
  loading$ = this.store.select(Selectors.selectMeetingsLoading);
  error$ = this.store.select(Selectors.selectMeetingsError);
  totalCount$ = this.store.select(Selectors.selectMeetingsTotalCount);
  selected$ = this.store.select(
    createSelector(
      Selectors.selectFeature,
      (state) => state.entities[state.loadedId!] // or however you track it
    )
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);
  constructor(private store: Store) {}

  loadAll(pageNumber?: number) {
    this.store.dispatch(Actions.loadAll({ pageNumber }));
  }

  loadById(id: any) {
    this.store.dispatch(Actions.loadById({ id }));
  }

  loadByClientId(id: any) {
    this.store.dispatch(Actions.loadByClientId({ id }));
  }

  create(payload: Partial<Omit<Meeting, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<Meeting>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}
