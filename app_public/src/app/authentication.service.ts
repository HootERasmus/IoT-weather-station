import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { 
    this.redirectUrl = '';
  }

  @Output() logInChanged: EventEmitter<boolean> = new EventEmitter();
  
  private apiBaseUrl = 'https://workoutmegacorp.herokuapp.com/api/';
  private localStorage = "megacorpworkout";

  public register(user: User, callback: (r: boolean) => any): void{
    const url = `${this.apiBaseUrl}/register`;
    user.email = user.email.toLowerCase();
    this.http.post<any>(url, user).subscribe(data => {
      this.saveToken(data.token);
      this.logInChanged.emit(this.isLoggedIn());
      this.redirectToUrl();
      callback(true);
    },
      // Errors will call this callback instead:
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
        callback(false);
      });
  }

  public login(user: User, callback: (r: boolean) => any): void {
    
      const url = `${this.apiBaseUrl}/login`;
      user.email = user.email.toLowerCase();
      this.http.post<any>(url, user).subscribe(data => {
        this.saveToken(data.token);
        this.logInChanged.emit(this.isLoggedIn());
        callback(true);
      },
        // Errors will call this callback instead:
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          }
          console.log("authenticationService: login = ", false);
          callback(false);
        });
    }      
  

  public logout(){
    window.localStorage.removeItem(this.localStorage);
    this.logInChanged.emit(this.isLoggedIn());
  }

  public currentUser(): User {
    if (this.isLoggedIn()) {
      const token = this.getToken();
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      const user = new User();
      user.email = payload.email;
      user.name = payload.name;
      return user;
    } else {
      return;
    }
  }

  public isLoggedIn() {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public redirectUrl: string;
  
  public getToken() {
    if (window.localStorage.getItem(this.localStorage)) {
      return window.localStorage.getItem(this.localStorage);
    } else {
      return '';
    }
  }

  private saveToken(token: string) {
    window.localStorage.setItem(this.localStorage, token);
  }

  public redirectToUrl(): void {
    this.router.navigate([`${this.redirectUrl}`]);
  }
}
