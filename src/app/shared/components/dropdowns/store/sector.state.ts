import { Sectors } from '../../../interfaces/sectors.interface';

export interface SectorState {
  sectors: Sectors[];
  loading: boolean;
  error: any;
}

export const initialSectorState: SectorState = {
  sectors: [],
  loading: false,
  error: null,
};
