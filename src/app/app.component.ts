import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

// showPage: string = 'recipe';
// title:string = 'recip\'App'
constructor(private authService:AuthService){}
// onEmitNavigate(to:string){
//   this.showPage = to; 
// }

ngOnInit(): void {
  this.authService.autoLogin();
}

}
