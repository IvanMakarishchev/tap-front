import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { EndPoints } from '../../enums/endpoints';
import { UserData } from '../../interfaces/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private auth: AuthService, private http: HttpClient) {}

  create(userData: UserData) {
    return this.http.post(
      environment.apiUrl + EndPoints.User,
      JSON.stringify(userData),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
