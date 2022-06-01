import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  darkMode : boolean = false;
  constructor() {
    this.checkDarkTheme();
  }

  checkDarkTheme(){
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
  
    if(this.darkMode) this.setTheme('dark');
  }
  
  setTheme(theme:string){
    let lastTheme = document.body.classList.item(0);
    if (lastTheme) document.body.classList.replace(lastTheme,theme)
    else document.body.classList.add(theme);
  }

}
