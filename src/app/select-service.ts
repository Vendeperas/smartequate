import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Phone } from './model/phone';

@Injectable()
export class SelectService {
    private phone: Phone = null;
    setPhone$: Observable<any>;
    private phoneSubject = new Subject<any>();


    constructor() {
        this.setPhone$ = this.phoneSubject.asObservable();
    }

    setPhone(data) {
        this.phone = data;
        this.phoneSubject.next(data);
    }

    getPhone() {
        return this.phone;
    }

}
