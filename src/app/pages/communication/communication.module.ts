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
import { AddCallTypesComponent } from './add-call-types/add-call-types.component';
import { AddFollowupTypesComponent } from './add-followup-types/add-followup-types.component';
import { ViewMeetingsComponent } from './view-meetings/view-meetings.component';
import { WizardComponent } from './wizard/wizard.component';
import { ViewOfficersComponent } from './view-officers/view-officers.component';
import { ViewContactPersonsComponent } from './view-contact-persons/view-contact-persons.component';
import { ViewAssestTypeComponent } from './view-assest-type/view-assest-type.component';
import { ViewFollowUpsComponent } from './view-follow-ups/view-follow-ups.component';

@NgModule({
  declarations: [
    AddMeetingComponent,
    AddFollowUpsComponent,
    AddFollowUpsPointsComponent,
    AddMeetingTypesComponent,
    AddCallComponent,
    AddCallTypesComponent,
    AddFollowupTypesComponent,
    ViewMeetingsComponent,
    WizardComponent,
    ViewOfficersComponent,
    ViewContactPersonsComponent,
    ViewAssestTypeComponent,
    ViewFollowUpsComponent,
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
    AddCallTypesComponent,
    AddFollowupTypesComponent,
  ],
})
export class CommunicationModule {}
