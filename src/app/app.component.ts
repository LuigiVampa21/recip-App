import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
showPage: string = '';
title:string = 'recip\'App'
constructor(){
}
onEmitNavigate(to:string){
  this.showPage = to; 
}

}
