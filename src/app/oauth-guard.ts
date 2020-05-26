import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router/src/router_state';
import { SelectService } from './select-service';
import { EncryptService } from './encrypt-service';
import { UserService } from './user-service';

@Injectable()
export class OauthGuard implements CanActivate {

    constructor(private selectService: SelectService, private userService: UserService, private encryptService: EncryptService,
         private router: Router , private select: SelectService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.checkVariables()) {
           return true;
        } else {
            localStorage.clear();
            this.userService.setDecryptedUser('');
            this.router.navigateByUrl('/login');
            return false;
        }
    }

    checkVariables() {
        const accessToken = localStorage.getItem('accessToken');
        let accessTokenValid = false;

        const user = localStorage.getItem('user');
        let userValid = false;

        if (accessToken !== '' && accessToken !== null) {
            accessTokenValid = true;
        }

        if (user !== '' && user !== null) {
            const decryptedUser = this.encryptService.decrypt(user);
            if (decryptedUser !== '') {
                userValid = true;
                this.userService.setDecryptedUser(decryptedUser);
            }
        }

        const valid = accessTokenValid && userValid;

        if (valid) {
            this.userService.setUser(this.encryptService.decrypt(user));
        }
        return valid;
      }
}
