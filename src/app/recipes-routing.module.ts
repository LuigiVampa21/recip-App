import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipes/recipe-resolver.service";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes/recipes.component";


const routes: Routes = [
    { path: 'recipes', component: RecipesComponent,canActivate: [AuthGuard], children: [
        {path: '', component: RecipeStartComponent},
        {path:'new',component: RecipeEditComponent},
        {path:':id',component: RecipeDetailComponent, resolve: [RecipeResolverService]},
        {path:':id/edit',component: RecipeEditComponent, resolve: [RecipeResolverService]}
      ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RecipesRoutingModule{}