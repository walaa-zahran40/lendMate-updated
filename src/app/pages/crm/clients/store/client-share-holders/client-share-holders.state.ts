import { Shareholder } from './client-share-holders.model';

export interface ShareholdersState {
  shareholders: Shareholder[];
  allShareholders: Shareholder[];
  history: any[];
  loading: boolean;
  error: any;
}

export const initialShareholdersState: ShareholdersState = {
  shareholders: [],
  allShareholders: [],
  history: [],
  loading: false,
  error: null,
};
