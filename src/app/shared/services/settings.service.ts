import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  currentTheme : string = 'light';
  constructor(
    private _storageService : StorageService
  ) {
    this.checkCurrentTheme();
  }

  checkDarkTheme(){
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
    if(prefersDark.matches) this.setTheme('dark');
  }
  
  setTheme(theme:string){
    let lastTheme = document.body.classList.item(0);
    if (lastTheme) document.body.classList.replace(lastTheme,theme)
    else document.body.classList.add(theme);
    this.currentTheme = theme;
    this._storageService.set('theme',this.currentTheme);
  }
  
  getCurrentTheme(){
    return this.currentTheme;
  }

  async checkCurrentTheme(){
    this.currentTheme = await this._storageService.get('theme');
    if(this.currentTheme) this.setTheme(this.currentTheme);
    else this.checkDarkTheme();
  }

}
