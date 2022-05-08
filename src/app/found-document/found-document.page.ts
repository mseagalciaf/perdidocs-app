import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateDocumentInterface } from '../shared/interfaces/create-document-interface';
import { DocTypeInterface } from '../shared/interfaces/doc-type-interface';
import { DocumentService } from '../shared/services/document.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-found-document',
  templateUrl: './found-document.page.html',
  styleUrls: ['./found-document.page.scss'],
})
export class FoundDocumentPage implements OnInit {

  isLoading : boolean = false;
  docTypes : DocTypeInterface[];
  messageCartoon : string = "Hey, has encontrado el documento de otra persona, ayúdale registrando la información en mi base de datos y así esa persona podrá ponerse en contacto contigo para recuperarlo. ¡Eres de lo mejor!";
  errorsCartoon : string[] = [];
  foundForm : FormGroup;
  createDocumentSubscription : Subscription;
  getDocTypesSubscription : Subscription;

  constructor(
    public _formBuilder : FormBuilder,
    private readonly _documentService : DocumentService,
    private _router : Router
  ) {
    this.foundForm = this._formBuilder.group({
      docTypeId : ['',[Validators.required]],
      number : ['',[Validators.required,Validators.minLength(5),Validators.pattern(/^\d+$/)]],
      phone : ['',[Validators.required,Validators.minLength(10),Validators.pattern(/^\d+$/)]]
    });
  }
  
  ngOnInit() {
    this.getDocTypes();
  }

  registerDocument(dataForm:CreateDocumentInterface){
    dataForm.docTypeId = +dataForm.docTypeId;

    if (this.foundForm.valid) {
      this.isLoading = true;
      this.createDocumentSubscription = this._documentService.createDocument(dataForm).pipe(
        finalize( () => {
          this.isLoading = false;
        })
      ).subscribe({
        next: (resp) => {
          this.foundForm.reset();
          this._router.navigate(['/found-document/confirmation']);       
        },
        error: (err) => {
          if (err.error.statusCode == 400) {
            this.messageCartoon = "Ups! Creo que has instroducido datos inválidos. Por favor revisa.";
            let errMessages = err.error.message.map( (element:string) => element );
            this.errorsCartoon = errMessages;
          }else{
            console.log(err);
          }
        }
      })
    }else{
      this.messageCartoon = "Ups! Creo que has instroducido datos inválidos. Por favor revisa."
    }
  }

  getDocTypes(){
    this.getDocTypesSubscription = this._documentService.getAllDocTypes().subscribe({
      next: (resp) => {
        this.docTypes = resp;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
