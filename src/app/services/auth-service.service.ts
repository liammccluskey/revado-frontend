import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from './api-service.service';
import { Observable, tap, switchMap } from 'rxjs';
import { Router } from '@angular/router';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegistrationRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginResponse {
  token: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = inject(ApiService);
  private router = inject(Router);
  private token = signal<string | null>(localStorage.getItem('jwt') || null);
  private currentUser = signal<User | null>(null);

  constructor() {
    if (this.token()) {
      this.fetchCurrentUser().subscribe({
        error: () => this.logout()
      });
    }
  }

  private setToken(token: string | null) {
    this.token.set(token);
    if (token) {
      localStorage.setItem('jwt', token);
    } else {
      localStorage.removeItem('jwt');
    }
  }

  fetchCurrentUser(): Observable<User> {
    return this.api.get<User>('users/self').pipe(
      tap(user => this.currentUser.set(user))
    );
  }


  login(data: LoginRequest): Observable<User> {
    return this.api.post<LoginResponse>(`auth/login`, data).pipe(
      switchMap(res => {
        this.setToken(res.token);
        return this.fetchCurrentUser();
      })
    );
  }

  registerAndLogin(data: RegistrationRequest): Observable<User> {
    return this.api.post<User>('auth/register', data).pipe(
      switchMap(() => this.login(data))
    );
  }

  logout() {
    this.setToken(null);
    this.currentUser.set(null);
    this.router.navigate(['/login'])
  }

  getToken(): string | null {
    return this.token();
  }

  getIsLoggedIn(): boolean {
    return !!this.token() && !!this.currentUser();
  }
}
