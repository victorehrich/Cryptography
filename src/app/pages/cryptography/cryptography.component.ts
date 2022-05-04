import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CryptographyService } from 'src/app/services/cryptography.service';

@Component({
  selector: 'app-cryptography',
  templateUrl: './cryptography.component.html',
  styleUrls: ['./cryptography.component.scss']
})
export class CryptographyComponent implements OnInit {

  encryptForm!:FormGroup

  showField:{
    field:string,
    show:boolean}[]=[
      {field:"text",show:false},
      {field:"key",show:true},
      {field:"Iv",show:true},
      {field:"EncryotedText",show:false},
      {field:"DecryotedText",show:false}]

  constructor(
    private fb:FormBuilder,
    private cryptographyService:CryptographyService
    ) {}

  ngOnInit(): void {
    this.createForm()
    this.encryptForm.controls['key'].setValue(this.cryptographyService.getKey())
    this.encryptForm.controls['Iv'].setValue(this.cryptographyService.getIv())
  }
  createForm(){
    this.encryptForm = this.fb.group({
      text:
      [
        {value:'',disabled:false},
        Validators.compose([Validators.required])
      ],
      key:
      [
        {value:'',disabled:false},
        Validators.compose([Validators.required,Validators.minLength(32)])
      ],
      Iv:
      [
        {value:'',disabled:false},
        Validators.compose([Validators.required,Validators.minLength(16)])
      ],
      EncryotedText: [
        {value:'',disabled:false},
        Validators.compose([])
      ],
      DecryotedText: [
        {value:'',disabled:false},
        Validators.compose([])
      ],
    })
  }

  generateKey(){
    this.cryptographyService.generateKey()
    this.encryptForm.controls['key'].setValue(this.cryptographyService.getKey())
  }

  generateIv(){
    this.cryptographyService.generateIv()
    this.encryptForm.controls['Iv'].setValue(this.cryptographyService.getIv())
  }
  encryptText(){
    this.encryptForm.controls['EncryotedText'].setValue(this.cryptographyService.encryptAESfunction(this.encryptForm.controls['text'].value))
  }
  decryptText(){
    this.encryptForm.controls['DecryotedText'].setValue(this.cryptographyService.decryptAESfunction(this.encryptForm.controls['EncryotedText'].value))
  }

  showFormValue(input:string){
    return this.encryptForm.controls[input].value
  }

  clickToShowHide(field:string){
    this.showField.map(key=>{
      if(key.field == field)
        key.show = !key.show
    })
  }

  wasToshoW(field:string):boolean{
    let fieldTemp:string[] = []
    let showTemp:boolean[] = []

    this.showField.map(keys=>{
      fieldTemp.push(keys.field)
      showTemp.push(keys.show)
    })

    return showTemp[fieldTemp.indexOf(field)]
  }
}
