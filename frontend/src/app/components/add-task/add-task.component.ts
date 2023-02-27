import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  formControl = new FormControl('', [Validators.required]);

  constructor(
    private todoService: TodoService,
  ) {
  }

  addTask() {
    const title = this.formControl.value;
    this.formControl.reset();

    this.todoService.addTodo({
      title,
    }).subscribe();
  }
}
