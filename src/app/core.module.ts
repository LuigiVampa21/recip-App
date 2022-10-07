import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterecptorService } from "./auth/auth-interceptor.service";
import { RecipeService } from "./recipes/recipe.service";
import { ShoppingService } from "./shopping-list/shopping.service";

@NgModule({
    imports: [],
    exports: [],
    providers: [ShoppingService, RecipeService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterecptorService, multi: true}],
})

export class CoreModule {}