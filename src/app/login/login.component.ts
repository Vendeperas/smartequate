import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AppComponent } from '../app.component';
import { FormControl, Validators } from '@angular/forms';
import { EncryptService } from '../encrypt-service';
import { UserService } from '../user-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private encryptService: EncryptService, private data: DataService,
    public dialog: MatDialog, private router: Router, private userService: UserService,
    private app: AppComponent) { }

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
      this.data.authenticate(this.userInput.value, this.passInput.value).subscribe( response => {
        localStorage.setItem('accessToken', response['token']);
        this.userService.setDecryptedUser(this.userInput.value);
        localStorage.setItem('user', this.encryptService.encrypt(this.userInput.value));
        this.showBar = false;
        this.app.progressFinish(false);
        this.router.navigateByUrl('/home');
      }, error => {
        this.app.showError('L\'usuari o la contrasenya son incorrectes. Siusplau, intenti-ho de nou.');
        this.app.progressFinish(false);
        this.showBar = false;
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

}
