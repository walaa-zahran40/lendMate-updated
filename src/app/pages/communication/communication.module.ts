import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationRoutingModule } from './communication-routing.module';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { SharedModule } from '../../shared/shared.module';
import { AddFollowupsComponent } from '../crm/clients/components/client-activities/client-activity-wizard/activities/client-follow-ups/add-follow-ups/add-follow-ups.component';
import { ViewFollowupsComponent } from '../crm/clients/components/client-activities/client-activity-wizard/activities/client-follow-ups/view-follow-ups/view-follow-ups.component';
import { SaveMeetingComponent } from '../crm/clients/components/client-activities/client-activity-wizard/activities/client-meetings/save-meeting/save-meeting.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { AddCallsComponent } from '../crm/clients/components/client-activities/client-activity-wizard/activities/client-calls/add-calls/add-calls.component';
import { ViewCallsComponent } from '../crm/clients/components/client-activities/client-activity-wizard/activities/client-calls/view-calls/view-calls.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CallsEffects } from './store/calls/calls.effects';
import { callsReducer } from './store/calls/calls.reducer';
import { WizardCommunicationComponent } from './components/wizard-communication/wizard-communication.component';
import { meetingsReducer } from './store/meetings/meetings.reducer';
import { MeetingsEffects } from './store/meetings/meetings.effects';
import { AddMeetingsComponent } from '../crm/clients/components/client-activities/client-activity-wizard/activities/client-meetings/add-meetings/add-meetings.component';
import { ViewMeetingsComponent } from '../crm/clients/components/client-activities/client-activity-wizard/activities/client-meetings/view-meetings/view-meetings.component';
import { followupsReducer } from './store/followups/followups.reducer';
import { FollowupsEffects } from './store/followups/followups.effects';
import { AddFollowupPointsComponent } from '../crm/clients/components/client-activities/client-activity-wizard/activities/client-follow-up-points/add-follow-up-points/add-follow-up-points.component';
import { ViewFollowupPointsComponent } from '../crm/clients/components/client-activities/client-activity-wizard/activities/client-follow-up-points/view-follow-up-points/view-follow-up-points.component';
import { followupPointsReducer } from './store/followup-points/followup-points.reducer';
import { FollowupPointsEffects } from './store/followup-points/followup-points.effects';
import { WizardFollowupsComponent } from './components/wizard-followups/wizard-followups.component';
import { WizardMeetingComponent } from '../crm/clients/components/client-activities/client-activity-wizard/activities/client-meetings/wizard-meeting/wizard-meeting.component';
import { meetingsCalendarReducer } from './store/meetings/calendar/meetings.reducer';
import { MeetingsCalendarEffects } from './store/meetings/calendar/meetings.effects';
import { ViewMeetingsSideMenuComponent } from './components/meetings/view-meetings/view-meetings-sidemenu.component';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { DebugControlDirective } from '../../shared/directives/debug-control.directive';
import { AddMeetingsSideMenuComponent } from './components/meetings/add-meetings/add-meetings-sidemenu.component';
import { AddMeetingsSideMenuFormComponent } from './forms/add-client-meetings-form/add-meetings-form/add-meetings-sidemenu-form.component';

@NgModule({
  declarations: [
    AddFollowupsComponent,
    AddFollowupPointsComponent,
    DebugControlDirective,
    AddCallsComponent,
    AddMeetingsComponent,
    ViewMeetingsComponent,
    ViewFollowupsComponent,
    ViewFollowupPointsComponent,
    ViewCallsComponent,
    ViewMeetingsComponent,
    SaveMeetingComponent,
    WizardCommunicationComponent,
    WizardMeetingComponent,
    WizardFollowupsComponent,
    AddMeetingsSideMenuComponent,
    ViewMeetingsSideMenuComponent,
    AddMeetingsSideMenuFormComponent,
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
    SelectModule,
    DatePickerModule,
    StoreModule.forFeature('calls', callsReducer),
    EffectsModule.forFeature([CallsEffects]),

    StoreModule.forFeature('meetings', meetingsReducer),
    EffectsModule.forFeature([MeetingsEffects]),

    StoreModule.forFeature('meetingsCalendar', meetingsCalendarReducer),
    EffectsModule.forFeature([MeetingsCalendarEffects]),

    StoreModule.forFeature('followups', followupsReducer),
    EffectsModule.forFeature([FollowupsEffects]),

    StoreModule.forFeature('followupPoints', followupPointsReducer),
    EffectsModule.forFeature([FollowupPointsEffects]),
  ],
  exports: [
    AddFollowupsComponent,
    AddFollowupPointsComponent,
    AddCallsComponent,
    AddMeetingsComponent,
    AddMeetingsSideMenuComponent,
    AddMeetingsSideMenuFormComponent,
    ViewMeetingsSideMenuComponent,
    DebugControlDirective,
  ],
})
export class CommunicationModule {}
