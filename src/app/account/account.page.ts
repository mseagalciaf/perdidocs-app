import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from '../services/notifications.service';
import { EnabledNotificationInterface } from '../shared/interfaces/enabled-notification-interface';
import { SettingsService } from '../shared/services/settings.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  myEnabledNotifications : EnabledNotificationInterface[];
  registryToken : string = "";
  themeControl : FormControl;
  themes : string[] = ['light','dark','purple','green','aqua'];
  constructor(
    private readonly _notificationsService : NotificationsService,
    private _formBuilder : FormBuilder,
    private _route : ActivatedRoute,
    private _settingsService : SettingsService
  ) { 
    this.themeControl = new FormControl(this._settingsService.currentTheme);
  }

  ngOnInit() {

    this.getMyEnabledNotifications();
    this._route.queryParams
      .subscribe(params => {
        if (params.docTypeId && params.docNumber) {
          this.addEnabledNotification(this._notificationsService.getGoogleRegistryToken(),params.docTypeId,params.docNumber);        
        }
      }
    );

  }

  changeTheme(event:any){
    console.log(event.value.toLowerCase());
    this._settingsService.setTheme(event.value.toLowerCase());
  }

  getMyEnabledNotifications(){
    let myenabledNotificationSubscription = this._notificationsService.getMyEnabledNotifications(this._notificationsService.getGoogleRegistryToken()).subscribe({
      next: (resp)=>{
        console.log(resp);
        
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
