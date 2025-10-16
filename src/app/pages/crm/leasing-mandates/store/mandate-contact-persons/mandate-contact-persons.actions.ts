import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  MandateContactPerson,
  PagedResponse,
  CreateMandateContactPersonDto,
  UpdateMandateContactPersonDto,
} from './mandate-contact-person.model';

export const MandateContactPersonsActions = createActionGroup({
  source: 'MandateContactPersons',
  events: {
    // List (paged)
    'Load All Requested': props<{ pageNumber?: number }>(),
    'Load All Succeeded': props<{
      response: PagedResponse<MandateContactPerson>;
      pageNumber?: number;
    }>(),
    'Load All Failed': props<{ error: string }>(),

    // By MandateId
    'Load By Mandate Requested': props<{ mandateId: number }>(),
    'Load By Mandate Succeeded': props<{
      mandateId: number;
      contactPersons: MandateContactPerson[];
    }>(),
    'Load By Mandate Failed': props<{ mandateId: number; error: string }>(),

    // Get single by MandateContactPersonId
    'Load One Requested': props<{ mandateContactPersonId: number }>(),
    'Load One Succeeded': props<{ contactPerson: MandateContactPerson }>(),
    'Load One Failed': props<{ error: string }>(),

    // Create
    'Create Requested': props<{ dto: CreateMandateContactPersonDto }>(),
    'Create Succeeded': props<{ contactPerson: MandateContactPerson }>(),
    'Create Failed': props<{ error: string }>(),

    // Update
    'Update Requested': props<{ dto: UpdateMandateContactPersonDto }>(),
    'Update Succeeded': props<{ contactPerson: MandateContactPerson }>(),
    'Update Failed': props<{ error: string }>(),

    // Delete
    'Delete Requested': props<{ id: number }>(),
    'Delete Succeeded': props<{ id: number }>(),
    'Delete Failed': props<{ error: string }>(),

    // Utility
    'Clear Errors': emptyProps(),
  },
});
