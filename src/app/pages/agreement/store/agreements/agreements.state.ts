import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { LeasingAgreement, PagedHistory } from './agreement.model';

export const LEASING_AGREEMENTS_FEATURE_KEY = 'leasingAgreements';

export interface LeasingAgreementsState extends EntityState<LeasingAgreement> {
  loading: boolean;
  error: string | null; // was: error?: ...
  selectedId: number | null; // was: selectedId?: ...
  history: PagedHistory<LeasingAgreement> | null; // was: history?: ...
}

export const agreementsAdapter = createEntityAdapter<LeasingAgreement>({
  selectId: (a) => a.id,
  sortComparer: (a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''),
});

export const initialLeasingAgreementsState: LeasingAgreementsState =
  agreementsAdapter.getInitialState({
    loading: false,
    error: null,
    selectedId: null,
    history: null,
  });
