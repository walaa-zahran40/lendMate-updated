import { createReducer, on } from '@ngrx/store';
import * as SectorActions from './sector.actions';
import { Sectors } from '../../../../../shared/interfaces/sectors.interface';

export interface SectorState {
  sectors: Sectors[];
  selectedSubSectorIds: number[];
  error: any;
}

export const initialState: SectorState = {
  sectors: [],
  error: null,
  selectedSubSectorIds: [],
};

export const sectorReducer = createReducer(
  initialState,
  on(SectorActions.loadSectorsSuccess, (state, { sectors }) => ({
    ...state,
    sectors,
  })),
  on(SectorActions.loadSectorsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(SectorActions.loadSectorByIdSuccess, (state, { sector }) => ({
    ...state,
    selectedSector: sector,
  })),

  on(SectorActions.loadSectorByIdFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
