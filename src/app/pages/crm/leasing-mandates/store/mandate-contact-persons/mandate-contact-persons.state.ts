// store/mandate-contactPersons.state.ts
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { MandateContactPerson } from './mandate-contact-person.model';

export const mandateContactPersonsFeatureKey = 'mandateContactPersons';

export const mandateContactPersonAdapter =
  createEntityAdapter<MandateContactPerson>({
    selectId: (o) => o.id,
    sortComparer: false,
  });

export interface MandateContactPersonsState
  extends EntityState<MandateContactPerson> {
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

export const initialState: MandateContactPersonsState =
  mandateContactPersonAdapter.getInitialState({
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
