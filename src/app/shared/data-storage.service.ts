import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient, private recipeService: RecipeService) { }

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://ng-test-c366c-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes).subscribe(res => {
      console.log(res);    
    })
  }
  fetchRecipes(){
    return this.http.get('https://ng-test-c366c-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      .pipe(
          map((recipes:any)=>{
            return recipes.map(recipe => {
              return {...recipe, ingredients: recipes.ingredients ? recipes.ingredients : []
              }
            })
          }), tap((recipes:any) => {
            this.recipeService.setRecipes(recipes)
          }))
  }
}
