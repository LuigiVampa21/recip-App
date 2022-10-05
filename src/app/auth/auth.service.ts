import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, BehaviorSubject, throwError, tap } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId:string;
  registered?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null)
  // token: string = null;
  private tokenExpirationTimer: any; 

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email:string, password:string){
   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDEGRY3q0FOHpcqqrPuS0MQOt5A-FG0ad4', {email, password, returnSecureToken: true})
    .pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }))

}


  login(email:string, password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDEGRY3q0FOHpcqqrPuS0MQOt5A-FG0ad4', {email, password, returnSecureToken: true})
      .pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
      }))
  }

  private handleError(err:HttpErrorResponse){
    let errorMessage = 'An error occured!'
      if(!err.error.error.message) return throwError(errorMessage);
      switch(err.error.error.message){
        case 'EMAIL_EXISTS':
          errorMessage = 'Sorry this email already exists';    
        break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'Sorry this email was not found';    
        break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Wrong password';    
        break;
      }
      return throwError(errorMessage)
  }

  private handleAuthentication(email:string, userID:string, token:string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
      const user = new User(email, userID, token, expirationDate);
      this.user.next(user);
      this.autoLogout(expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user));
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  autoLogout(expirationDuration:number){
    this.tokenExpirationTimer = setTimeout(()=>{
      this.logout()
    }, expirationDuration)
    // }, 2000)
  }

  autoLogin(){
    const userData:{
      email: string;
      id: string;
      _token:string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData)return;
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration)
    }
  }
}


