import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchDocumentPage } from './search-document.page';

const routes: Routes = [
  {
    path: '',
    component: SearchDocumentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchDocumentPageRoutingModule {}
