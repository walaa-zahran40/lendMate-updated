import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationRoutingModule } from './communication-routing.module';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { SharedModule } from '../../shared/shared.module';
import { AddFollowupsComponent } from './components/follow-ups/add-follow-ups/add-follow-ups.component';
import { WizardComponent } from './components/wizard/wizard.component';
import { ViewFollowupsComponent } from './components/follow-ups/view-follow-ups/view-follow-ups.component';
import { SaveMeetingComponent } from './components/meetings/save-meeting/save-meeting.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { AddCallsComponent } from './components/calls/add-calls/add-calls.component';
import { ViewCallsComponent } from './components/calls/view-calls/view-calls.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CallsEffects } from './store/calls/calls.effects';
import { callsReducer } from './store/calls/calls.reducer';
import { WizardCommunicationComponent } from './components/wizard-communication/wizard-communication.component';
import { meetingsReducer } from './store/meetings/meetings.reducer';
import { MeetingsEffects } from './store/meetings/meetings.effects';
import { AddMeetingsComponent } from './components/meetings/add-meetings/add-meetings.component';
import { ViewMeetingsComponent } from './components/meetings/view-meetings/view-meetings.component';
import { followupsReducer } from './store/followups/followups.reducer';
import { FollowupsEffects } from './store/followups/followups.effects';
import { AddFollowupPointsComponent } from './components/follow-up-points/add-follow-up-points/add-follow-up-points.component';
import { ViewFollowupPointsComponent } from './components/follow-up-points/view-follow-up-points/view-follow-up-points.component';
import { followupPointsReducer } from './store/followup-points/followup-points.reducer';
import { FollowupPointsEffects } from './store/followup-points/followup-points.effects';
import { WizardFollowupsComponent } from './components/wizard-followups/wizard-followups.component';
import { WizardMeetingComponent } from './meetings/wizard-meeting/wizard-meeting.component';

@NgModule({
  declarations: [
    AddFollowupsComponent,
    AddFollowupPointsComponent,
    AddCallsComponent,
    AddMeetingsComponent,
    ViewMeetingsComponent,
    WizardComponent,
    ViewFollowupsComponent,
    ViewFollowupPointsComponent,
    ViewCallsComponent,
    ViewMeetingsComponent,
    SaveMeetingComponent,
    WizardCommunicationComponent,
    WizardMeetingComponent,
    WizardFollowupsComponent,
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
    StoreModule.forFeature('calls', callsReducer),
    EffectsModule.forFeature([CallsEffects]),

    StoreModule.forFeature('meetings', meetingsReducer),
    EffectsModule.forFeature([MeetingsEffects]),

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
  ],
})
export class CommunicationModule {}
