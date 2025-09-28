// store/agreement-contactPersons.state.ts
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { AgreementContactPerson } from './agreement-contact-person.model';

export const agreementContactPersonsFeatureKey = 'agreementContactPersons';

export const agreementContactPersonAdapter =
  createEntityAdapter<AgreementContactPerson>({
    selectId: (o) => o.id,
    sortComparer: false,
  });

export interface AgreementContactPersonsState
  extends EntityState<AgreementContactPerson> {
  // global listing
  listLoading: boolean;
  listError: string | null;
  listPageNumber: number | null;
  listTotalCount: number | null;

  // by agreement cache: agreementId -> ids
  byAgreementLoading: boolean;
  byAgreementError: string | null;
  byAgreementMap: Record<number, number[]>;

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

export const initialState: AgreementContactPersonsState =
  agreementContactPersonAdapter.getInitialState({
    listLoading: false,
    listError: null,
    listPageNumber: null,
    listTotalCount: null,

    byAgreementLoading: false,
    byAgreementError: null,
    byAgreementMap: {},

    singleLoading: false,
    singleError: null,

    createLoading: false,
    createError: null,

    updateLoading: false,
    updateError: null,

    deleteLoading: false,
    deleteError: null,
  });
