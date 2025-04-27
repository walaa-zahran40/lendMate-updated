import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromContactPersons from './contact-person.reducer';

export const selectContactPersonsState =
  createFeatureSelector<fromContactPersons.State>(
    fromContactPersons.contactPersonsFeatureKey
  );

export const selectAllContactPersons = createSelector(
  selectContactPersonsState,
  fromContactPersons.selectAll
);

export const selectContactPersonsLoading = createSelector(
  selectContactPersonsState,
  (state) => state.loading
);

export const selectContactPersonsError = createSelector(
  selectContactPersonsState,
  (state) => state.error
);

export const selectContactPersonsTotal = createSelector(
  selectContactPersonsState,
  (state) => state.totalCount
);

export const selectContactPersonEntities = createSelector(
  selectContactPersonsState,
  fromContactPersons.selectEntities
);

export const selectContactPersonById = (id: number) =>
  createSelector(selectContactPersonEntities, (entities) => entities[id]);
