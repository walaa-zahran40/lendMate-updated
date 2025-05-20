import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './clients.reducer';
import { adapter, State } from './clients.state';

export const selectFeature = createFeatureSelector<State>('clients');
export const selectClientsFeature = createFeatureSelector<State>('clients');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectClientsFeature);

export const selectAllClients = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectClientEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectClientsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectClientsError = createSelector(
  selectFeature,
  (state) => state.error
);

export const selectLoadedId = createSelector(
  selectFeature,
  (state) => state.loadedId
);

export const selectCurrent = createSelector(
  selectEntities,
  selectLoadedId,
  (entities, id) => (id != null ? entities[id] : null)
);
export const selectClientsTotalCount = createSelector(
  selectClientsFeature,
  (state) => state
);
