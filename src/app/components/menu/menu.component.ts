import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private serviceMenu:TodoService) { }
  public menus:Todo[];
  language:any ="TH";
  ngOnInit() {
    this.serviceMenu.getMenu().subscribe((response)=>{
      this.menus = response;
    });
  }

  
}

interface Todo{
  menu_id:number;
  menu_name:string;
  menu_detail:string;
  menu_route:string;
  menu_type:string;
  menu_sort:string;
}
