import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-document',
  templateUrl: './search-document.page.html',
  styleUrls: ['./search-document.page.scss'],
})
export class SearchDocumentPage implements OnInit {

  messageCartoon : string = "¡Hola!, Puedo ayudarte a buscar tu documento, solo selecciona el tipo de documento e ingresa el número correspondiente, yo me encargo del resto.";
  
  constructor() { }

  ngOnInit() {
  }

}
