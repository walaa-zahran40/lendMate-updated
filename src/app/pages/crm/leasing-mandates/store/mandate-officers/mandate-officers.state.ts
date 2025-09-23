// store/mandate-officers.state.ts
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { MandateOfficer } from './mandate-officer.model';

export const mandateOfficersFeatureKey = 'mandateOfficers';

export const mandateOfficerAdapter = createEntityAdapter<MandateOfficer>({
  selectId: (o) => o.id,
  sortComparer: false,
});

export interface MandateOfficersState extends EntityState<MandateOfficer> {
  // global listing
  listLoading: boolean;
  listError: string | null;
  listPageNumber: number | null;
  listTotalCount: number | null;

  // by mandate cache: mandateId -> ids
  byMandateLoading: boolean;
  byMandateError: string | null;
  byMandateMap: Record<number, number[]>;

  // single fetch
  singleLoading: boolean;
  singleError: string | null;

  // mutations
  createLoading: boolean;
  createError: string | null;

  updateLoading: boolean;
  updateError: string | null;

  deleteLoading: boolean;
  deleteError: string | null;
}

export const initialState: MandateOfficersState =
  mandateOfficerAdapter.getInitialState({
    listLoading: false,
    listError: null,
    listPageNumber: null,
    listTotalCount: null,

    byMandateLoading: false,
    byMandateError: null,
    byMandateMap: {},

    singleLoading: false,
    singleError: null,

    createLoading: false,
    createError: null,

    updateLoading: false,
    updateError: null,

    deleteLoading: false,
    deleteError: null,
  });
