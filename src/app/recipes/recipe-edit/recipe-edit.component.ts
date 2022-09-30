import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  constructor(private activatedRoute: ActivatedRoute, private recipeSerice: RecipeService, private router: Router) { }

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
    if(this.editMode){
      this.recipeSerice.updateRecipe(this.id, this.recipeForm.value);
    }else{
      this.recipeSerice.addRecipe(this.recipeForm.value)
    }
    // this.recipeForm.reset();
    this.onCancel()
  }

  onAddIngredients(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(),
        'amount': new FormControl(),
      })
    )
  }
  onCancel(){
    // this.recipeForm.reset();
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }
  onDeleteIngredient(i:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i)
  }
}