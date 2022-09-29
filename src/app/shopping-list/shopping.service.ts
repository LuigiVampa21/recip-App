import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  ingredientsChanged = new Subject<Ingredient[]>()
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  constructor() { }

  getShoppingList(){
    return this.ingredients.slice();
  }

  onNewIngredients(ingredient: Ingredient){
    this.ingredients.push(ingredient) 
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  onAddNewIngredientsFromRecipe(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice())
  }
}
