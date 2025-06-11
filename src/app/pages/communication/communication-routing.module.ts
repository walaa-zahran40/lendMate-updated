import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFollowupsComponent } from './follow-ups/add-follow-ups/add-follow-ups.component';
import { AddMeetingTypesComponent } from './meeting-types/add-meeting-types/add-meeting-types.component';
import { AddCallTypesComponent } from './call-types/add-call-types/add-call-types.component';
import { WizardComponent } from './meetings/wizard/wizard.component';
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
import { ViewFollowupPointsComponent } from './follow-up-points/view-follow-up-points/view-follow-up-points.component';
import { AddFollowupPointsComponent } from './follow-up-points/add-follow-up-points/add-follow-up-points.component';
import { WizardFollowupsComponent } from './wizard-followups/wizard-followups.component';

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
  {
    path: 'view-follow-ups/:communicationId',
    component: ViewFollowupsComponent,
  },
  {
    path: 'wizard-followups/:followupId/:communicationId',
    component: WizardFollowupsComponent,
  },
  {
    path: 'view-follow-up-points/:followupId/:communicationId',
    component: ViewFollowupPointsComponent,
  },
  {
    path: 'add-follow-ups/:communicationId',
    component: AddFollowupsComponent,
  },

  {
    path: 'edit-follow-ups/:id/:followupId',
    component: AddFollowupsComponent,
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

  // follow up points
  {
    path: 'add-follow-up-points/:followupId',
    component: AddFollowupPointsComponent,
  },
  {
    path: 'edit-follow-up-points/:id/:communicationId',
    component: AddFollowupPointsComponent,
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
