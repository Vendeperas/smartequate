import { Component, ViewChild, ChangeDetectorRef , OnDestroy, OnInit} from '@angular/core';
import { MatSidenav, MatSnackBar } from '@angular/material';
import { SidenavService } from './sidenav-service';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router, NavigationEnd } from '@angular/router';
import { NgProgressComponent } from '@ngx-progressbar/core';
import { LoadingService } from './loading-service';
import { EncryptService } from './encrypt-service';
import { UserService } from './user-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy, OnInit {

  @ViewChild('snav') public sidenav: MatSidenav;
  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;

  title = 'smartequate-app';
  currentUrl = '';
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(private router: Router,  private snackBar: MatSnackBar, private loadingService: LoadingService) {
  /*
   this.mobileQuery = this.media.matchMedia('(max-width: 2000px)');
  this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
  this.mobileQuery.addListener(this._mobileQueryListener);
  */
  }

  toggleRightSidenav() {
    this.sidenav.toggle();
 }

 ngOnInit() {

  this.loadingService.startProgress$.subscribe(data => {
    if (data) {
      this.progressBar.start();
    }
    document.getElementById('loadingDiv').style.display = 'block';
  });

  this.loadingService.finishProgress$.subscribe(data => {
    if (data) {
      this.progressBar.complete();
    }
    document.getElementById('loadingDiv').style.display = 'none';
  });

  this.router.events.subscribe(data => {
    if (data instanceof NavigationEnd) {
     this.currentUrl = window.location.pathname;
    }
   });

 }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  closeSideNav() {
    this.sidenav.close();
  }

  progressStart(bar: boolean) {
    if (bar) {
      this.progressBar.start();
    }
    document.getElementById('loadingDiv').style.display = 'block';
  }
  progressFinish(bar: boolean) {
    if (bar) {
      this.progressBar.complete();
    }
    document.getElementById('loadingDiv').style.display = 'none';
  }

  showError(input) {
    this.snackBar.open(input, 'Tancar' , {
      panelClass: ['custom-snackbar-error'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5000
    });
  }
}
