import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EnabledNotificationInterface } from '../shared/interfaces/enabled-notification-interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  httpHeaders : HttpHeaders = new HttpHeaders({
    'Accept' : 'application/json',
    'Content-Type' : 'application/json'
  })

  constructor(
    private http : HttpClient
  ) {}

  getMyEnabledNotifications(registryToken : string): Observable<EnabledNotificationInterface[]>{
    return this.http.get<EnabledNotificationInterface[]>(`${environment.API_URL}enabled-notifications/${registryToken}`,{headers:this.httpHeaders});
  }

  createNotification(data : EnabledNotificationInterface) : Observable<EnabledNotificationInterface>{
    return this.http.post<EnabledNotificationInterface>(`${environment.API_URL}enabled-notifications`,data,{headers : this.httpHeaders});
  }

  updateNotification(data : EnabledNotificationInterface){
    return this.http.put<EnabledNotificationInterface>(`${environment.API_URL}enabled-notifications`,data,{headers : this.httpHeaders});
  }

  removeNotification(id:number){
    return this.http.delete(`${environment.API_URL}enabled-notifications/${id}`,{headers:this.httpHeaders});
  }
}
