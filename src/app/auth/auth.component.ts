import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
// import { __values } from 'tslib';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error:string = null;

  constructor(private authService: AuthService, private router:Router, private componentFactoryresolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(f:NgForm){
    if(!f.valid) return;
    const email = f.value.email;
    const password = f.value.password;
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;
    if(this.isLoginMode){
     authObs = this.authService.login(email,password)
    }else{
      authObs = this.authService.signUp(email,password)      
      };
      authObs.subscribe(resdata => {
        this.isLoading = false;  
        this.router.navigate(['/recipes']) 
      },errorMessage => {
        this.error = errorMessage;    
        this.isLoading = false;
        this.showErrorAlert(errorMessage);
      f.reset()
    })
}
onHandleError(){
  this.error = null;
}

private showErrorAlert(err:string){
  // const alertComponent = new AlertComponent()
 const alertComponentFactory = this.componentFactoryresolver.resolveComponentFactory(AlertComponent);
}
}
