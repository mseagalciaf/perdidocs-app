import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmation-message',
  templateUrl: './confirmation-message.component.html',
  styleUrls: ['./confirmation-message.component.scss'],
})
export class ConfirmationMessageComponent implements OnInit {

  success : boolean = false;
  messageCartoon : string = "Lo siento, tu documento no ha sido registrado en mi base de datos. ¿Deseas que te notifique cuando registren tu documento en mi base de datos?"
  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.queryParams
      .subscribe(params => {
        if (params.phone) {
          this.success = true;
          this.messageCartoon = `¡Hey, Mira! La persona con el número de teléfono ${params.phone} encontró tu documento. Ponte en contacto para acordar la entrega.`;
        }
      }
    );
  }

}
