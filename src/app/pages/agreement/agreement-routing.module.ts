import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAgreementsComponent } from './components/view-agreements/view-agreements.component';
import { AddAgreementComponent } from './components/add-agreement/add-agreement.component';
import { PendingChangesGuard } from '../../shared/guards/pending-changes.guard';

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
  {
    path: 'edit-agreement/:id',
    component: AddAgreementComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'view-agreement/:id',
    component: AddAgreementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgreementRoutingModule {}
