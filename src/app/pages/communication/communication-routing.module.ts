import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFollowupsComponent } from './components/follow-ups/add-follow-ups/add-follow-ups.component';
import { ViewAssetTypeCategoriesComponent } from '../lookups/components/asset-type-categories/view-asset-type-categories/view-asset-type-categories.component';
import { AddCallTypesComponent } from '../lookups/components/call-types/add-call-types/add-call-types.component';
import { ViewCallTypesComponent } from '../lookups/components/call-types/view-call-types/view-call-types.component';
import { AddMeetingTypesComponent } from '../lookups/components/meeting-types/add-meeting-types/add-meeting-types.component';
import { ViewMeetingTypesComponent } from '../lookups/components/meeting-types/view-meeting-types/view-meeting-types.component';
import { AddCallsComponent } from './components/calls/add-calls/add-calls.component';
import { ViewCallsComponent } from './components/calls/view-calls/view-calls.component';
import { AddFollowupPointsComponent } from './components/follow-up-points/add-follow-up-points/add-follow-up-points.component';
import { ViewFollowupPointsComponent } from './components/follow-up-points/view-follow-up-points/view-follow-up-points.component';
import { ViewFollowupsComponent } from './components/follow-ups/view-follow-ups/view-follow-ups.component';
import { AddMeetingsComponent } from './components/meetings/add-meetings/add-meetings.component';
import { SaveMeetingComponent } from './components/meetings/save-meeting/save-meeting.component';
import { ViewMeetingsComponent } from './components/meetings/view-meetings/view-meetings.component';
import { WizardCommunicationComponent } from './components/wizard-communication/wizard-communication.component';
import { WizardFollowupsComponent } from './components/wizard-followups/wizard-followups.component';
import { WizardComponent } from './components/wizard/wizard.component';
import { WizardMeetingComponent } from './components/meetings/wizard-meeting/wizard-meeting.component';
import { PendingChangesGuard } from '../../shared/guards/pending-changes.guard';
const routes: Routes = [
  //Calls
  {
    path: 'add-calls',
    component: AddCallsComponent,
  },
  {
    path: 'add-calls/:clientId',
    component: AddCallsComponent,
  },
  {
    path: 'edit-calls/:id',
    component: AddCallsComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-calls',
    component: ViewCallsComponent,
  },
  {
    path: 'view-calls/:clientId',
    component: ViewCallsComponent,
  },
  //Wizards
  {
    path: 'wizard-communication/:id',
    component: WizardCommunicationComponent,
  },

  {
    path: 'wizard-meeting/:id',
    component: WizardMeetingComponent,
  },
  {
    path: 'wizard',
    component: WizardComponent,
  },
  //followups
  {
    path: 'view-follow-ups/:communicationId',
    component: ViewFollowupsComponent,
  },
  {
    path: 'wizard-followups/:followupId/:communicationId',
    component: WizardFollowupsComponent,
  },
  {
    path: 'add-follow-ups/:communicationId',
    component: AddFollowupsComponent,
  },
  {
    path: 'edit-follow-ups/:id/:followupId',
    component: AddFollowupsComponent,
    canDeactivate: [PendingChangesGuard],
  },
  //followup points
  {
    path: 'view-follow-up-points/:followupId/:communicationId',
    component: ViewFollowupPointsComponent,
  },
  {
    path: 'add-follow-up-points/:followupId',
    component: AddFollowupPointsComponent,
  },
  {
    path: 'edit-follow-up-points/:id/:communicationId',
    component: AddFollowupPointsComponent,
    canDeactivate: [PendingChangesGuard],
  },
  //meeting types

  {
    path: 'add-meeting-types',
    component: AddMeetingTypesComponent,
  },
  {
    path: 'view-meeting-types',
    component: ViewMeetingTypesComponent,
  },
  //call types
  {
    path: 'add-call-types',
    component: AddCallTypesComponent,
  },
  {
    path: 'view-call-types',
    component: ViewCallTypesComponent,
  },
  // meetings
  {
    path: 'add-meetings',
    component: AddMeetingsComponent,
  },
  {
    path: 'add-meetings/:clientId',
    component: AddMeetingsComponent,
  },
  {
    path: 'edit-meetings/:id',
    component: AddMeetingsComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-meetings',
    component: ViewMeetingsComponent,
  },
  {
    path: 'view-meetings/:clientId',
    component: ViewMeetingsComponent,
  },
  {
    path: 'save-meeting',
    component: SaveMeetingComponent,
  },
  //asset type categories

  {
    path: 'view-asset-type-categories',
    component: ViewAssetTypeCategoriesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunicationRoutingModule {}
