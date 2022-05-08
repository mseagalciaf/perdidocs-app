import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-message',
  templateUrl: './confirmation-message.component.html',
  styleUrls: ['./confirmation-message.component.scss'],
})
export class ConfirmationMessageComponent implements OnInit {

  messageCartoon : string = "Lo siento, tu documento no ha sido registrado en mi base de datos. ¿Deseas que te notifique cuando registren tu documento en mi base de datos?"
  constructor() { }

  ngOnInit() {}

}
