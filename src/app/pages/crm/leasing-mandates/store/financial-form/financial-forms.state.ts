import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  CalculationConfigurationByFeeType,
  FinancialForm,
} from './financial-form.model';
import { Calculation } from '../../../../../shared/interfaces/calculations.interface';

export interface State extends EntityState<FinancialForm> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  calculatedRowsByMandate: {
    [mandateId: number]: Calculation[];
  };
  calcConfig: CalculationConfigurationByFeeType | null;
  calcConfigLoading: boolean;
  calcConfigError: any;
}

export const adapter: EntityAdapter<FinancialForm> =
  createEntityAdapter<FinancialForm>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  calculatedRowsByMandate: {},
  calcConfig: null,
  calcConfigLoading: false,
  calcConfigError: null,
});
