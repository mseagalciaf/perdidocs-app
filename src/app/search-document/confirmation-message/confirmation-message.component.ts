import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-confirmation-message',
  templateUrl: './confirmation-message.component.html',
  styleUrls: ['./confirmation-message.component.scss'],
})
export class ConfirmationMessageComponent implements OnInit {

  success : boolean = false;
  messageCartoon : string = "Lo siento, tu documento no ha sido registrado en mi base de datos. ¿Deseas que te notifique cuando registren tu documento en mi base de datos?";
  callNumber:string;

  constructor(
    private _route: ActivatedRoute,
    private _callNumber: CallNumber,
    private _platform : Platform,
  ) { }

  ngOnInit() {
    this._route.queryParams
      .subscribe(params => {
        if (params.phone) {
          this.success = true;
          this.callNumber = params.phone;
          this.messageCartoon = `¡Hey, Mira! La persona con el número de teléfono ${this.callNumber} encontró tu documento. Ponte en contacto para acordar la entrega.`;
        }
      }
    );
  }

  toCall(){
    this._callNumber.callNumber(this.callNumber, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  toAcceptNotification(){
  }

}
