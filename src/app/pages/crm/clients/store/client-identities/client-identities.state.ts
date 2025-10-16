import { ClientIdentity } from './client-identity.model';

export interface ClientIdentitiesState {
  items: ClientIdentity[];
  history: ClientIdentity[];
  current?: ClientIdentity;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialClientIdentitiesState: ClientIdentitiesState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
