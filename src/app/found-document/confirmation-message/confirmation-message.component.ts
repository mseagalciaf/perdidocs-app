import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-message',
  templateUrl: './confirmation-message.component.html',
  styleUrls: ['./confirmation-message.component.scss'],
})
export class ConfirmationMessageComponent implements OnInit {

  messageCartoon : string = "El documento quedó registrado en mi base de datos, la persona que lo extravió pronto se pondrá en contacto contigo para acordar la entrega, ¡Muchas gracias por ayudar!"
  constructor() { }

  ngOnInit() {}

}
