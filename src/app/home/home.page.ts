import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../services/notifications.service';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  isDevice : boolean;

  constructor(
    private _platform : Platform,
    private _notificationsService : NotificationsService,
    public alertController: AlertController
  ) {
    this.isDevice = this._platform.is('capacitor') ? true : false;
  }

  ngOnInit(){
    this.requestPerosnalDataManagement()
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
          this._notificationsService.saveGoogleRegistryToken(token.value);
        }
      );
  
      // Some issue with our setup and push will not work
      PushNotifications.addListener('registrationError',
        (error: any) => {
          console.log('Error on registration: ' + JSON.stringify(error));
        }
      );
  
      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener('pushNotificationReceived',
        (notification: PushNotificationSchema) => {
          this.showAlert(notification.title,notification.body)
        }
      );
  
      // Method called when tapping on a notification
      PushNotifications.addListener('pushNotificationActionPerformed',
        (notification: ActionPerformed) => {
          console.log('Push action performed: ' + JSON.stringify(notification));
        }
      );
  }

  async showAlert(header:string='',message:string=''){
    const alert = await this.alertController.create({
      cssClass: 'alert-document-found',
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  requestPerosnalDataManagement(){
    this.showAlert('Autorizacion tratamiento de datos personales','De conformidad con lo previsto en la ley 1581 de 2012 manifiesto que otorgo mi autorización para que Perdidocs pueda hacer uso de mis datos personales. Al continuar acepto los terminos y condiciones, de lo contrario por favor abstenerse de usar la aplicación.');
  }

}
