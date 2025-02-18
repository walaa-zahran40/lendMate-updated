import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsComponent } from './meetings/meetings.component';
import { MeetingsTypesComponent } from './meetings-types/meetings-types.component';
import { CallTypesCommunicationComponent } from './call-types-communication/call-types-communication.component';
import { CallsComponent } from './calls/calls.component';
import { FollowUpTypesComponent } from './followup-types/followup-types.component';
import { CallFollowupComponent } from './call-followup/call-followup.component';
import { FollowupPointsComponent } from './followup-points/followup-points.component';
import { FollowupDetailsComponent } from './followup-details/followup-details.component';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import { MeetingFollowupComponent } from './meeting-followup/meeting-followup.component';

@NgModule({
  declarations: [
    MeetingsComponent,
    MeetingsTypesComponent,
    CallTypesCommunicationComponent,
    CallsComponent,
    FollowUpTypesComponent,
    CallFollowupComponent,
    FollowupPointsComponent,
    FollowupDetailsComponent,
    MeetingDetailsComponent,
    MeetingFollowupComponent,
  ],
  imports: [CommonModule],
})
export class CommunicationModule {}
