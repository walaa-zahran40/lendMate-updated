import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Sectors } from '../../interfaces/sectors.interface';

export interface SectorState {
  sectors: Sectors[];
  selectedSubSectorIds: number[];
  selectedSector: Sectors | null; // Add the selectedSector property
}

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
export const selectSelectedSector = createSelector(
  selectSectorFeature,
  (state: SectorState) => state.selectedSector
);
