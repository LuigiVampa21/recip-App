import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Output() recipeSelected = new EventEmitter<void>()
  @Input() recipe: {name: string, description: string, imagePath: string};
  // @Output() imagePath:string = '';
  constructor() { }

  ngOnInit(): void {   
  }
  onClickItem(e:any){
    this.recipeSelected.emit()
  }

}
