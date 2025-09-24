import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAgreementsComponent } from './components/agreements/view-agreements/view-agreements.component';
import { AddAgreementComponent } from './components/agreements/add-agreement/add-agreement.component';

const routes: Routes = [
  //Agreement Contact Persons
  {
    path: 'view-agreements',
    component: ViewAgreementsComponent,
  },
  {
    path: 'add-agreement',
    component: AddAgreementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgreementRoutingModule {}
