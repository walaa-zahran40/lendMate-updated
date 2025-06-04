import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFollowupsComponent } from './follow-ups/add-follow-ups/add-follow-ups.component';
import { AddFollowUpsPointsComponent } from './follow-ups-points/add-follow-ups-points/add-follow-ups-points.component';
import { AddMeetingTypesComponent } from './meeting-types/add-meeting-types/add-meeting-types.component';
import { AddCallTypesComponent } from './call-types/add-call-types/add-call-types.component';
import { WizardComponent } from './meetings/wizard/wizard.component';
import { ViewFollowUpPointsComponent } from './follow-ups-points/view-follow-up-points/view-follow-up-points.component';
import { ViewMeetingTypesComponent } from './meeting-types/view-meeting-types/view-meeting-types.component';
import { ViewCallTypesComponent } from './call-types/view-call-types/view-call-types.component';
import { SaveMeetingComponent } from './meetings/save-meeting/save-meeting.component';
import { ViewAssetTypeCategoriesComponent } from '../lookups/components/asset-type-categories/view-asset-type-categories/view-asset-type-categories.component';
import { ViewMonitorFollowupsComponent } from './monitor-followups/view-monitor-followups/view-monitor-followups.component';
import { AddCallsComponent } from './calls/add-calls/add-calls.component';
import { ViewCallsComponent } from './calls/view-calls/view-calls.component';
import { WizardCommunicationComponent } from './wizard-communication/wizard-communication.component';
import { AddMeetingsComponent } from './meetings/add-meetings/add-meetings.component';
import { ViewMeetingsComponent } from './meetings/view-meetings/view-meetings.component';
import { ViewFollowupsComponent } from './follow-ups/view-follow-ups/view-follow-ups.component';

const routes: Routes = [
  //Calls
  {
    path: 'add-calls',
    component: AddCallsComponent,
  },
  {
    path: 'edit-calls/:id',
    component: AddCallsComponent,
  },
  {
    path: 'view-calls',
    component: ViewCallsComponent,
  },
  //Wizard
  {
    path: 'wizard-communication/:id',
    component: WizardCommunicationComponent,
  },

  // meeting
  {
    path: 'add-meetings',
    component: AddMeetingsComponent,
  },
  {
    path: 'edit-meetings/:id',
    component: AddMeetingsComponent,
  },
  {
    path: 'view-meetings',
    component: ViewMeetingsComponent,
  },

  // Follow up

  {
    path: 'add-follow-ups/:callId',
    component: WizardComponent,
  },
  {
    path: 'add-follow-ups/:id/:callId',
    component: AddFollowupsComponent,
  },
  {
    path: 'edit-follow-ups/:id/:callId',
    component: AddFollowupsComponent,
  },
  {
    path: 'view-follow-ups/:id/:callId',
    component: ViewFollowupsComponent,
  },

  {
    path: 'add-follow-ups-points',
    component: AddFollowUpsPointsComponent,
  },
  {
    path: 'add-meeting-types',
    component: AddMeetingTypesComponent,
  },
  {
    path: 'add-call-types',
    component: AddCallTypesComponent,
  },

  {
    path: 'view-meetings',
    component: ViewMeetingsComponent,
  },

  {
    path: 'view-asset-type-categories',
    component: ViewAssetTypeCategoriesComponent,
  },

  {
    path: 'view-followup-points',
    component: ViewFollowUpPointsComponent,
  },
  {
    path: 'view-meeting-types',
    component: ViewMeetingTypesComponent,
  },

  {
    path: 'view-call-types',
    component: ViewCallTypesComponent,
  },
  {
    path: 'wizard',
    component: WizardComponent,
  },
  {
    path: 'save-meeting',
    component: SaveMeetingComponent,
  },
  {
    path: 'view-monitor-followups',
    component: ViewMonitorFollowupsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunicationRoutingModule {}
