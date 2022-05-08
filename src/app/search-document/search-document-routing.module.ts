import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmationMessageComponent } from './confirmation-message/confirmation-message.component';

import { SearchDocumentPage } from './search-document.page';

const routes: Routes = [
  {
    path: '',
    component: SearchDocumentPage
  },
  {
    path: 'confirmation',
    component: ConfirmationMessageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchDocumentPageRoutingModule {}
