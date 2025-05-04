import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SubSectors } from '../../../../../shared/interfaces/sub-sector.interface';
import { SubSectorState } from './sub-sector.state';

// Select the entire feature state registered as 'subSector'
export const selectSubSectorFeature =
  createFeatureSelector<SubSectorState>('subSector');

// 🔹 1. Select all sub-sectors (safe fallback)
export const selectAllSubSectors = createSelector(
  selectSubSectorFeature,
  (state: SubSectorState): SubSectors[] => state?.subSectors ?? []
);

// 🔹 2. Select selected sub-sector IDs
export const selectSelectedSubSectorIds = createSelector(
  selectSubSectorFeature,
  (state: SubSectorState): number[] => state?.selectedSubSectorIds ?? []
);

// 🔹 3. Select currently selected sub-sector
export const selectSelectedSubSector = createSelector(
  selectSubSectorFeature,
  (state: SubSectorState): SubSectors | null => state?.selectedSubSector ?? null
);

// 🔹 4. (Optional) Select nested subSectors inside selectedSubSector if it has children
export const selectNestedSubSectorsFromSelected = createSelector(
  selectSelectedSubSector,
  (selected): SubSectors[] => selected?.subSectors ?? []
);
