import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { ModalController } from '@ionic/angular';
import { NotificationsService } from '../services/notifications.service';
import { DocTypeInterface } from '../shared/interfaces/doc-type-interface';
import { EnabledNotificationInterface } from '../shared/interfaces/enabled-notification-interface';
import { DocumentService } from '../shared/services/document.service';
import { AddNotificationModalComponent } from './add-notification-modal/add-notification-modal.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  myEnabledNotifications : EnabledNotificationInterface[];
  registryToken : string = "e0vene_TXOPruuFYcfFnt:APA91bGYFITloVUWKxrI4qW6k2g31u6rUjtQwGtWpn0c_O4n4Hb5zlsn7mdITi4d1GUNXK_Lw-90RD3UKaQT2EIpPGWTDHT2zlViiy01Dygc4rJ_jiDpCYW1Rvv3WQ3993k1bt99PoEh";
  /* docTypes : DocTypeInterface[];
  enabledNotificationForm : FormGroup = this._formBuilder.group({
    'registryToken' : ['',Validators.required],
    'docTypeId' : ['',Validators.required],
    'number' : ['',Validators.required,Validators.minLength(5)],
    'viaEmail' : [false,Validators.required],
    'viaPush' : [false,Validators.required]
  }); */


  constructor(
    private readonly _notificationsService : NotificationsService,
    private _formBuilder : FormBuilder,
    private _route : ActivatedRoute
  ) { }

  ngOnInit() {
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        this.registryToken = token.value;
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );

    this.getMyEnabledNotifications();
    this._route.queryParams
      .subscribe(params => {
        if (params.docTypeId && params.docNumber) {
          this.addEnabledNotification(this.registryToken,params.docTypeId,params.docNumber);        
        }
      }
    );

  }

  getMyEnabledNotifications(){
    let myenabledNotificationSubscription = this._notificationsService.getMyEnabledNotifications(this.registryToken).subscribe({
      next: (resp)=>{
        this.myEnabledNotifications = resp;
      },
      error: (error)=>{
        console.log(error);
      },
      complete: ()=>{
        myenabledNotificationSubscription.unsubscribe();
      }
    })
  }

  addEnabledNotification(registryToken:string,docTypeId:number,number:string){
    let data = {registryToken, docTypeId : +docTypeId, number };
    this._notificationsService.createNotification(data as any).subscribe({
      next: (resp)=>{
        this.getMyEnabledNotifications();
      },
      error: (error)=>{
        console.log(error);
      }
    })
  }

  viaPushChanged(enabledNotification : EnabledNotificationInterface){
    enabledNotification.viaPush =! enabledNotification.viaPush;
    this._notificationsService.updateNotification(enabledNotification).subscribe({
      next: (resp)=>{
        this.getMyEnabledNotifications();
      },
      error: (error)=>{
        this.getMyEnabledNotifications();
        alert('error cambiando estado via push');
      }
    });
    
  }

  removeEnabledNotification(id:number){
    this._notificationsService.removeNotification(id).subscribe({
      next: (resp)=>{
        this.getMyEnabledNotifications();
      },
      error: (error)=>{
        alert('error al eliminar notificación');
      }
    })
  }

}
