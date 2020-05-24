import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Phone } from '../model/phone';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public phone: Phone) { }


  phoneInfo: Phone;

  ngOnInit() {
    this.phoneInfo = this.phone;
  }


  onNoClick() {
    this.dialogRef.close();
  }
}
