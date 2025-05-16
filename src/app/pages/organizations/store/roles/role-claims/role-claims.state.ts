import { RoleClaim } from './role-claim.model';

export interface RoleClaimsState {
  items: RoleClaim[];
  history: RoleClaim[];
  current?: RoleClaim;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialRoleClaimsState: RoleClaimsState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
