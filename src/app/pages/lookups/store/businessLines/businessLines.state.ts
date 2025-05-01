import { BusinessLine } from './businessLine.model';

export interface BusinessLinesState {
  items: BusinessLine[];
  history: BusinessLine[];
  current?: BusinessLine;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialBusinessLinesState: BusinessLinesState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
