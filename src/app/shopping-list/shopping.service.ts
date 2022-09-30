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
  startedEditing = new Subject<number>();
  constructor() { }

  getShoppingList(){
    return this.ingredients.slice();
  }

  getIngredient(i:number){
    return this.ingredients[i];
  }

  onNewIngredients(ingredient: Ingredient){
    this.ingredients.push(ingredient); 
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  onAddNewIngredientsFromRecipe(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(i: number, newIngredient: Ingredient){
    this.ingredients[i] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
