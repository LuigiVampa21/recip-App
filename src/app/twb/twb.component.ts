import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-twb',
  templateUrl: './twb.component.html',
  styleUrls: ['./twb.component.css']
})
export class TwbComponent implements OnInit {
  userName: string = '';
  constructor() { }

  ngOnInit(): void {
  }
  onResetInput(){
    this.userName = '';
  }

}
