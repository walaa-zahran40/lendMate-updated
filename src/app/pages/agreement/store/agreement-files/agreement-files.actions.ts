// src/app/features/leasing-agreement-files/state/leasing-agreement-files.actions.ts
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AgreementFile } from './agreement-file.model';

export const LeasingAgreementFilesActions = createActionGroup({
  source: 'LeasingAgreementFiles',
  events: {
    // Loads
    'Load All': emptyProps(),
    'Load All Success': props<{ items: AgreementFile[] }>(),
    'Load All Failure': props<{ error: unknown }>(),

    'Load History': emptyProps(),
    'Load History Success': props<{ items: AgreementFile[] }>(),
    'Load History Failure': props<{ error: unknown }>(),

    'Load By Id': props<{ id: number }>(),
    'Load By Id Success': props<{ item: AgreementFile }>(),
    'Load By Id Failure': props<{ error: unknown }>(),

    'Load By LeasingAgreementId': props<{ leasingAgreementId: number }>(),
    'Load By LeasingAgreementId Success': props<{ items: AgreementFile[] }>(),
    'Load By LeasingAgreementId Failure': props<{ error: unknown }>(),

    // CRUD
    Create: props<{ payload: Omit<AgreementFile, 'id'> }>(),
    'Create Success': props<{ item: AgreementFile }>(),
    'Create Failure': props<{ error: unknown }>(),

    Update: props<{ id: number; changes: Partial<AgreementFile> }>(),
    'Update Success': props<{ item: AgreementFile }>(),
    'Update Failure': props<{ error: unknown }>(),

    Delete: props<{ id: number }>(),
    'Delete Success': props<{ id: number }>(),
    'Delete Failure': props<{ error: unknown }>(),
  },
});
