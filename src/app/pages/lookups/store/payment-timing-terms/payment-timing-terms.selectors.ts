import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './payment-timing-terms.reducer';
import { adapter, State } from './payment-timing-terms.state';

export const selectFeature = createFeatureSelector<State>('paymentTimingTerms');
export const selectPaymentTimingTermsFeature =
  createFeatureSelector<State>('paymentTimingTerms');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(
  selectPaymentTimingTermsFeature
);

export const selectAllPaymentTimingTerms = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectPaymentTimingTermEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectPaymentTimingTermsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectPaymentTimingTermsError = createSelector(
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
export const selectPaymentTimingTermsTotalCount = createSelector(
  selectPaymentTimingTermsFeature,
  (state) => state
);
