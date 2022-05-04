import { Injectable } from '@angular/core';
import * as Crypto from 'crypto-js'

@Injectable({
  providedIn: 'root'
})
export class CryptographyService {

  private Key:string = Crypto.lib.WordArray.random(32).toString()
  private Iv:string = Crypto.lib.WordArray.random(16).toString()

  constructor() {
    this.Key = Crypto.lib.WordArray.random(32).toString()
    this.Iv = Crypto.lib.WordArray.random(16).toString()

   }

  setIv(Iv:string){
    this.Iv = Iv
  }

  getIv(){
    return this.Iv
  }

  setKey(Key:string){
    this.Key = Key
  }

  getKey(){
    return this.Key
  }

  generateKey(){
    this.setKey(Crypto.lib.WordArray.random(32).toString()) 
  }

  generateIv(){
    this.setIv(Crypto.lib.WordArray.random(16).toString()) 
  }

  encryptAESfunction(objToEncrypt:string){
    return Crypto.AES.encrypt(objToEncrypt,this.Key,{
      keySize: 128/8,
      iv:Crypto.enc.Utf8.parse(this.Iv),
      padding:Crypto.pad.Pkcs7,
      mode:Crypto.mode.CBC
    }).toString()
  }

  decryptAESfunction(cipheToDecrypt:string){
    return Crypto.AES.decrypt(cipheToDecrypt, this.Key,{
      keySize: 128/8,
      iv:Crypto.enc.Utf8.parse(this.Iv),
      padding:Crypto.pad.Pkcs7,
      mode:Crypto.mode.CBC
    }).toString(Crypto.enc.Utf8)
  }
}
