import { ClientGuarantor } from './client-guarantors.state';

export interface GuarantorsState {
  list: ClientGuarantor[];
  history: any[];
  loading: boolean;
  error: any;
}

export const initialGuarantorsState: GuarantorsState = {
  list: [],
  history: [],
  loading: false,
  error: null,
};
