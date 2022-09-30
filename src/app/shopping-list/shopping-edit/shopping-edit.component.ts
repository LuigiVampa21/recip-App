import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingForm: NgForm;
  subscription:Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
   this.subscription = this.shoppingService.startedEditing
      .subscribe(
        (i:number) => {
          this.editedItemIndex = i;
          this.editMode = true;
          this.editedItem = this.shoppingService.getIngredient(i);
          this.shoppingForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
    })
  }
  
  onAddItem(f:NgForm){
    const value = f.value;
    const newIngredient = new Ingredient(value.name, value.amount)
    if(this.editMode){
      this.shoppingService.updateIngredient(this.editedItemIndex,newIngredient)
    } else{
      this.shoppingService.onNewIngredients(newIngredient);
    }
    this.shoppingForm.resetForm();
    this.editMode = false;
  }

  onResetForm(){
    this.shoppingForm.resetForm();
    this.editMode = false;
  }

  onDeleteItem(){
    this.onResetForm();
    if(!this.editMode)return;
      console.log(this.editedItemIndex);
      this.shoppingService.deleteItem(this.editedItemIndex);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
