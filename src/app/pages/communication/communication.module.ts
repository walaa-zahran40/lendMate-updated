import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationRoutingModule } from './communication-routing.module';
import { AddMeetingComponent } from './add-meeting/add-meeting.component';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AddMeetingComponent],
  imports: [
    CommonModule,
    CommunicationRoutingModule,
    SharedModule,
    TabsModule,
    ButtonModule,
  ],
  exports: [AddMeetingComponent],
})
export class CommunicationModule {}
