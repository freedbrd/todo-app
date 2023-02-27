import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Observable } from 'rxjs';
import { ITodo } from './interfaces/todo.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private todoService: TodoService,
  ) {
  }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe();
  }
}
