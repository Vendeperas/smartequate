import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AppComponent } from '../app.component';
import { DataService } from '../data-service';
import { Phone, CustomSearchBody } from '../model/phone';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { InfoModalComponent } from '../info-modal/info-modal.component';

export interface DisplayInterface {
  value:  String;
  viewValue: String;
}

export interface PortInterface {
  value:  String;
  viewValue: String;
}

export interface MemoryInterface {
  value:  number;
  viewValue: String;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
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
export class SearchComponent implements OnInit {

  constructor(private app: AppComponent, private data: DataService, public dialog: MatDialog) { }

  dtOptions: DataTables.Settings[] = [];

  @ViewChildren(DataTableDirective)
  dtElements:  QueryList<DataTableDirective>;

  dtTrigger: Subject<any>[] = [];
  showPhones = false;
  flagUp = false;
  phones: Phone[];

  enteredWeight = 300;
  enteredSim = null;
  enteredMinDisplay = 0;
  enteredMaxDisplay = 10;
  enteredCardSlot = true;
  enteredCameraA = null;
  enteredCameraB = null;
  enteredJack = true;
  enteredDisplay = '';
  enteredRom = 0;
  enteredRam = 0;
  enteredPort = '';
  enteredMultitouch = true;
  disabledSearch = false;

  displays: DisplayInterface[] = [{value: '', viewValue: 'Tots'}, {value: 'led', viewValue: 'led'},
  {value: 'oled', viewValue: 'oled'},
  {value: 'amoled', viewValue: 'amoled'}];

  memories: MemoryInterface[] = [
    {value: 0, viewValue: '0gb'},
    {value: 2, viewValue: '2gb'},
  {value: 4, viewValue: '4gb'},
  {value: 8, viewValue: '8gb'},
  {value: 16, viewValue: '16gb'},
  {value: 32, viewValue: '32gb'},
  {value: 64, viewValue: '64gb'},
  {value: 128, viewValue: '128gb'},
  {value: 256, viewValue: '256gb'},
  {value: 512, viewValue: '512gb'},
  {value: 1024, viewValue: '1024gb'}];

  ports: PortInterface[] = [
    {value: '', viewValue: 'Tots'},
    {value: 'micro_usb', viewValue: 'micro_usb'},
    {value: 'type_c', viewValue: 'type_c'}
  ];


  simTrayControl = new FormControl('', [
    Validators.max(2),
    Validators.min(1)
  ]);

  minDisplayControl = new FormControl('', [
    Validators.max(10),
    Validators.min(0)
  ]);

  maxDisplayControl = new FormControl('', [
    Validators.max(10),
    Validators.min(0)
  ]);

  cameraAControl = new FormControl('', [
    Validators.max(100),
    Validators.min(0)
  ]);

  cameraBControl = new FormControl('', [
    Validators.max(100),
    Validators.min(0)
  ]);

  formatLabel(value: number) {
      return Math.round(value) + 'gr';
  }

  checkValid() {
    if (this.simTrayControl.valid && this.minDisplayControl.valid && this.maxDisplayControl.valid
      && this.cameraAControl.valid && this.cameraBControl.valid) {
        this.disabledSearch = false;
      } else {
        this.disabledSearch = true;
      }
  }

  ngOnInit() {

    this.simTrayControl.valueChanges.subscribe(() => {
      this.checkValid();
    });
    this.minDisplayControl.valueChanges.subscribe(() => {
      this.checkValid();
    });
    this.maxDisplayControl.valueChanges.subscribe(() => {
      this.checkValid();
    });
    this.cameraAControl.valueChanges.subscribe(() => {
      this.checkValid();
    });
    this.cameraBControl.valueChanges.subscribe(() => {
      this.checkValid();
    });

    this.dtOptions[0] = {
      pagingType: 'full_numbers',
      pageLength: 5,
      searching: true,
      dom: 'ltipr',
      serverSide: true,
      processing: true,
      order: [[0, 'asc']],
      ajax: (dataTablesParameters: any, callback) => {
        this.app.progressStart(true);
        let orderColumn = '';
        const orderDirection = dataTablesParameters.order[0].dir;
        switch (dataTablesParameters.order[0].column) {
          case 0: {
            orderColumn = 'name';
            break;
          }
          case 1: {
            orderColumn = 'brand';
            break;
          }
          default: {
            orderColumn = 'name';
            break;
          }
        }

        let query = '?name=' + dataTablesParameters.columns[0].search.value
        + '&brand=' + dataTablesParameters.columns[1].search.value
        + '&cpu=' + dataTablesParameters.columns[2].search.value
        + '&battery=' + dataTablesParameters.columns[3].search.value
        + '&sort=' + orderColumn
        + '&direction=' + orderDirection;
        document.getElementById('table-card').style.height =
        (document.getElementById('table-card').offsetHeight - 32).toString() + 'px';
        this.dtElements.first.dtInstance.then((dtInstance1: DataTables.Api) => {
          const selectedPage = dtInstance1.page.info().page;
          query += '&page=' + selectedPage
                + '&size=' + dataTablesParameters.length;

          const body: CustomSearchBody = {
            weight: this.enteredWeight,
            sim_tray: this.enteredSim,
            minDisplaySize: this.enteredMinDisplay,
            maxDisplaySize: this.enteredMaxDisplay,
            card_slot: this.enteredCardSlot,
            cameraA: this.enteredCameraA,
            cameraB: this.enteredCameraB,
            jack: this.enteredJack,
            display_type: this.enteredDisplay,
            rom: this.enteredRom,
            ram: this.enteredRam,
            port: this.enteredPort,
            multitouch: this.enteredMultitouch
          };

          this.data.filterPhones(query, body).subscribe(response => {
            callback({
              recordsTotal: response.totalElements,
              recordsFiltered: response.totalElements,
              data: []
            });
            this.phones = response.content;
            this.showPhones = true;
            setTimeout(() => {
              if (!this.flagUp) {
                this.flagUp = true;
                this.dtElements.forEach(table => {
                  if (table.dtOptions === this.dtOptions[0]) {
                    table.dtInstance.then((dt: DataTables.Api) => {
                      dt.columns().every(function () {
                        const that = this;
                        $('input', this.footer()).on('keyup change', function () {
                          if (that.search() !== this['value']) {
                            that.search(this['value']).draw();
                          }
                        });
                      });
                    });
                  }
                });
              }
            });
            setTimeout(() => {
              document.getElementById('table-card').style.height = '';
              this.app.progressFinish(true);
            });
          });
        });
      },
      columns: [
        {},
        {},
        {orderable: false},
        {orderable: false},
        {width: '200px', orderable: false}
      ]
    };

    this.dtTrigger[0] = new Subject<any>();
    setTimeout(() => {
      this.dtTrigger[0].next();
    });
  }

  search() {
    this.showPhones = false;
    setTimeout(() => {
      this.dtElements.first.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger[0].next();
      });
    }, 200);
  }

  openInfo(phone: Phone) {
    const dialogRef = this.dialog.open(InfoModalComponent, {
      width: '500px',
      data: {
        phone: phone
      }
    });
  }

}
