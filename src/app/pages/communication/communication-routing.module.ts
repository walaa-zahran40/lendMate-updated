import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMeetingComponent } from './add-meeting/add-meeting.component';
import { AddFollowUpsComponent } from './add-follow-ups/add-follow-ups.component';
import { AddFollowUpsPointsComponent } from './add-follow-ups-points/add-follow-ups-points.component';
import { AddMeetingTypesComponent } from './add-meeting-types/add-meeting-types.component';
import { AddCallComponent } from './add-call/add-call.component';
import { AddCallTypesComponent } from './add-call-types/add-call-types.component';
import { AddFollowupTypesComponent } from './add-followup-types/add-followup-types.component';
import { ViewMeetingsComponent } from './view-meetings/view-meetings.component';
import { WizardComponent } from './wizard/wizard.component';

const routes: Routes = [
  {
    path: 'add-meeting',
    component: AddMeetingComponent,
  },
  {
    path: 'add-follow-up',
    component: AddFollowUpsComponent,
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
    path: 'add-call',
    component: AddCallComponent,
  },
  {
    path: 'add-call-types',
    component: AddCallTypesComponent,
  },
  {
    path: 'add-followup-types',
    component: AddFollowupTypesComponent,
  },
  {
    path: 'view-meetings',
    component: ViewMeetingsComponent,
  },
  {
    path: 'wizard',
    component: WizardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunicationRoutingModule {}
