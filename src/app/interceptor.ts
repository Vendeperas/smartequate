import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OauthGuard } from './oauth-guard';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UserService } from './user-service';
import { ReloginComponent } from './relogin/relogin.component';
import { AppComponent } from './app.component';
import { LoadingService } from './loading-service';



@Injectable()
export class Interceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor( private app: AppComponent, private dialog: MatDialog, private userService: UserService,
    private oauthGuard: OauthGuard, private router: Router, private loadingService: LoadingService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interceptada petició ' + request.url);
    if (!request.url.includes('/authenticate')) {
        if (!this.isRefreshing) {
            if (this.oauthGuard.checkVariables) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    }
                });
                console.log('Afegint el token als headers de la petició...');
                return  this.returnRequest(request, next);
            } else {
                console.log('Falten variables de localStorage. Kickout...');
               this.kickOut();
               return throwError('Unauthorized');
            }
        } else {
            console.log('Pendent de relogin. Colocant petició a la cua...');
            return this.handleIsRefreshing(request, next);
        }
    } else {
        console.log('Petició /authorize ...');
       return this.returnRequest(request, next);
    }
  }

  showError(message: string) {
    this.app.showError(message);
  }

  kickOut() {
    localStorage.clear();
    this.userService.setDecryptedUser('');
    this.router.navigateByUrl('/login');
  }

  returnRequest(request, next) {
    return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
                switch (error.status) {
                    case 401: {
                        if (!request.url.includes('/authenticate')) {
                            console.log('Iniciant procés de relogin...');
                            this.isRefreshing = true;
                            setTimeout(() => {
                                this.loadingService.finishProgress(true);
                            });
                            const dialogRef = this.dialog.open(ReloginComponent, {
                                disableClose: true,
                                width: '500px',
                                minWidth: '500px',
                                backdropClass: 'reloginBackground'
                            });
                            return dialogRef.afterClosed().pipe(switchMap((refreshResponse: any) => {
                                if (refreshResponse !== null && refreshResponse !== undefined) {
                                    console.log('Relogin realitzat. Nou token guardat.');
                                    this.saveLocalStorageVariables(refreshResponse.token);
                                    request = request.clone({
                                        setHeaders: {
                                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                                        }
                                    });
                                    this.isRefreshing = false;
                                    this.loadingService.finishProgress(true);
                                    console.log('Actualitzant la cua de processos pendents...');
                                    this.refreshTokenSubject.next(refreshResponse.access_token);
                                    return this.returnRequest(request, next);
                                } else {
                                    this.kickOut();
                                    this.isRefreshing = false;
                                    this.refreshTokenSubject.next(null);
                                    return throwError('Unauthorized');
                                }
                            }));
                        } else {
                            this.showError('El servei ha retornat un error o no es troba disponible. Provi-ho de nou mes tard.');
                            break;
                        }
                    }
                    default: {
                        this.showError('El servei ha retornat un error o no es troba disponible. Provi-ho de nou mes tard.');
                        break;
                    }
            }
            return throwError(error.message);
        })
    );
  }


  handleIsRefreshing(request, next): Observable<HttpEvent<any>> {
    console.log('Colocació de la petició ' + request.url + ' a la cua.')
    return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(refreshedToken => {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${refreshedToken}`
                }
            });
          return this.returnRequest(request, next);
        }));
  }

  saveLocalStorageVariables(accessToken) {
    localStorage.setItem('accessToken', accessToken);
  }
}
