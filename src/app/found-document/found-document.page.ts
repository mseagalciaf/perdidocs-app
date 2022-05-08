import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-found-document',
  templateUrl: './found-document.page.html',
  styleUrls: ['./found-document.page.scss'],
})
export class FoundDocumentPage implements OnInit {

  messageCartoon : string = "Hey, has encontrado el documento de otra persona, ayúdale registrando la información en mi base de datos y así esa persona podrá ponerse en contacto contigo para recuperarlo. ¡Eres de lo mejor!";

  constructor() { }

  ngOnInit() {
  }

}
