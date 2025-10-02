// app/core/agreement-files/data-access/agreement-files.actions.ts
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  AgreementFile,
  PagedAgreementFilesResponse,
} from './agreement-file.model';

export const AgreementFilesActions = createActionGroup({
  source: 'AgreementFiles',
  events: {
    'Load Page': props<{ pageNumber?: number }>(),
    'Load Page Success': props<{ response: PagedAgreementFilesResponse }>(),
    'Load Page Failure': props<{ error: string }>(),

    'Load By Agreement': props<{ agreementId: number }>(),
    'Load By Agreement Success': props<{
      response: PagedAgreementFilesResponse;
      agreementId: number;
    }>(),
    'Load By Agreement Failure': props<{ error: string }>(),

    'Load One': props<{ agreementFileId: number }>(),
    'Load One Success': props<{ entity: AgreementFile }>(),
    'Load One Failure': props<{ error: string }>(),

    Create: props<{
      agreementId: number;
      documentTypeId: number;
      expiryDate: string;
      file: File;
    }>(),
    'Create Success': props<{ entity: AgreementFile }>(),
    'Create Failure': props<{ error: string }>(),

    Update: props<{
      id: number;
      payload: {
        id: number;
        agreementId: number;
        fileId: number;
        expiryDate: string;
      };
    }>(),
    'Update Success': props<{ entity: AgreementFile }>(),
    'Update Failure': props<{ error: string }>(),

    Delete: props<{ id: number }>(),
    'Delete Success': props<{ id: number }>(),
    'Delete Failure': props<{ error: string }>(),

    'Clear Error': emptyProps(),
  },
});
