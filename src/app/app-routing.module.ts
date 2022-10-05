import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from './error-page/error-page.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {path: '', redirectTo: 'recipes', pathMatch: 'full'},
  { path: 'recipes', component: RecipesComponent,canActivate: [AuthGuard], children: [
      {path: '', component: RecipeStartComponent},
      {path:'new',component: RecipeEditComponent},
      {path:':id',component: RecipeDetailComponent, resolve: [RecipeResolverService]},
      {path:':id/edit',component: RecipeEditComponent, resolve: [RecipeResolverService]}
    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent, children: [
    {path: 'shopping-edit', component: ShoppingEditComponent}
  ] },
  {path: 'auth', component: AuthComponent},
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }