import { AgreementFile } from './agreement-file.model';

export interface AgreementFilesState {
  items: AgreementFile[];
  history: AgreementFile[];
  current?: AgreementFile;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialAgreementFilesState: AgreementFilesState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
