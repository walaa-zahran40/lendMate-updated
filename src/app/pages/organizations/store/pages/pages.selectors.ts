import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './pages.reducer';
import { adapter, State } from './pages.state';

export const selectFeature = createFeatureSelector<State>('pages');
export const selectPagesFeature = createFeatureSelector<State>('pages');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectPagesFeature);

export const selectAllPages = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAddressTypeEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectPagesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectPagesError = createSelector(
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
export const selectPagesTotalCount = createSelector(
  selectPagesFeature,
  (state) => state
);
