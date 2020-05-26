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
          'Authorization' : 'Bearer '
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

    getPhoneVotes(id: number) {
      return this.http.get<number>(this.baseUrl + 'votes/phones/' + id);
    }

    authenticate(user: String, pass: String) {
      const body = {
        username: user,
        password: pass
      };

      return this.http.post(this.baseUrl + 'authenticate', body);
    }

    checkIfLiked(phoneId: number, user: String) {
      return this.http.get<boolean>(this.baseUrl + 'votes/phone/' + phoneId + '/user/' + user);
    }

    likePhone(phoneId: number, user: String) {
      return this.http.post<any>(this.baseUrl + 'votes/phone/' + phoneId + '/user/' + user, null);
    }

    unlikePhone(phoneId: number, user: String) {
      return this.http.delete<any>(this.baseUrl + 'votes/phone/' + phoneId + '/user/' + user);
    }
}
