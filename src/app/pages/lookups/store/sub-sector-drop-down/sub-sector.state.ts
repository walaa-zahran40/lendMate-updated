import { SubSectors } from '../../../../shared/interfaces/sub-sector.interface';
export interface SubSectorState {
  subSectors: SubSectors[];
  selectedSubSectorIds: number[];
  selectedSubSector: SubSectors | null;
  error: any;
}

export const initialState: SubSectorState = {
  subSectors: [],
  selectedSubSectorIds: [],
  selectedSubSector: null,
  error: null,
};
