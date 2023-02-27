import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ITodo } from '../interfaces/todo.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todoList$ = new BehaviorSubject<ITodo[]>([]);

  constructor(
    private http: HttpClient,
  ) {
  }

  getTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(`${environment.apiUrl}/todos`).pipe(
      tap(todos => this.todoList$.next(todos)),
    );
  }

  addTodo(todo: {title: string}): Observable<ITodo> {
    return this.http.post<ITodo>(`${environment.apiUrl}/todos`, todo).pipe(
      tap((newTodo: ITodo) => {
        this.todoList$.next([...this.todoList$.value, newTodo]);
      }),
    );
  }

  editTodo(todo: ITodo): Observable<ITodo> {
    return this.http.put<ITodo>(`${environment.apiUrl}/todos/${todo.id}`, todo).
      pipe(
        tap(() => {
          const todos = this.todoList$.value;
          const index = todos.findIndex(t => t.id === todo.id);
          todos[index] = todo;
          this.todoList$.next(todos);
        }),
      );
  }

  deleteTodoById(id: number): Observable<ITodo> {
    return this.http.delete<ITodo>(`${environment.apiUrl}/todos/${id}`).pipe(
      tap(() => {
        const todos = this.todoList$.value;
        const index = todos.findIndex(t => t.id === id);
        todos.splice(index, 1);
        this.todoList$.next(todos);
      }),
    );
  }
}
