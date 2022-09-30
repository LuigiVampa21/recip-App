import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { string } from 'joi';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(private activatedRoute: ActivatedRoute, private recipeSerice: RecipeService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe((params:Params)=>{
        this.id = +params['id'];
        this.editMode = params['id'] != null;   
        this.initForm();    
      })
  }
  private initForm(){
    let recipeName = '';
    let recipeImage = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeSerice.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImage = recipe.imagePath;
      recipeDescription = recipe.description;
        if(recipe['ingredients']){
          for(let ing of recipe['ingredients']){
            console.log(ing);      
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ing.name),
                'amount': new FormControl(ing.amount),
              })
            )
          }
        }
    }

    this.recipeForm= new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImage),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients,
    })
  }

  onSubmit(){
  }

  onAddIngredients(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(),
        'amount': new FormControl(),
      })
    )
  }
}