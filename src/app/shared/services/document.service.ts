import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateDocumentInterface } from '../interfaces/create-document-interface';
import { DocTypeInterface } from '../interfaces/doc-type-interface';
import { DocumentInterface } from '../interfaces/document-interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  headers : HttpHeaders = new HttpHeaders().set('Content-Type','application/json').set('Accept','application/json');

  constructor(
    private _http : HttpClient
  ) { }

  getAllDocTypes() : Observable<DocTypeInterface[]> {
    return this._http.get<DocTypeInterface[]>(`${environment.API_URL}docTypes`,{headers:this.headers});
  }

  createDocument(data:CreateDocumentInterface) : Observable<DocumentInterface> {
    return this._http.post<DocumentInterface>(`${environment.API_URL}docs`,data,{headers:this.headers});
  }

  searchDocument(docType:number,number:string): Observable<DocumentInterface>{
    return this._http.get<DocumentInterface>(`${environment.API_URL}docs/search/${docType}/${number}`,{headers:this.headers});
  }
}
