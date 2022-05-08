import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoundDocumentPageRoutingModule } from './found-document-routing.module';

import { FoundDocumentPage } from './found-document.page';
import { CartoonImgPageComponent } from '../shared/components/cartoon-img-page/cartoon-img-page.component';
import { MessageCartoonComponent } from '../shared/components/message-cartoon/message-cartoon.component';
import { ConfirmationMessageComponent } from './confirmation-message/confirmation-message.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoundDocumentPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FoundDocumentPage,
    CartoonImgPageComponent,
    MessageCartoonComponent,
    ConfirmationMessageComponent,
  ]
})
export class FoundDocumentPageModule {}
