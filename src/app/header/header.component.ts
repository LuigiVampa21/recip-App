import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() navigate = new EventEmitter<string>();
  navigateTo: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  onNavigateToRecipe(){
    this.navigateTo = 'recipe'
    this.navigate.emit(this.navigateTo);
  }
  onNavigateToShoppingList(){
    this.navigateTo = 'shopping'
    this.navigate.emit(this.navigateTo);
  }

}
