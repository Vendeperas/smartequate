import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { Phone, PageableResponse, CustomSearchBody } from './model/phone';

@Injectable({
    providedIn: 'root'
  })
  export class DataService {
    response: Object;

    constructor( private http: HttpClient) {}

    /*httpOptions() {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-IBM-Client-Id' : this.clientId
        })
      };

      return httpOptions;
    }*/

    baseUrl = 'http://localhost:8081/';

    errorHandler(error: HttpErrorResponse) {
      return observableThrowError(error);
    }

    getMostValued() {
        return this.http.get<Phone[]>(this.baseUrl + 'phones/mostValued');
    }

    computeAll() {
      return this.http.get(this.baseUrl + 'phones/compute');
    }

    getMostVoted() {
      return this.http.get<Phone[]>(this.baseUrl + 'phones/mostVoted');
    }

    filterPhones(query: String, body: CustomSearchBody) {
      return this.http.post<PageableResponse>(this.baseUrl + 'phones/list' + query, body);
    }

    getAllPhones(query: String) {
      return this.http.get<PageableResponse>(this.baseUrl + 'phones/all' + query);
    }
}
