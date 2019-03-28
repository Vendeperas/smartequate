import { Component, OnInit, ViewChild } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SidenavService } from '../sidenav-service';
declare var require: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  img_home = require('./img_home.png');
  img_phone = require('./iPhoneX-Svr.png');

  constructor() {
  }
  ngOnInit() {
  }

  enter(event) {
    console.log('enter', event);
    const phone_image = event.target.childNodes[0];
    const phone_name = event.target.childNodes[1];
    const phone_description = event.target.childNodes[2];
    phone_image.className = 'red-box-animation-out';
    phone_name.style.opacity = 0;
    phone_description.style.opacity = 1;
  }

  leave(event) {
    console.log('leave', event);
    const phone_image = event.target.childNodes[0];
    const phone_name = event.target.childNodes[1];
    const phone_description = event.target.childNodes[2];
    phone_image.className = 'red-box-animation-in';
    phone_name.style.opacity = 1;
    phone_description.style.opacity = 0;
  }
}
