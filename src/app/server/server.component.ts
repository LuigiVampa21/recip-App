import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  serverID: number = 10;
  serverName: string = ''
  serverStatus: string = "Offline";
  serverCreationStatus: string = 'No server was created';
  pVisible : boolean = false;
  clickArray: (string|number)[] = [];
  i: number = 0;

  constructor(){
    this.serverStatus = Math.random() > 0.5 ? 'Online' : 'Offline';
  }

  getServerStatus(): string{
    return this.serverStatus
  }

  ngOnInit(): void {
  }

  onUpdateServerName(event:Event){
    console.log(event.target);
  }

  turnPvisible(){
    if(this.pVisible) this.pVisible = false;
    else if(!this.pVisible){ 
      this.pVisible = true;
      this.i += 1;
      this.onClickArray()
    };
    ;
  }
  onClickArray(){
    this.clickArray = [...this.clickArray, this.i];
  }
}
