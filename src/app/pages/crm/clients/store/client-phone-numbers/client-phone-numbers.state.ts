import { ClientPhoneNumber } from './client-phone-number.model';

export interface ClientPhoneNumbersState {
  items: ClientPhoneNumber[];
  history: ClientPhoneNumber[];
  current?: ClientPhoneNumber;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialClientPhoneNumbersState: ClientPhoneNumbersState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
