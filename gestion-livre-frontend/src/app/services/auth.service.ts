import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environements/environement';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = environment.apiUrl + '/auth';
  private readonly currentUserSubject = new BehaviorSubject<User | null>(
    this.getUserFromStorage()
  );
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  login(credentials: {
    email: string;
    password: string;
  }): Observable<{ token: string; user: User }> {
    return this.http
      .post<{ token: string; user: User }>(
        `${this.baseUrl}/signin`,
        credentials
      )
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.currentUserSubject.next(res.user);
        })
      );
  }

  logout(): void {
    localStorage.clear();
    this.currentUserSubject.next(null);
  }

  getUserFromStorage(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
