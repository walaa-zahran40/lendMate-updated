import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './meeting-types.actions';
import * as Selectors from './meeting-types.selectors';
import { MeetingType } from './meeting-type.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class MeetingTypesFacade {
  all$ = this.store.select(Selectors.selectAllMeetingTypes);
  loading$ = this.store.select(Selectors.selectMeetingTypesLoading);
  error$ = this.store.select(Selectors.selectMeetingTypesError);
  totalCount$ = this.store.select(Selectors.selectMeetingTypesTotalCount);
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

  loadById(id: number) {
    this.store.dispatch(Actions.loadById({ id }));
  }

  create(payload: Partial<Omit<MeetingType, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<MeetingType>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  //History management
  history$ = this.store.select(Selectors.selectMeetingTypeHistory);

  readonly meetingTypeHistory$ = this.store.select(
    Selectors.selectMeetingTypeHistory
  );
  readonly meetingTypeHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadMeetingTypeHistory());
  }
}
