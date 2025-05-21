import { ClientContactPerson } from './client-contact-person.model';

export interface ClientContactPersonsState {
  items: ClientContactPerson[];
  history: ClientContactPerson[];
  current?: ClientContactPerson;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialClientContactPersonsState: ClientContactPersonsState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
