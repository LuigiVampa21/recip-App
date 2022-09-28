import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
 private recipes: Recipe[] = [
    new Recipe(
      'The Test Recipe',
      'This is a test',
      'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      [
        new Ingredient('test',1),
        new Ingredient('test',2),
        new Ingredient('test',3)
      ]
      ),
    new Recipe(
      'The Test Recipe', 
      'This is a test', 
      'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      [
        new Ingredient('test',4),
        new Ingredient('test',5),
        new Ingredient('test',6)
      ]
      )
  ];
  recipeSelected = new EventEmitter<Recipe>()
  constructor(private shoppingService: ShoppingService) { }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(id: number){
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingService.onAddNewIngredientsFromRecipe(ingredients)
  }
}
