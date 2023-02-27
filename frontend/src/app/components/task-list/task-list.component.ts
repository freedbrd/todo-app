import { Component, Input } from '@angular/core';
import { ITodo } from '../../interfaces/todo.interface';
import { Observable } from 'rxjs';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  todoList$: Observable<ITodo[]> = this.todoService.todoList$;

  constructor(
    private todoService: TodoService,
  ) {
  }
}
