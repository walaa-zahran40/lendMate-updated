import { createReducer, on } from '@ngrx/store';
import * as SectorActions from './sector.actions';
import { Sectors } from '../../../interfaces/sectors.interface';

export interface SectorState {
    sectors: Sectors[];
    selectedSubSectorIds: number[];
   error: any;
}

export const initialState: SectorState = {
    sectors: [],
    error: null,
    selectedSubSectorIds: []
};

export const sectorReducer = createReducer(
  initialState,
  on(SectorActions.loadSectorsSuccess, (state, { sectors }) => ({ ...state, sectors })),
  on(SectorActions.loadSectorsFailure, (state, { error }) => ({ ...state, error }))
);