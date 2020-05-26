import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { UserService } from '../user-service';
import { EncryptService } from '../encrypt-service';
import { LoadingService } from '../loading-service';

@Component({
  selector: 'app-relogin',
  templateUrl: './relogin.component.html',
  styleUrls: ['./relogin.component.scss']
})
export class ReloginComponent implements OnInit {

  constructor( private data: DataService, private encryptService: EncryptService,
    public dialog: MatDialog, private router: Router, private userService: UserService,
    private app: AppComponent,  public dialogRef: MatDialogRef<ReloginComponent>, private loadingService: LoadingService) { }

  userInput = new FormControl( '', [
    Validators.required
  ]);

  passInput = new FormControl( '', [
    Validators.required
  ]);

  showBar = false;

  ngOnInit() {

    const userInput = document.getElementById('userInput');
    const passInput = document.getElementById('passInput');

    userInput.addEventListener('keyup', function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById('loginBtn').click();
      }
    });

    passInput.addEventListener('keyup', function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById('loginBtn').click();
      }
    });

  }

  login() {
    if (this.userInput.valid && this.passInput.valid) {
      this.app.progressStart(false);
      this.showBar = true;
      this.data.authenticate(this.userInput.value, this.passInput.value).subscribe(response => {
        this.userService.setDecryptedUser(this.userInput.value);
        localStorage.setItem('user', this.encryptService.encrypt(this.userInput.value));
        this.dialogRef.close(response);
      }, error => {
        this.showBar = false;
        this.loadingService.finishProgress(false);
      });
    } else {
      if (!this.userInput.valid) {
        this.userInput.markAsTouched();
        this.userInput.setErrors({'required': true});
      }
      if (!this.passInput.valid) {
        this.passInput.markAsTouched();
        this.passInput.setErrors({'required': true});
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
