import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: {name: string, description: string, imagePath: string, ingredients: Ingredient[]};

  constructor(private recipeService : RecipeService) { }

  ngOnInit(): void {   
  }
  onClickItem(){
    this.recipeService.recipeSelected.emit(this.recipe)
  }
}
