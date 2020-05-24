import { Component, OnInit, ViewChildren, QueryList, Inject } from '@angular/core';
import { DataService } from '../data-service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Phone } from '../model/phone';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss']
})
export class SearchModalComponent implements OnInit {

  constructor(private data: DataService, public dialogRef: MatDialogRef<SearchModalComponent>,
    @Inject(MAT_DIALOG_DATA) public id: any) { }

  dtOptions: DataTables.Settings[] = [];

  @ViewChildren(DataTableDirective)
  dtElements:  QueryList<DataTableDirective>;

  dtTrigger: Subject<any>[] = [];
  phones: Phone[];
  flagUp = false;
  phoneId: number;
  ngOnInit() {
    this.phoneId = this.id.id;
    this.dtOptions[0] = {
      pagingType: 'full_numbers',
      pageLength: 5,
      searching: true,
      dom: 'ltipr',
      serverSide: true,
      processing: true,
      order: [[0, 'asc']],
      ajax: (dataTablesParameters: any, callback) => {
        let query = '?name=' + dataTablesParameters.columns[0].search.value
        + '&brand=' + dataTablesParameters.columns[1].search.value
        + '&cpu=' + dataTablesParameters.columns[2].search.value
        + '&battery=' + dataTablesParameters.columns[3].search.value;
        this.dtElements.first.dtInstance.then((dtInstance1: DataTables.Api) => {
          const selectedPage = dtInstance1.page.info().page;
          query += '&page=' + selectedPage
                + '&size=' + dataTablesParameters.length;

          this.data.getAllPhones(query).subscribe(response => {
            callback({
              recordsTotal: response.totalElements,
              recordsFiltered: response.totalElements,
              data: []
            });
            this.phones = response.content;
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
          });
        });
      },
      columns: [
        {orderable: false},
        {orderable: false},
        {orderable: false},
        {orderable: false},
        {width: '100px', orderable: false}
      ]
    };
    this.dtTrigger[0] = new Subject<any>();
    setTimeout(() => {
      this.dtTrigger[0].next();
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  selectPhone(phone: Phone) {
    this.dialogRef.close(phone);
  }

}
