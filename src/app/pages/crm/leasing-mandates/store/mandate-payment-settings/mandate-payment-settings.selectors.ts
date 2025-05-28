import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './mandate-payment-settings.reducer';
import { adapter, State } from './mandate-payment-settings.state';

export const selectFeature = createFeatureSelector<State>('mandatePaymentSettings');
export const selectMandatePaymentSettingsFeature =
  createFeatureSelector<State>('mandatePaymentSettings');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectMandatePaymentSettingsFeature);

export const selectAllMandatePaymentSettings = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectMandatePaymentSettingEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectMandatePaymentSettingsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectMandatePaymentSettingsError = createSelector(
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
export const selectMandatePaymentSettingsTotalCount = createSelector(
  selectMandatePaymentSettingsFeature,
  (state) => state
);
