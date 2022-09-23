import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
 private recipes: Recipe[] = [
    new Recipe('The Test Recipe', 'This is a test', 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
    new Recipe('The Test Recipe', 'This is a test', 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
  ];
  constructor() { }

  getRecipes(){
    return this.recipes.slice();
  }
}
