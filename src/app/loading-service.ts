import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class LoadingService {
    startProgress$: Observable<any>;
    private startSubject = new Subject<any>();

    finishProgress$: Observable<any>;
    private finishSubject = new Subject<any>();

    constructor() {
        this.startProgress$ = this.startSubject.asObservable();
        this. finishProgress$ = this.finishSubject.asObservable();
    }

    startProgress(withBar: boolean) {
        this.startSubject.next(withBar);
    }

    finishProgress(withBar: boolean) {
      this.finishSubject.next(withBar);
    }

}
