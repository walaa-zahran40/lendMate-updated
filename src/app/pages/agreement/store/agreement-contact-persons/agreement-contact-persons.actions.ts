import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  AgreementContactPerson,
  PagedResponse,
  CreateAgreementContactPersonDto,
  UpdateAgreementContactPersonDto,
} from './agreement-contact-person.model';

export const AgreementContactPersonsActions = createActionGroup({
  source: 'AgreementContactPersons',
  events: {
    // List (paged)
    'Load All Requested': props<{ pageNumber?: number }>(),
    'Load All Succeeded': props<{
      response: PagedResponse<AgreementContactPerson>;
      pageNumber?: number;
    }>(),
    'Load All Failed': props<{ error: string }>(),

    // By AgreementId
    'Load By Agreement Requested': props<{ agreementId: number }>(),
    'Load By Agreement Succeeded': props<{
      agreementId: number;
      contactPersons: AgreementContactPerson[];
    }>(),
    'Load By Agreement Failed': props<{ agreementId: number; error: string }>(),

    // Get single by AgreementContactPersonId
    'Load One Requested': props<{ agreementContactPersonId: number }>(),
    'Load One Succeeded': props<{ contactPerson: AgreementContactPerson }>(),
    'Load One Failed': props<{ error: string }>(),

    // Create
    'Create Requested': props<{ dto: CreateAgreementContactPersonDto }>(),
    'Create Succeeded': props<{ contactPerson: AgreementContactPerson }>(),
    'Create Failed': props<{ error: string }>(),

    // Update
    'Update Requested': props<{ dto: UpdateAgreementContactPersonDto }>(),
    'Update Succeeded': props<{ contactPerson: AgreementContactPerson }>(),
    'Update Failed': props<{ error: string }>(),

    // Delete
    'Delete Requested': props<{ id: number }>(),
    'Delete Succeeded': props<{ id: number }>(),
    'Delete Failed': props<{ error: string }>(),

    // Utility
    'Clear Errors': emptyProps(),
  },
});
