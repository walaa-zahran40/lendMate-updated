import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { AgreementContactPerson } from './agreement-contact-person.model';

export const agreementContactPersonsFeatureKey = 'agreementContactPersons';
function cryptoRandom() {
  return Math.random().toString(36).slice(2);
}

export const agreementContactPersonAdapter =
  createEntityAdapter<AgreementContactPerson>({
    selectId: (o) => {
      // prefer real id when present
      if (o.id != null) return String(o.id);

      // fallback (example): use agreementId + contactPersonId if you have them
      // adjust fields to your actual shape
      const fallback = `ag:${o['agreementId'] ?? 'na'}-cp:${
        o['contactPersonId'] ?? cryptoRandom()
      }`;
      return fallback;
    },
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
  byAgreementMap: Record<number, number[]>;

  // NEW: per agreement load/error
  byAgreementLoadingMap: Record<number, boolean>;
  byAgreementErrorMap: Record<number, string | null>;

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

    byAgreementMap: {},

    // NEW maps
    byAgreementLoadingMap: {},
    byAgreementErrorMap: {},

    singleLoading: false,
    singleError: null,

    createLoading: false,
    createError: null,

    updateLoading: false,
    updateError: null,

    deleteLoading: false,
    deleteError: null,
  });
