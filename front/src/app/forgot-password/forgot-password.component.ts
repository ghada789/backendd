import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public forgotpasswordForm: FormGroup;


  constructor(builder: FormBuilder) {
    
    let forgotpasswordControls = {
      email:new FormControl("",[Validators.required,Validators.email]),
     
     
     
    }
  
  this.forgotpasswordForm = builder.group(forgotpasswordControls)
  
  }
get email() { return this.forgotpasswordForm.get('email') }
ngOnInit(): void {
}
forgotpasswordUser(){
  console.log(this.forgotpasswordForm.value)
}
}
