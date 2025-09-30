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
    'Load All Requested': props<{ pageNumber?: any }>(),
    'Load All Succeeded': props<{
      response: PagedResponse<AgreementContactPerson>;
      pageNumber?: any;
    }>(),
    'Load All Failed': props<{ error: string }>(),

    // By AgreementId
    'Load By Agreement Requested': props<{ agreementId: any }>(),
    'Load By Agreement Succeeded': props<{
      agreementId: any;
      contactPersons: AgreementContactPerson[];
    }>(),
    'Load By Agreement Failed': props<{ agreementId: any; error: string }>(),

    // Get single by AgreementContactPersonId
    'Load One Requested': props<{ agreementContactPersonId: any }>(),
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
    'Delete Requested': props<{ id: any }>(),
    'Delete Succeeded': props<{ id: any }>(),
    'Delete Failed': props<{ error: string }>(),

    // Utility
    'Clear Errors': emptyProps(),
  },
});
