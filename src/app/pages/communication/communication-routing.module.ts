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
import { ViewOfficersComponent } from './view-officers/view-officers.component';
import { ViewContactPersonsComponent } from './view-contact-persons/view-contact-persons.component';
import { ViewAssestTypeComponent } from './view-assest-type/view-assest-type.component';
import { ViewFollowUpsComponent } from './view-follow-ups/view-follow-ups.component';
import { ViewFollowUpPointsComponent } from './view-follow-up-points/view-follow-up-points.component';
import { ViewMeetingTypesComponent } from './view-meeting-types/view-meeting-types.component';
import { ViewCallComponent } from './view-call/view-call.component';
import { ViewCallTypesComponent } from './view-call-types/view-call-types.component';
import { SaveMeetingComponent } from './save-meeting/save-meeting.component';
import { ViewAssetTypeCategoriesComponent } from '../lookups/components/view-asset-type-categories/view-asset-type-categories.component';

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
    path: 'view-officers',
    component: ViewOfficersComponent,
  },
  {
    path: 'view-contact-person',
    component: ViewContactPersonsComponent,
  },
  {
    path: 'view-asset-type',
    component: ViewAssestTypeComponent,
  },
  {
    path: 'view-asset-type-categories',
    component: ViewAssetTypeCategoriesComponent,
  },
  {
    path: 'view-followups',
    component: ViewFollowUpsComponent,
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
    path: 'view-call',
    component: ViewCallComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunicationRoutingModule {}
