import { MandateActionAuthorizationGroup } from './action-authorization-group.model';

export interface MandateActionAuthorizationGroupsState {
  items: MandateActionAuthorizationGroup[];
  history: MandateActionAuthorizationGroup[];
  current?: MandateActionAuthorizationGroup;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialMandateActionAuthorizationGroupsState: MandateActionAuthorizationGroupsState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
