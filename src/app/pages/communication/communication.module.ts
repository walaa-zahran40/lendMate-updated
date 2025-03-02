import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationRoutingModule } from './communication-routing.module';
import { AddMeetingComponent } from './add-meeting/add-meeting.component';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { SharedModule } from '../../shared/shared.module';
import { AddFollowUpsComponent } from './add-follow-ups/add-follow-ups.component';
import { AddFollowUpsPointsComponent } from './add-follow-ups-points/add-follow-ups-points.component';
import { AddMeetingTypesComponent } from './add-meeting-types/add-meeting-types.component';
import { AddCallComponent } from './add-call/add-call.component';

@NgModule({
  declarations: [
    AddMeetingComponent,
    AddFollowUpsComponent,
    AddFollowUpsPointsComponent,
    AddMeetingTypesComponent,
    AddCallComponent,
  ],
  imports: [
    CommonModule,
    CommunicationRoutingModule,
    SharedModule,
    TabsModule,
    ButtonModule,
  ],
  exports: [
    AddMeetingComponent,
    AddFollowUpsComponent,
    AddFollowUpsPointsComponent,
    AddMeetingTypesComponent,
    AddCallComponent,
  ],
})
export class CommunicationModule {}
