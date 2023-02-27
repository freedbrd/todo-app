import { Component, Input, OnInit } from '@angular/core';
import { ITodo } from '../../interfaces/todo.interface';
import { TodoService } from '../../services/todo.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Input() set todo(value: ITodo) {
    this.todoItem = value;
    this.checkboxControl.setValue(value.completed);
  }

  get todo(): ITodo {
    return this.todoItem;
  }

  checkboxControl = new FormControl();
  titleControl = new FormControl();

  isEdit = false;

  private todoItem: ITodo;

  constructor(
    private todoService: TodoService,
  ) {
  }

  ngOnInit() {
    this.onCheckboxChange();
  }

  toggleEdit() {
    this.isEdit = !this.isEdit;
    this.titleControl.setValue(this.todo.title);
  }

  editTitle() {
    const todo: ITodo = {...this.todo, title: this.titleControl.value};
    this.todoService.editTodo(todo).subscribe(() => this.isEdit = false);
  }

  remove() {
    this.todoService.deleteTodoById(this.todo.id).subscribe();
  }

  private onCheckboxChange() {
    this.checkboxControl.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(300),
      switchMap((completed: boolean) => {
        const todo: ITodo = {...this.todo, completed};
        return this.todoService.editTodo(todo);
      }),
      untilDestroyed(this),
    ).subscribe();
  }
}
