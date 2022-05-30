import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DocTypeInterface } from '../shared/interfaces/doc-type-interface';
import { DocumentService } from '../shared/services/document.service';

@Component({
  selector: 'app-search-document',
  templateUrl: './search-document.page.html',
  styleUrls: ['./search-document.page.scss'],
})
export class SearchDocumentPage implements OnInit, OnDestroy {

  isLoading : boolean = false;
  docTypes : DocTypeInterface[];
  messageCartoon : string = "¡Hola!, Puedo ayudarte a buscar tu documento, solo selecciona el tipo de documento e ingresa el número correspondiente, yo me encargo del resto.";
  getDocTypesSubscription : Subscription;
  searchDocSubscription : Subscription;
  docTypeId : FormControl = new FormControl('',[Validators.required]);
  numberDoc : FormControl = new FormControl('',[Validators.required,Validators.minLength(5),Validators.pattern(/^\d+$/)]);
  
  constructor(
    private readonly _documentService : DocumentService,
    private _router : Router
  ) { }

  ngOnInit() {
    this.getDocTypes();
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

  search(){
    if (this.docTypeId.valid && this.numberDoc.valid) {
       this.getDocTypesSubscription = this._documentService.searchDocument(this.docTypeId.value,this.numberDoc.value).pipe(
        finalize( () => {
          this.isLoading = false;
          this.docTypeId.reset();
          this.numberDoc.reset();
        })
      ).subscribe({
        next: (resp) => {
          this._router.navigate(['/search-document/confirmation'],{
            queryParams : { phone : resp.phone }
          });
        },
        error: (err) => {
          console.log(err);
          
          if (err.status = 404) {
            this._router.navigate(['/search-document/confirmation'],{
              queryParams : {
                docTypeId : this.docTypeId.value,
                docNumber : this.numberDoc.value
              }
            });
          }else{
            console.log(err);   
          }
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.getDocTypesSubscription.unsubscribe();
    if(this.searchDocSubscription) this.searchDocSubscription.unsubscribe();
  }
}
