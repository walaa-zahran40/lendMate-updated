import { ClientCRAuthorityOffice } from './client-cr-authority-office.model';

export interface ClientCRAuthorityOfficesState {
  items: ClientCRAuthorityOffice[];
  history: ClientCRAuthorityOffice[];
  current?: ClientCRAuthorityOffice;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialClientCRAuthorityOfficesState: ClientCRAuthorityOfficesState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
