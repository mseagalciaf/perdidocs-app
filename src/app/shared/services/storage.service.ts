import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }


  // Create and expose methods that users of this service can
  // call, for example:
  async set(key: string, value: any) {
    await Storage.set({
      key,
      value
    });
  }

  async get(key: string) {
    const { value } = await Storage.get({ key });
    return value;
  }
}
