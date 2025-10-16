import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './followup-types.actions';
import * as Selectors from './followup-types.selectors';
import { FollowupType } from './folllowup-type.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors'; // adjust path if needed

@Injectable({ providedIn: 'root' })
export class FollowupTypesFacade {
  all$ = this.store.select(Selectors.selectAllFollowupTypes);
  loading$ = this.store.select(Selectors.selectFollowupTypesLoading);
  error$ = this.store.select(Selectors.selectFollowupTypesError);
  totalCount$ = this.store.select(Selectors.selectFollowupTypesTotalCount);
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

  create(payload: Partial<Omit<FollowupType, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<FollowupType>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  //History management
  history$ = this.store.select(Selectors.selectFollowUpTypeHistory);

  readonly followUpTypeHistory$ = this.store.select(
    Selectors.selectFollowUpTypeHistory
  );
  readonly followUpTypeHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadFollowUpTypeHistory());
  }
}
