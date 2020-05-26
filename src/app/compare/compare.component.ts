import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SearchModalComponent } from '../search-modal/search-modal.component';
import { Phone } from '../model/phone';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NullTemplateVisitor } from '@angular/compiler';
import { AppComponent } from '../app.component';
import { SelectService } from '../select-service';
import { DataService } from '../data-service';
declare var require: any;

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1, 'margin-top': '10px'
      })),
      state('closed', style({
        opacity: 0, 'margin-top': '30px'
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
export class CompareComponent implements OnInit {

  constructor(public dialog: MatDialog, private app: AppComponent, private select: SelectService, private data: DataService) { }

  dtOptions: DataTables.Settings[] = [];

  @ViewChildren(DataTableDirective)
  dtElements:  QueryList<DataTableDirective>;

  dtTrigger: Subject<any>[] = [];

  img_phone = require('../../assets/phone-icon.png');

  flagSelected1 = true;
  flagSelected2 = true;
  phone1: Phone;
  phone2: Phone;
  showCompare = false;

  ngOnInit() {
    this.dtOptions[0] = {
      paging: false,
      ordering: false,
      searching: false,
      info: false,
      columns: [
        {orderable: false, width: '50%'},
        {orderable: false, width: '50%'}
      ]
    };
    this.dtTrigger[0] = new Subject<any>();
    if (this.select.getPhone() !== null) {
      this.phone1 = this.select.getPhone();
      this.data.getPhoneVotes(this.phone1.id).subscribe(data => {
        this.phone1.votes = data;
      });
      this.flagSelected1 = false;
    }
  }

  openSearch1() {
    let id;
    if (!this.flagSelected2) {
      id = this.phone2.id;
    }
    const dialogRef = this.dialog.open(SearchModalComponent, {
      width: '1000px',
      data: {
        id: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.flagSelected1 = false;
        this.phone1 = result;
        this.data.getPhoneVotes(result.id).subscribe(data => {
          this.phone1.votes = data;
        });
        if (!this.flagSelected2 && this.flagSelected1) {
          this.dtTrigger[0].next();
        }
      }
    });
  }

  openSearch2() {
    let id;
    if (!this.flagSelected1) {
      id = this.phone1.id;
    }
    const dialogRef = this.dialog.open(SearchModalComponent, {
      width: '1000px',
      data: {
        id: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.flagSelected2 = false;
        this.phone2 = result;
        this.data.getPhoneVotes(result.id).subscribe(data => {
          this.phone2.votes = data;
        });
        if (!this.flagSelected2 && this.flagSelected1) {
          this.dtTrigger[0].next();
        }
      }
    });
  }

  compare() {
    this.app.progressStart(true);
    setTimeout(() => {
      this.app.progressFinish(true);
      this.showCompare = true;
    }, 500);
  }

  cancel() {
    this.showCompare = false;
    this.flagSelected1 = true;
    this.flagSelected2 = true;
    this.phone1 = null;
    this.phone2 = null;
  }
}
