import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  LeasingAgreement,
  PagedHistory,
  CreateLeasingAgreementRequest,
  WorkflowActionRequest,
} from './agreement.model';

export const LeasingAgreementsActions = createActionGroup({
  source: 'LeasingAgreements',
  events: {
    // Load all
    'Load All': emptyProps(),
    'Load All Success': props<{ agreements: LeasingAgreement[] }>(),
    'Load All Failure': props<{ error: string }>(),

    // Load by id
    'Load By Id': props<{ id: number }>(),
    'Load By Id Success': props<{ agreement: LeasingAgreement }>(),
    'Load By Id Failure': props<{ error: string }>(),

    // Load by client
    'Load By Client': props<{ clientId: number }>(),
    'Load By Client Success': props<{ agreements: LeasingAgreement[] }>(),
    'Load By Client Failure': props<{ error: string }>(),

    // Load history (paged)
    'Load History': props<{ pageNumber: number }>(),
    'Load History Success': props<{
      history: PagedHistory<LeasingAgreement>;
    }>(),
    'Load History Failure': props<{ error: string }>(),

    // Create
    Create: props<{ payload: CreateLeasingAgreementRequest }>(),
    'Create Success': props<{ agreement: LeasingAgreement }>(),
    'Create Failure': props<{ error: string }>(),

    // Update
    Update: props<{
      id: number;
      changes: Partial<CreateLeasingAgreementRequest>;
    }>(),
    'Update Success': props<{ agreement: LeasingAgreement }>(),
    'Update Failure': props<{ error: string }>(),

    // Delete
    Delete: props<{ id: number }>(),
    'Delete Success': props<{ id: number }>(),
    'Delete Failure': props<{ error: string }>(),

    // Workflow
    'Workflow Action': props<{ request: WorkflowActionRequest }>(),
    'Workflow Action Success': props<{ agreement: LeasingAgreement }>(),
    'Workflow Action Failure': props<{ error: string }>(),

    // Selection
    Select: props<{ id: number | null }>(),
    'Clear Error': emptyProps(),
  },
});
