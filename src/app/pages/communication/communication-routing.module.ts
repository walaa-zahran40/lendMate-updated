import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFollowupsComponent } from './components/follow-ups/add-follow-ups/add-follow-ups.component';
import { WizardComponent } from './components/wizard/wizard.component';
import { SaveMeetingComponent } from './components/meetings/save-meeting/save-meeting.component';
import { ViewAssetTypeCategoriesComponent } from '../lookups/components/asset-type-categories/view-asset-type-categories/view-asset-type-categories.component';
import { AddCallsComponent } from './components/calls/add-calls/add-calls.component';
import { ViewCallsComponent } from './components/calls/view-calls/view-calls.component';
import { WizardCommunicationComponent } from './components/wizard-communication/wizard-communication.component';
import { AddMeetingsComponent } from './components/meetings/add-meetings/add-meetings.component';
import { ViewMeetingsComponent } from './components/meetings/view-meetings/view-meetings.component';
import { ViewFollowupsComponent } from './components/follow-ups/view-follow-ups/view-follow-ups.component';
import { ViewFollowupPointsComponent } from './components/follow-up-points/view-follow-up-points/view-follow-up-points.component';
import { AddFollowupPointsComponent } from './components/follow-up-points/add-follow-up-points/add-follow-up-points.component';
import { WizardFollowupsComponent } from './components/wizard-followups/wizard-followups.component';
import { WizardMeetingComponent } from './meetings/wizard-meeting/wizard-meeting.component';

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
    path: 'wizard-meeting/:id',
    component: WizardMeetingComponent,
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
    path: 'view-meetings',
    component: ViewMeetingsComponent,
  },

  {
    path: 'view-asset-type-categories',
    component: ViewAssetTypeCategoriesComponent,
  },

  {
    path: 'wizard',
    component: WizardComponent,
  },
  {
    path: 'save-meeting',
    component: SaveMeetingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunicationRoutingModule {}
