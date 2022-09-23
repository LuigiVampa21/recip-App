import { Component, OnInit, Output } from '@angular/core';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @Output() newIngredients: {name:string, amount:number} = {name: '', amount: 0};
  
  constructor(private shoppingService: ShoppingService) { }
  ngOnInit(): void {
  }

  addRecipe(nameInput:string, amountInput:number){       
    this.newIngredients.name = nameInput;
    this.newIngredients.amount = +amountInput; 
    this.shoppingService.onNewIngredients(this.newIngredients);
  }
}
