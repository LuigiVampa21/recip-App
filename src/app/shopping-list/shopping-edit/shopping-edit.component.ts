import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @Output() onSendNewRecipe = new EventEmitter<object>()
  @Output() newIngredients: {name:string, amount:number} = {name: '', amount: 0};
  
  constructor() { }
  ngOnInit(): void {
  }

  addRecipe(nameInput:string, amountInput:number){       
    this.newIngredients.name = nameInput;
    this.newIngredients.amount = +amountInput; 
    this.onSendNewRecipe.emit(this.newIngredients)
  }
}
