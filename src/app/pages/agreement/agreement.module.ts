import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgreementRoutingModule } from './agreement-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ViewAgreementsComponent } from './agreements/view-agreements/view-agreements.component';
import { AddAgreementComponent } from './agreements/add-agreement/add-agreement.component';

@NgModule({
  declarations: [
    ViewAgreementsComponent,
    AddAgreementComponent
  ],
  imports: [CommonModule, AgreementRoutingModule, SharedModule],
  providers: [],
})
export class AgreementModule {}
