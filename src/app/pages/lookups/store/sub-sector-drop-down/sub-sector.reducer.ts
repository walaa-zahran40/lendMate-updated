import { createReducer, on } from '@ngrx/store';
import * as SubSectorActions from './sub-sector.actions';
import { initialState } from './sub-sector.state';

export const subSectorReducer = createReducer(
  initialState,
  on(SubSectorActions.loadSubSectorsSuccess, (state, { subSectors }) => ({
    ...state,
    subSectors,
  })),
  on(SubSectorActions.loadSubSectorsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(SubSectorActions.loadSubSectorsByIdSuccess, (state, { subSector }) => ({
    ...state,
    selectedSector: subSector,
  })),

  on(SubSectorActions.loadSubSectorsByIdFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
