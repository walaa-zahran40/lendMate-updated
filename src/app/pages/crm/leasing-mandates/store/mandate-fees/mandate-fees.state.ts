import {
  CalculationConfigurationByFeeType,
  MandateFee,
} from './mandate-fee.model';

export interface MandateFeesState {
  items: MandateFee[];
  history: MandateFee[];
  current?: MandateFee;
  loading: boolean;
  error: any;
  totalCount: number;
  calcConfig: CalculationConfigurationByFeeType | null;
  calcConfigLoading: boolean;
  calcConfigError: any;
}

export const initialMandateFeesState: MandateFeesState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
  calcConfig: null,
  calcConfigLoading: false,
  calcConfigError: null,
};
