import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('The Test Recipe', 'This is a test', 'https://pixabay.com/fr/photos/pizza-tranches-cuisine-italienne-329523/')
  ];
  recipeName: string = '';
  recipeDescription: string = '';
  recipeImagePath: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  onShowRecipe(){
    const recipe = this.recipes[0];
    this.recipeName = recipe.name;
    this.recipeDescription = recipe.description;
    this.recipeImagePath = recipe.imagepath;
  }

}
