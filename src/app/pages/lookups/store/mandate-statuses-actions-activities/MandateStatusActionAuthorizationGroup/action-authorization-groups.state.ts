import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { MandateActionAuthorizationGroup } from './action-authorization-group.model';

export interface MandateActionAuthorizationGroupsState {
  items: MandateActionAuthorizationGroup[];
  current?: MandateActionAuthorizationGroup;
  loading: boolean;
  error: any;
  totalCount: number;
  //History management
  history: MandateActionAuthorizationGroup[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<MandateActionAuthorizationGroup> =
  createEntityAdapter<MandateActionAuthorizationGroup>();

export const initialMandateActionAuthorizationGroupsState: MandateActionAuthorizationGroupsState =
  {
    items: [],
    current: undefined,
    loading: false,
    error: null,
    totalCount: 0,
    history: [],
    historyLoaded: false,
    historyError: null,
  };
