import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingEditComponent } from "./shopping-list/shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";


const routes: Routes = [
    { path: 'shopping-list', component: ShoppingListComponent, children: [
        {path: 'shopping-edit', component: ShoppingEditComponent}
      ] },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ShoppingRoutingModule{}