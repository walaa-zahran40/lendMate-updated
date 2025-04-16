import { Sectors } from '../../../../interfaces/sectors.interface';
export interface SectorState {
  sectors: Sectors[];
  selectedSubSectorIds: number[];
  selectedSector: Sectors | null;
  error: any;
}

export const initialState: SectorState = {
  sectors: [],
  selectedSubSectorIds: [],
  selectedSector: null,
  error: null,
};
