import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthenticationService) {  }

  public user: User;
  public isLoggedIn: boolean = this.auth.isLoggedIn();

  public onLoginSubmit() {
    console.log('Check if user is valid');
    this.auth.login(this.user, result => {
      if(result){
        console.log('Loged in');
        // this.isLoggedIn = true;
        this.user = this.auth.currentUser();
      } else {
        console.log('not a valid user');
      }
    })
  }

  public logOut(){
    console.log('Logging out');
    this.auth.logout();
    if(!this.auth.isLoggedIn()){
      this.auth.redirectUrl = '';
      this.auth.redirectToUrl();
      console.log('Logged out');
    }
  }  

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
    if(this.auth.currentUser()){
      this.user = this.auth.currentUser();
    } else {
      this.user = new User();
    }
    this.auth.logInChanged.subscribe(isLoggedIn => {
      if(isLoggedIn){
        this.user = this.auth.currentUser();
      }      
      this.isLoggedIn = isLoggedIn
    });
  }
}
