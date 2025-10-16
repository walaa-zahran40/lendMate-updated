import { ClientCentralBankInfo } from "./client-central-bank.model";

export interface ClientCentralBankInfoState {
  items: ClientCentralBankInfo[];
  history: ClientCentralBankInfo[];
  current?: ClientCentralBankInfo;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialClientCentralBankInfoState: ClientCentralBankInfoState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
