import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingsComponent } from './meetings/meetings.component';
import { MeetingTypesComponent } from '../lookups/meeting-types/meeting-types.component';
import { CallTypesCommunicationComponent } from './call-types-communication/call-types-communication.component';
import { CallsComponent } from './calls/calls.component';
import { FollowUpTypesComponent } from './followup-types/followup-types.component';

const routes: Routes = [
  {
    path: 'meetings',
    component: MeetingsComponent,
  },
  {
    path: 'meetings-types',
    component: MeetingTypesComponent,
  },
  {
    path: 'call-types',
    component: CallTypesCommunicationComponent,
  },
  {
    path: 'calls',
    component: CallsComponent,
  },
  {
    path: 'followup-types',
    component: FollowUpTypesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunicationRoutingModule {}
