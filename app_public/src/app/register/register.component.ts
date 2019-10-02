import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PasswordValidation } from '../validation';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthenticationService, private fb: FormBuilder) { 
    this.createRegisterForm(this.fb);
  }

  public isSubmited: boolean = false;
  public user: User;
  public registerForm: FormGroup;
  public isLoggedIn: boolean;

  ngOnInit() {
    this.user = new User();
  }

  public onSubmit(){
    this.isSubmited = true;
    if(this.registerForm.valid){
      this.user.name = this.registerForm.controls['name'].value;
      this.user.email = this.registerForm.controls['email'].value;
      this.user.password = this.registerForm.controls['password'].value;  
      
      this.auth.logout();
      this.auth.register(this.user, result => {
        if(result){
          console.log('registed');
        }
      })
    }
    
    console.log(this.user)
  }

  get f() { return this.registerForm.controls; }

  private createRegisterForm(fb: FormBuilder) {
    this.registerForm = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    }, {
        validator: PasswordValidation.MatchPassword
      });
  }

}
