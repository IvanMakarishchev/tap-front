import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { catchError, map, Observable, of } from 'rxjs';
import { EndPoints } from '../enums/endpoints';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.fetchUser().pipe(
      map((user) => {
        if (user) {
          return true;
        } else {
          this.router.navigate([EndPoints.LogIn]);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate([EndPoints.LogIn]);
        return of(false);
      })
    );
  }
}
