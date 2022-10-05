import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap, take, exhaustMap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';



@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://ng-test-c366c-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes).subscribe(res => {
      console.log(res);    
    })
  }
  fetchRecipes(){
      return this.http.get<Recipe[]>('https://ng-test-c366c-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
    .pipe(
    map((recipes:any)=>{
      return recipes.map((recipe:Recipe) => {
        return {...recipe, ingredients: recipes.ingredients ? recipes.ingredients : []
        }
      })
    }), tap((recipes:any) => {
      this.recipeService.setRecipes(recipes)
    })
    )
  }
}
