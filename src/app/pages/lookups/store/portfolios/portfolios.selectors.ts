import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './portfolios.reducer';
import { adapter, State } from './portfolios.state';

export const selectFeature = createFeatureSelector<State>('portfolios');
export const selectPortfoliosFeature =
  createFeatureSelector<State>('portfolios');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectPortfoliosFeature);

export const selectAllPortfolios = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectPortfolioEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectPortfoliosLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectPortfoliosError = createSelector(
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
export const selectPortfoliosTotalCount = createSelector(
  selectPortfoliosFeature,
  (state) => state
);
// History management selectors
export const selectPortfolioState = createFeatureSelector<State>('portfolios');

export const selectHistory = createSelector(
  selectPortfolioState,
  (state) => state.history
);

export const selectHistoryLoaded = createSelector(
  selectPortfolioState,
  (state) => state.historyLoaded
);

export const selectHistoryError = createSelector(
  selectPortfolioState,
  (state) => state.historyError
);
