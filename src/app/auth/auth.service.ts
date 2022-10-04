import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, throwError, tap } from 'rxjs';
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

  user = new Subject<User>()

  constructor(private http: HttpClient) { }

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
      this.user.next(user)
  }
}


