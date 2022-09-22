import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('The Test Recipe', 'This is a test', 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
    new Recipe('The Test Recipe', 'This is a test', 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
  ];
  @Output() onShowRecipe = new EventEmitter<Recipe>()
  recipeName: string = '';
  recipeDescription: string = '';
  recipeImagePath: string = '';
  @Output() recipeToShow: {name:string,description:string,imagePath:string}
  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(e:Recipe){
    this.onShowRecipe.emit(e)
  }
}
