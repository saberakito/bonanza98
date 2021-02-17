import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-barcara',
  templateUrl: './barcara.component.html',
  styleUrls: ['./barcara.component.css']
})


export class barcaraComponent {
  constructor(private router:Router, private loginService: TodoService){}
  public username;
  public password;

  infoMessage = '';
  ngOnInit() {
    if(localStorage.getItem("login")=="success"){
     // this.router.navigate(['/home']);
    }
  }

}

