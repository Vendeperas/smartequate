import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Phone } from '../model/phone';
import { DataService } from '../data-service';
import { UserService } from '../user-service';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public phone: Phone, private data: DataService, private userService: UserService) { }

  liked = false;
  phoneInfo: Phone;

  ngOnInit() {
    this.phoneInfo = this.phone;
    console.log(this.phoneInfo);
    const user = this.userService.getDecryptedUser();
    this.data.checkIfLiked(this.phoneInfo['phone'].id, user).subscribe(response => {
      this.liked = response;

    });
  }

  like() {
    const user = this.userService.getDecryptedUser();
    this.data.likePhone(this.phoneInfo['phone'].id, user).subscribe(() => {
      this.data.checkIfLiked(this.phoneInfo['phone'].id, user).subscribe(response => {
        this.liked = response;
      });
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  cancelLike() {
    const user = this.userService.getDecryptedUser();
    this.data.unlikePhone(this.phoneInfo['phone'].id, user).subscribe(() => {
      this.data.checkIfLiked(this.phoneInfo['phone'].id, user).subscribe(response => {
        this.liked = response;
      });
    });
  }
}
