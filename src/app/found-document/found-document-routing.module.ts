import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmationMessageComponent } from './confirmation-message/confirmation-message.component';

import { FoundDocumentPage } from './found-document.page';

const routes: Routes = [
  {
    path: '',
    component: FoundDocumentPage
  },
  {
    path : 'confirmation',
    component: ConfirmationMessageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoundDocumentPageRoutingModule {}
