import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAgreementsComponent } from './agreements/view-agreements/view-agreements.component';

const routes: Routes = [
  //Agreement Contact Persons
  {
    path: 'view-agreements',
    component: ViewAgreementsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgreementRoutingModule {}
