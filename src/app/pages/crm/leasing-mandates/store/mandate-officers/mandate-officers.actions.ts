import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  MandateOfficer,
  PagedResponse,
  CreateMandateOfficerDto,
  UpdateMandateOfficerDto,
} from './mandate-officer.model';

export const MandateOfficersActions = createActionGroup({
  source: 'MandateOfficers',
  events: {
    // List (paged)
    'Load All Requested': props<{ pageNumber?: number }>(),
    'Load All Succeeded': props<{
      response: PagedResponse<MandateOfficer>;
      pageNumber?: number;
    }>(),
    'Load All Failed': props<{ error: string }>(),

    // By MandateId
    'Load By Mandate Requested': props<{ mandateId: number }>(),
    'Load By Mandate Succeeded': props<{
      mandateId: number;
      officers: MandateOfficer[];
    }>(),
    'Load By Mandate Failed': props<{ mandateId: number; error: string }>(),

    // Get single by MandateOfficerId
    'Load One Requested': props<{ mandateOfficerId: number }>(),
    'Load One Succeeded': props<{ officer: MandateOfficer }>(),
    'Load One Failed': props<{ error: string }>(),

    // Create
    'Create Requested': props<{ dto: CreateMandateOfficerDto }>(),
    'Create Succeeded': props<{ officer: MandateOfficer }>(),
    'Create Failed': props<{ error: string }>(),

    // Update
    'Update Requested': props<{ dto: UpdateMandateOfficerDto }>(),
    'Update Succeeded': props<{ officer: MandateOfficer }>(),
    'Update Failed': props<{ error: string }>(),

    // Delete
    'Delete Requested': props<{ id: number }>(),
    'Delete Succeeded': props<{ id: number }>(),
    'Delete Failed': props<{ error: string }>(),

    // Utility
    'Clear Errors': emptyProps(),
  },
});
