import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './client-sales-turnovers.reducer';

export const selectFeature = createFeatureSelector<fromReducer.State>(
  fromReducer.clientSalesTurnoversFeatureKey
);

export const selectAllClientSalesTurnovers = createSelector(
  selectFeature,
  fromReducer.selectAll
);

export const selectClientSalesTurnoversTotalCount = createSelector(
  selectFeature,
  (state) => state.totalCount
);

export const selectClientSalesTurnoversLoading = createSelector(
  selectFeature,
  (state) => state.loading
);

export const selectClientSalesTurnoverEntities = createSelector(
  selectFeature,
  fromReducer.selectEntities
);
