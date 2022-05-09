import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchDocumentPageRoutingModule } from './search-document-routing.module';

import { SearchDocumentPage } from './search-document.page';
import { MessageCartoonComponent } from '../shared/components/message-cartoon/message-cartoon.component';
import { CartoonImgPageComponent } from '../shared/components/cartoon-img-page/cartoon-img-page.component';
import { ConfirmationMessageComponent } from './confirmation-message/confirmation-message.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SearchDocumentPageRoutingModule
  ],
  declarations: [
    SearchDocumentPage,
    MessageCartoonComponent,
    CartoonImgPageComponent,
    ConfirmationMessageComponent,
  ]
})
export class SearchDocumentPageModule {}
