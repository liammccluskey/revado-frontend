import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api-service.service';
import { AuthService } from './auth-service.service';
import { catchError, Observable, tap, throwError } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  private api = inject(ApiService);
  private auth = inject(AuthService);

  private todos = signal<Todo[]>([]);
  private loadingTodos = signal<boolean>(true);
  private loadingPostTodo = signal<boolean>(false);

  fetchTodos(): Observable<Todo[]> {
    return this.api.get<Todo[]>(`todos/user/${this.auth.getCurrentUserId()}`).pipe(
      tap(todos => {
        this.todos.set(todos);
        this.loadingTodos.set(false);
      }),
      catchError(err => {
        this.loadingTodos.set(false);
        return throwError(() => err);
      })
    )
  }

  postTodo(todoRequest: TodoRequest): Observable<Todo> {
    return this.api.post<Todo>(`todos`, todoRequest).pipe(
      tap(todo => {

      })
    )
  }

  getTodos(): Todo[] {
    return this.todos();
  }

  getLoadingTodos(): boolean {
    return this.loadingTodos();
  }
}
