import { Sector } from '../../../../interfaces/sector.interface';
export interface SectorState {
  sectors: Sector[];
  selectedSubSectorIds: number[];
  selectedSector: Sector | null;
  error: any;
}

export const initialState: SectorState = {
  sectors: [],
  selectedSubSectorIds: [],
  selectedSector: null,
  error: null,
};
