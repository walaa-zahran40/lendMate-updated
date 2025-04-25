import { Document } from '../../../../../shared/interfaces/document.interface';

export const clientFileFeatureKey = 'clientFile';

export interface ClientFileState {
  documents: Document[];
  uploading: boolean;
  deleting: boolean;
  loading: boolean;
  response: any | null;
  error: any | null;
  selectedDocument: any; // ✅ Add this line
}

export const initialClientFileState: ClientFileState = {
  documents: [],
  uploading: false,
  deleting: false,
  loading: false,
  response: null,
  error: null,
  selectedDocument: null, // ✅ Add this line
};
