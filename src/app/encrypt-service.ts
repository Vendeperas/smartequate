import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import * as CryptoJS from 'crypto-js';
@Injectable({
    providedIn: 'root'
})
  export class EncryptService {
    private encryptKey = environment.encryptKey;
    encrypt(valueToEncrypt: string) {
        const valueToEncryptCrypted = CryptoJS.enc.Base64.parse(btoa(valueToEncrypt));
        const ciphertext = CryptoJS.AES.encrypt(valueToEncryptCrypted, this.encryptKey, {
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return ciphertext.toString();
    }

    decrypt(valueToDecrypt: string) {
        const decryptedText = CryptoJS.AES.decrypt(valueToDecrypt, this.encryptKey, {
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        return decryptedText.toString(CryptoJS.enc.Utf8);
    }
}
