// src/app/features/leasing-agreement-registrations/state/leasing-agreement-registrations.actions.ts
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AgreementRegistration } from './agreement-registration.model';

export const LeasingAgreementRegistrationsActions = createActionGroup({
  source: 'LeasingAgreementRegistrations',
  events: {
    // Loads
    'Load All': emptyProps(),
    'Load All Success': props<{ items: AgreementRegistration[] }>(),
    'Load All Failure': props<{ error: unknown }>(),

    'Load History': emptyProps(),
    'Load History Success': props<{ items: AgreementRegistration[] }>(),
    'Load History Failure': props<{ error: unknown }>(),

    'Load By Id': props<{ id: number }>(),
    'Load By Id Success': props<{ item: AgreementRegistration }>(),
    'Load By Id Failure': props<{ error: unknown }>(),

    'Load By LeasingAgreementId': props<{ leasingAgreementId: number }>(),
    'Load By LeasingAgreementId Success': props<{
      items: AgreementRegistration[];
    }>(),
    'Load By LeasingAgreementId Failure': props<{ error: unknown }>(),

    // CRUD
    Create: props<{ payload: Omit<AgreementRegistration, 'id'> }>(),
    'Create Success': props<{ item: AgreementRegistration }>(),
    'Create Failure': props<{ error: unknown }>(),

    Update: props<{ id: number; changes: Partial<AgreementRegistration> }>(),
    'Update Success': props<{ item: AgreementRegistration }>(),
    'Update Failure': props<{ error: unknown }>(),

    Delete: props<{ id: number }>(),
    'Delete Success': props<{ id: number }>(),
    'Delete Failure': props<{ error: unknown }>(),
  },
});
