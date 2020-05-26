import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UserService {
    private user = '';
    setUser$: Observable<any>;
    private userSubject = new Subject<any>();

    private decryptedUser = '';
    setdecryptedUser$: Observable<any>;
    private userdecryptedUser = new Subject<any>();


    constructor() {
        this.setUser$ = this.userSubject.asObservable();
        this.setdecryptedUser$ = this.userdecryptedUser.asObservable();
    }

    setUser(data) {
        this.user = data;
        this.userSubject.next(data);
    }

    getUser() {
        return this.user;
    }

    setDecryptedUser(data) {
        this.decryptedUser = data;
        this.userdecryptedUser.next(data);
    }

    getDecryptedUser() {
        return this.decryptedUser;
    }


}
