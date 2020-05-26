import { Component, OnInit, ViewChild } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { MatSidenav, MatDialog } from '@angular/material';
import { SidenavService } from '../sidenav-service';
import { Phone } from '../model/phone';
import { AppComponent } from '../app.component';
import { DataService } from '../data-service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { InfoModalComponent } from '../info-modal/info-modal.component';

declare var require: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1, 'margin-top': '0px'
      })),
      state('closed', style({
        opacity: 0, 'margin-top': '60px'
      })),
      transition('open => closed', [
        animate(200)
      ]),
      transition('closed => open', [
        animate(200)
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  img_home = require('./img_home.png');
  img_phone = require('../../assets/phone-icon.png');

  showPhones1 = false;
  showPhones2 = false;

  mostValued: Phone[];
  mostVoted: Phone[];

  constructor(private app: AppComponent, private data: DataService, public dialog: MatDialog) {
  }
  ngOnInit() {
    this.app.progressStart(true);
    this.data.getMostValued().subscribe(response => {
      this.mostValued = response;
      setTimeout(() => {
        this.showPhones1 = true;
      }, 200);
      this.data.getMostVoted().subscribe(data => {
        this.mostVoted = data;
        this.mostVoted.forEach(phone => {
          this.data.getPhoneVotes(phone.id).subscribe(votes => {
            phone.votes = votes;
          });
      });
        setTimeout(() => {
          this.mostVoted = this.mostVoted.sort(function(a, b) {
            if (a.votes < b.votes) {
              return 1;
            } else {
              return -1;
            }
          });
          this.showPhones2 = true;
        }, 200);
      });
      this.app.progressFinish(true);
    });
  }

  enter(event) {
    const phone_image = event.target.childNodes[0];
    const phone_name = event.target.childNodes[1];
    const phone_description = event.target.childNodes[2];
    phone_image.className = 'red-box-animation-out';
    phone_name.style.opacity = 0;
    phone_description.style.opacity = 1;
  }

  leave(event) {
    const phone_image = event.target.childNodes[0];
    const phone_name = event.target.childNodes[1];
    const phone_description = event.target.childNodes[2];
    phone_image.className = 'red-box-animation-in';
    phone_name.style.opacity = 1;
    phone_description.style.opacity = 0;
  }

  openPhoneInfo(phoneInfo: Phone) {
    const dialogRef = this.dialog.open(InfoModalComponent, {
      width: '500px',
      data: {
        phone: phoneInfo
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.data.getMostVoted().subscribe(data => {
        this.mostVoted = data;
        this.mostVoted.forEach(phone => {
          this.data.getPhoneVotes(phone.id).subscribe(votes => {
            phone.votes = votes;
          });
      });
        setTimeout(() => {
          this.mostVoted = this.mostVoted.sort(function(a, b) {
            if (a.votes < b.votes) {
              return 1;
            } else {
              return -1;
            }
          });
          this.showPhones2 = true;
        }, 200);
      });
    });
  }
}
