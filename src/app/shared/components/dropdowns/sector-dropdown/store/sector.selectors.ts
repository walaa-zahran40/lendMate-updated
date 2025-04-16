import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SectorState } from './sector.reducer';
import { Sectors } from '../../../../interfaces/sectors.interface';

// Select the entire feature state (as defined in StoreModule.forFeature('sector', reducer))
export const selectSectorFeature = createFeatureSelector<SectorState>('sector');

export const selectAllSectors = createSelector(
  selectSectorFeature,
  (state: SectorState): Sectors[] => state.sectors ?? []
);

// Select selected sub-sector IDs
export const selectSelectedSubSectorIds = createSelector(
  selectSectorFeature,
  (state: SectorState) => state.selectedSubSectorIds
);
