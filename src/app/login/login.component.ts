import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { UserLogin } from '../models/userLogin';
import { User } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userLogin: UserLogin;
  public isLoggedIn: boolean;
  private user: User;

  constructor(private auth: AuthenticationService) { 
    this.isLoggedIn = auth.isLoggedIn();
    this.userLogin = new UserLogin();

    if(this.isLoggedIn){
      this.user = auth.getUser();
      this.userLogin.email = this.user.email;
    } 

    this.auth.logInChanged.subscribe(isLoggedIn => {
      if(isLoggedIn){
        this.user = auth.getUser();
        this.userLogin.email = this.user.email;
      }      
      this.isLoggedIn = isLoggedIn
    });
  }

  public onLoginSubmit() {
    this.auth.login(this.userLogin.email, this.userLogin.password);
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  public logOut() {
    this.auth.logOut();
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  ngOnInit() {
  }

}
