import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  language:any;
  constructor(private todoServcie:TodoService) { }

  ngOnInit() {
    this.getLanguage();
  }
  getLanguage(){
    this.language = this.todoServcie.isLanguage();
  }
}
