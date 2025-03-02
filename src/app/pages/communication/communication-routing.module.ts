import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMeetingComponent } from './add-meeting/add-meeting.component';
import { AddFollowUpsComponent } from './add-follow-ups/add-follow-ups.component';
import { AddFollowUpsPointsComponent } from './add-follow-ups-points/add-follow-ups-points.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunicationRoutingModule {}
