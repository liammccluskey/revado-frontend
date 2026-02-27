import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api-service.service';
import { AuthService } from './auth-service.service';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';

export interface Subtask {
  id: number;
  title: string;
  completed: boolean;
}

export interface SubtaskRequest {
  title: string;
  completed: boolean;
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string; // ISO string from backend
  subtasks: Subtask[];
}

export interface TodoRequest {
  title: string;
  description: string;
  completed: boolean;
}

export interface SuccessResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private api = inject(ApiService);
  private auth = inject(AuthService);

  todos = signal<Todo[]>([]);
  loadingTodos = signal<boolean>(true);
  loadingPostTodo = signal<boolean>(false);

  // Todos

  fetchTodos(): Observable<Todo[]> {
    return this.api.get<Todo[]>(`todos/user/${this.auth.getCurrentUserId()}`).pipe(
      tap(todos => {
        this.todos.set(todos);
        this.loadingTodos.set(false);
      }),
      catchError(err => {
        console.log('Error fetching todos')
        console.log(err)
        return throwError(() => err);
      }),
      finalize(() => {
        this.loadingTodos.set(false);
      })
    )
  }

  postTodo(todoRequest: TodoRequest): Observable<Todo> {
    this.loadingPostTodo.set(true)
    return this.api.post<Todo>(`todos`, todoRequest).pipe(
      tap(todo => {
        this.todos.set([...this.todos(), todo])
      }),
      catchError(err => {
        console.log('Error posting todos');
        console.log(err);
        return throwError(() => err);
      }),
      finalize(() => {
        this.loadingPostTodo.set(false);
      })
    )
  }

  patchTodo(todoRequest: TodoRequest, todoId: number): Observable<Todo> {
    return this.api.patch<Todo>(`todos/${todoId}`, todoRequest).pipe(
      tap(todo => {
        this.todos.set(this.todos().map(t => 
          t.id === todoId ? todo : t
        ))
      }),
      catchError(err => {
        console.log('Error patching todo');
        console.log(err);
        return throwError(() => err);
      })
    )
  }

  deleteTodo(todoId: number): Observable<SuccessResponse> {
    return this.api.delete<SuccessResponse>(`todos/${todoId}`).pipe(
      tap(res => {
        console.log(res.message)
        this.todos.set(this.todos().filter(t => t.id != todoId))
      }),
      catchError(err => {
        console.log('Error patching todo');
        console.log(err);
        return throwError(() => err);
      })
    )
  }

  // Subtasks

  postSubtask(subtaskRequest: SubtaskRequest, todoId: number): Observable<Todo> {
    this.loadingPostTodo.set(true)
    return this.api.post<Todo>(`subtasks/todo/${todoId}`, subtaskRequest).pipe(
      tap(todo => {
        this.todos.set(this.todos().map(t => 
          t.id == todo.id ? todo : t
        ))
      }),
      catchError(err => {
        console.log('Error posting subtask');
        console.log(err);
        return throwError(() => err);
      })
    )
  }

  patchSubtask(subtaskRequest: SubtaskRequest, subtaskId: number): Observable<Todo> {
    return this.api.patch<Todo>(`subtasks/${subtaskId}`, subtaskRequest).pipe(
      tap(todo => {
        this.todos.set(this.todos().map(t => 
          t.id === todo.id ? todo : t
        ))
      }),
      catchError(err => {
        console.log('Error patching subtask');
        console.log(err);
        return throwError(() => err);
      })
    )
  }

  deleteSubtask(subtaskId: number, todoId: number): Observable<SuccessResponse> {
    return this.api.delete<SuccessResponse>(`todos/${todoId}`).pipe(
      tap(res => {
        console.log(res.message)
        this.todos.set(this.todos().map(t => 
          t.id != todoId ? t :
            {
              ...t,
              subtasks: t.subtasks.filter(subtask => subtask.id != subtaskId)
            }
        ))
      }),
      catchError(err => {
        console.log('Error deleting subtask');
        console.log(err);
        return throwError(() => err);
      })
    )
  }
}
