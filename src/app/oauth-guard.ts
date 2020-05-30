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
           console.log('Es permet accedir a la ruta: ' + route.url);
           return true;
        } else {
            console.log('Denegat l\'accés a la ruta: ' + route.url);
            localStorage.clear();
            this.userService.setDecryptedUser('');
            this.router.navigateByUrl('/login');
            return false;
        }
    }

    checkVariables() {
        console.log('Mirant les variables de localStorage...');
        const accessToken = localStorage.getItem('accessToken');
        let accessTokenValid = false;

        const user = localStorage.getItem('user');
        let userValid = false;

        if (accessToken !== '' && accessToken !== null) {
            console.log('Existeix accessToken...');
            accessTokenValid = true;
        }

        if (user !== '' && user !== null) {
            const decryptedUser = this.encryptService.decrypt(user);
            if (decryptedUser !== '') {
                userValid = true;
                console.log('Existeix usuari valid...');
                this.userService.setDecryptedUser(decryptedUser);
            }
        }

        const valid = accessTokenValid && userValid;

        if (valid) {
            this.userService.setUser(this.encryptService.decrypt(user));
        }

        console.log('Resultat de validació de les variables: ' + valid);
        return valid;
      }
}
