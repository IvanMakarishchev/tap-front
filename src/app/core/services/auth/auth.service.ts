import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { EndPoints } from '../../enums/endpoints';
import {
  BehaviorSubject,
  catchError,
  finalize,
  Observable,
  of,
  tap,
} from 'rxjs';
import { Login, User, UserResponseData } from '../../interfaces/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<UserResponseData | null>(null);
  private isFetchingSubject = new BehaviorSubject<boolean>(true);
  private initialCheckDoneSubject = new BehaviorSubject<boolean>(false);

  user$ = this.userSubject.asObservable();
  isFetching$ = this.isFetchingSubject.asObservable();
  initialCheckDone$ = this.initialCheckDoneSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(loginData: Login): Observable<User | null> {
    return this.http
      .post<User>(environment.apiUrl + EndPoints.LogIn, loginData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .pipe(
        tap((user: User) => this.userSubject.next(user.user)),
        catchError(() => {
          this.userSubject.next(null);
          return of(null);
        })
      );
  }

  fetchUser(): Observable<UserResponseData | null> {
    this.isFetchingSubject.next(true);
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
        }),
        finalize(() => {
          this.isFetchingSubject.next(false);
          this.initialCheckDoneSubject.next(true);
        })
      );
  }

  refreshToken(): Observable<UserResponseData | null> {
    this.isFetchingSubject.next(true);
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
        }),
        finalize(() => {
          this.isFetchingSubject.next(false);
          this.initialCheckDoneSubject.next(true);
        })
      );
  }

  get isLogged(): boolean {
    return !!this.userSubject.value;
  }

  set updateUserSubject(data: UserResponseData) {
    this.userSubject.next(data);
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
