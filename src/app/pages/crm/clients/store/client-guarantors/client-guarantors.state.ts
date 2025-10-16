import { ClientGuarantor } from './client-guarantor.model';

export interface ClientGuarantorsState {
  items: ClientGuarantor[];
  history: ClientGuarantor[];
  current?: ClientGuarantor;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialClientGuarantorsState: ClientGuarantorsState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
