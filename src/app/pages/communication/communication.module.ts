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
import { ViewFollowUpPointsComponent } from './view-follow-up-points/view-follow-up-points.component';
import { ViewMeetingTypesComponent } from './view-meeting-types/view-meeting-types.component';
import { ViewCallComponent } from './view-call/view-call.component';
import { ViewCallTypesComponent } from './view-call-types/view-call-types.component';
import { SaveMeetingComponent } from './save-meeting/save-meeting.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';

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
    ViewFollowUpPointsComponent,
    ViewMeetingTypesComponent,
    ViewCallComponent,
    ViewCallTypesComponent,
    SaveMeetingComponent,
  ],
  imports: [
    CommonModule,
    CommunicationRoutingModule,
    SharedModule,
    TabsModule,
    ButtonModule,
    FullCalendarModule,
    CheckboxModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
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
