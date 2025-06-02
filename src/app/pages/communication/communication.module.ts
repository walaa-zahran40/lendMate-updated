import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationRoutingModule } from './communication-routing.module';
import { AddMeetingComponent } from './meetings/add-meeting/add-meeting.component';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { SharedModule } from '../../shared/shared.module';
import { AddFollowUpsComponent } from './follow-ups/add-follow-ups/add-follow-ups.component';
import { AddFollowUpsPointsComponent } from './follow-ups-points/add-follow-ups-points/add-follow-ups-points.component';
import { AddMeetingTypesComponent } from './meeting-types/add-meeting-types/add-meeting-types.component';
import { AddCallTypesComponent } from './call-types/add-call-types/add-call-types.component';
import { ViewMeetingsComponent } from './meetings/view-meetings/view-meetings.component';
import { WizardComponent } from './meetings/wizard/wizard.component';
import { ViewFollowUpsComponent } from './follow-ups/view-follow-ups/view-follow-ups.component';
import { ViewFollowUpPointsComponent } from './follow-ups-points/view-follow-up-points/view-follow-up-points.component';
import { ViewMeetingTypesComponent } from './meeting-types/view-meeting-types/view-meeting-types.component';
import { ViewCallTypesComponent } from './call-types/view-call-types/view-call-types.component';
import { SaveMeetingComponent } from './meetings/save-meeting/save-meeting.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { ViewMonitorFollowupsComponent } from './monitor-followups/view-monitor-followups/view-monitor-followups.component';
import { AddCallsComponent } from './calls/add-calls/add-calls.component';
import { ViewCallsComponent } from './calls/view-calls/view-calls.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CallsEffects } from './store/calls/calls.effects';
import { callsReducer } from './store/calls/calls.reducer';

@NgModule({
  declarations: [
    AddMeetingComponent,
    AddFollowUpsComponent,
    AddFollowUpsPointsComponent,
    AddMeetingTypesComponent,
    AddCallsComponent,
    AddCallTypesComponent,
    ViewMeetingsComponent,
    WizardComponent,
    ViewFollowUpsComponent,
    ViewFollowUpPointsComponent,
    ViewMeetingTypesComponent,
    ViewCallsComponent,
    ViewCallTypesComponent,
    SaveMeetingComponent,
    ViewMonitorFollowupsComponent,
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
  ],
  exports: [
    AddMeetingComponent,
    AddFollowUpsComponent,
    AddFollowUpsPointsComponent,
    AddMeetingTypesComponent,
    AddCallTypesComponent,
    AddCallsComponent,
  ],
})
export class CommunicationModule {}
