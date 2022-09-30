import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientsSubscription: Subscription  = new Subscription();
  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(){
    this.ingredients = this.shoppingService.getShoppingList();
    this.ingredientsSubscription = this.shoppingService.ingredientsChanged.subscribe((ingredients: Ingredient[])=>{
        this.ingredients = ingredients;
    })    
  }

  onEditItem(i:number){
    this.shoppingService.startedEditing.next(i)
  }

  ngOnDestroy(){
    this.ingredientsSubscription.unsubscribe();
  }
}
