import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageCartoonComponent } from './components/message-cartoon/message-cartoon.component';
import { CartoonImgPageComponent } from './components/cartoon-img-page/cartoon-img-page.component';



@NgModule({
  declarations: [
    MessageCartoonComponent,
    CartoonImgPageComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MessageCartoonComponent,
    CartoonImgPageComponent,
  ]
})
export class SharedModule { }
