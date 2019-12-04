import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from  'firebase/app';
import { Router } from  "@angular/router";
import { EmailValidator } from '@angular/forms';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private user: User;

  @Output() logInChanged: EventEmitter<boolean> = new EventEmitter();

  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        console.log(this.getUser());
      } else {
        localStorage.setItem('user', null);
      }
    })
   }

  public async login(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password)
      this.logInChanged.emit(this.isLoggedIn());
    } catch (e) {
      alert("Error!" + e.message);
    }
  }

  public async logOut() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.logInChanged.emit(this.isLoggedIn());
  }

  public isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }

  public getUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  public redirectUrl: string;
}
