import { DocumentType } from './document-type.model';

export interface DocumentTypesState {
  items: DocumentType[];
  history: DocumentType[];
  current?: DocumentType;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialDocumentTypesState: DocumentTypesState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
