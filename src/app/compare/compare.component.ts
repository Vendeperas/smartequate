import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SearchModalComponent } from '../search-modal/search-modal.component';
import { Phone, BestPoints, Points } from '../model/phone';
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
        opacity: 1, 'margin-top': '30px'
      })),
      state('closed', style({
        opacity: 0, 'margin-top': '50px'
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
  flagSelected3 = true;


  flagTable1 = false;
  flagTable2 = false;
  flagTable3 = false;


  phone1: Phone;
  phone2: Phone;
  phone3: Phone;

  showCompare1 = false;
  showCompare2 = false;
  showCompare3 = false;

  bestPoints1: BestPoints = new BestPoints();
  bestPoints2: BestPoints = new BestPoints();
  bestPoints3: BestPoints = new BestPoints();

  ngOnInit() {
    this.dtOptions[0] = {
      paging: false,
      ordering: false,
      searching: false,
      info: false,
      columns: [
        {orderable: false}
      ]
    };
    this.dtTrigger[0] = new Subject<any>();

    this.dtOptions[1] = {
      paging: false,
      ordering: false,
      searching: false,
      info: false,
      columns: [
        {orderable: false}
      ]
    };
    this.dtTrigger[1] = new Subject<any>();

    this.dtOptions[2] = {
      paging: false,
      ordering: false,
      searching: false,
      info: false,
      columns: [
        {orderable: false}
      ]
    };
    this.dtTrigger[2] = new Subject<any>();

    if (this.select.getPhone() !== null) {
      this.showCompare1 = false;
      setTimeout(() => {
        this.phone1 = this.select.getPhone();
        this.select.setPhone(null);
        this.data.getPhoneVotes(this.phone1.id).subscribe(data => {
          this.phone1.votes = data;
          this.checkBest();
          this.flagSelected1 = false;
          setTimeout(() => {
            if (!this.flagTable1) {
              this.flagTable1 = true;
              this.dtTrigger[0].next();
            }
           setTimeout(() => {
            this.showCompare1 = true;
           });
          });
        });
      }, 200);
    }
  }

  openSearch1() {
    let id2;
    let id3;
    if (!this.flagSelected2) {
      id2 = this.phone2.id;
    }
    if (!this.flagSelected3) {
      id3 = this.phone3.id;
    }
    const dialogRef = this.dialog.open(SearchModalComponent, {
      width: '1000px',
      data: {
        id1: id2,
        id2: id3
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.showCompare1 = false;
        setTimeout(() => {
          this.phone1 = result;
          this.data.getPhoneVotes(result.id).subscribe(data => {
            this.phone1.votes = data;
            this.checkBest();
            this.flagSelected1 = false;
            setTimeout(() => {
              if (!this.flagTable1) {
                this.flagTable1 = true;
                this.dtTrigger[0].next();
              }
             setTimeout(() => {
              this.showCompare1 = true;
             });
            });
          });
        }, 200);
      }
    });
  }

  openSearch2() {
    let id1;
    let id3;
    if (!this.flagSelected1) {
      id1 = this.phone1.id;
    }
    if (!this.flagSelected3) {
      id3 = this.phone3.id;
    }
    const dialogRef = this.dialog.open(SearchModalComponent, {
      width: '1000px',
      data: {
        id1: id1,
        id2: id3
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.showCompare2 = false;
        setTimeout(() => {
          this.phone2 = result;
          this.data.getPhoneVotes(result.id).subscribe(data => {
            this.phone2.votes = data;
            this.checkBest();
            this.flagSelected2 = false;
            setTimeout(() => {
              if (!this.flagTable2) {
                this.flagTable2 = true;
                this.dtTrigger[1].next();
              }
             setTimeout(() => {
              this.showCompare2 = true;
             });
            });
          });
        }, 200);
      }
    });
  }

  openSearch3() {
    let id1;
    let id2;
    if (!this.flagSelected1) {
      id1 = this.phone1.id;
    }
    if (!this.flagSelected2) {
      id2 = this.phone2.id;
    }
    const dialogRef = this.dialog.open(SearchModalComponent, {
      width: '1000px',
      data: {
        id1: id1,
        id2: id2
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.showCompare3 = false;
        this.phone3 = result;
        this.data.getPhoneVotes(result.id).subscribe(data => {
          this.phone3.votes = data;
          this.checkBest();
          this.flagSelected3 = false;
          setTimeout(() => {
            if (!this.flagTable3) {
              this.flagTable3 = true;
              this.dtTrigger[2].next();
            }
           setTimeout(() => {
            this.showCompare3 = true;
           }, 200);
          });
        });
      }
    });
  }

  cancel() {
    this.showCompare1 = false;
    this.flagSelected1 = true;
    this.flagSelected2 = true;
    this.phone1 = null;
    this.phone2 = null;
  }

  updateTables() {
    if (this.phone1 !== undefined) {
      this.destroyTable(0);
      setTimeout(() => {
        this.dtTrigger[0].next();
      });
    }

    if (this.phone2 !== undefined) {
      this.destroyTable(1);
      setTimeout(() => {
        this.dtTrigger[1].next();
      });
    }

    if (this.phone3 !== undefined) {
      this.destroyTable(2);
      setTimeout(() => {
        this.dtTrigger[2].next();
      });
    }

  }

  destroyTable(index: number) {
    this.dtElements.forEach(table => {
      if (table.dtOptions === this.dtOptions[index]) {
        if (table.dtInstance !== undefined) {
          table.dtInstance.then((dt: DataTables.Api) => {
            dt.destroy();
          });
        }
      }
    });
  }

  checkBest() {
    let phone: Phone;

    if (this.phone1 !== undefined) {
      phone = this.phone1;
    } else if (this.phone2 !== undefined) {
      phone = this.phone2;
    } else {
      phone = this.phone3;
    }

    for (const propertyName of Object.keys(phone.points)) {
      const values: number[] = [];
      if (this.phone1 !== undefined) {
        values.push(this.phone1.points[propertyName]);
      }

      if (this.phone2 !== undefined) {
        values.push(this.phone2.points[propertyName]);
      }

      if (this.phone3 !== undefined) {
        values.push(this.phone3.points[propertyName]);
      }

      const maxValue = Math.max(...values);
      if (this.phone1 !== undefined) {
        if (this.phone1.points[propertyName] === maxValue) {
          this.bestPoints1[propertyName] = true;
         } else {
          this.bestPoints1[propertyName] = false;
         }
      }

      if (this.phone2 !== undefined) {
        if (this.phone2.points[propertyName] === maxValue) {
          this.bestPoints2[propertyName] = true;
         } else {
          this.bestPoints2[propertyName] = false;
         }
      }

      if (this.phone3 !== undefined) {
        if (this.phone3.points[propertyName] === maxValue) {
          this.bestPoints3[propertyName] = true;
         } else {
          this.bestPoints3[propertyName] = false;
         }
      }
    }
    const bestValues: number[] = [];
    if (this.phone1 !== undefined) {
      bestValues.push(this.phone1.points.totalPoints);
    }

    if (this.phone2 !== undefined) {
      bestValues.push(this.phone2.points.totalPoints);
    }

    if (this.phone3 !== undefined) {
      bestValues.push(this.phone3.points.totalPoints);
    }

    const bestValue = Math.max(...bestValues);

    if (this.phone1 !== undefined) {
     if (this.phone1.points.totalPoints === bestValue) {
       this.phone1.best = true;
     } else {
      this.phone1.best = false;
     }
    }

    if (this.phone2 !== undefined) {
      if (this.phone2.points.totalPoints === bestValue) {
        this.phone2.best = true;
      } else {
       this.phone2.best = false;
      }
    }

    if (this.phone3 !== undefined) {
      if (this.phone3.points.totalPoints === bestValue) {
        this.phone3.best = true;
      } else {
       this.phone3.best = false;
      }
    }
  }

}
