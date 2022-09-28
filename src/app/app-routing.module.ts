import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from './error-page/error-page.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
    {path: '', redirectTo: 'recipes', pathMatch: 'full'},
  { path: 'recipes', component: RecipesComponent, children: [
    {path:'recipe-list', component: RecipeListComponent, children: [
        {path:'recipe-item/:id',component: RecipeItemComponent}
    ]},
    {path: 'recipe-detail', component: RecipeDetailComponent}
  ] },
  { path: 'shopping-list', component: ShoppingListComponent, children: [
    {path: 'shopping-edit', component: ShoppingEditComponent}
  ] },
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }