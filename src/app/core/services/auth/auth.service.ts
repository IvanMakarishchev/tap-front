import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { EndPoints } from '../../enums/endpoints';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { Login, UserResponseData } from '../../interfaces/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<UserResponseData | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(loginData: Login): Observable<UserResponseData | null> {
    return this.http
      .post<UserResponseData>(environment.apiUrl + EndPoints.LogIn, loginData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .pipe(
        tap((user: UserResponseData) => this.userSubject.next(user)),
        catchError(() => {
          this.userSubject.next(null);
          return of(null);
        })
      );
  }

  fetchUser(): Observable<UserResponseData | null> {
    return this.http
      .get<UserResponseData>(environment.apiUrl + EndPoints.GetToken, {
        withCredentials: true,
      })
      .pipe(
        tap((user: UserResponseData) => {
          return this.userSubject.next(user);
        }),
        catchError(() => {
          this.userSubject.next(null);
          return of(null);
        })
      );
  }

  refreshToken(): Observable<UserResponseData | null> {
    return this.http
      .get<UserResponseData>(environment.apiUrl + EndPoints.RefreshToken, {
        withCredentials: true,
      })
      .pipe(
        tap((user: UserResponseData) => {
          return this.userSubject.next(user);
        }),
        catchError(() => {
          this.userSubject.next(null);
          return of(null);
        })
      );
  }

  get isLogged(): boolean {
    return !!this.userSubject.value;
  }

  logout() {
    this.http
      .post(
        environment.apiUrl + EndPoints.LogOut,
        {},
        { withCredentials: true }
      )
      .subscribe(() => this.userSubject.next(null));
  }
}
