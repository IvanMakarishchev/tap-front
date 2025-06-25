import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { EndPoints } from '../../enums/endpoints';
import { UserResponseData, UserData } from '../../interfaces/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  create(userData: UserData) {
    return this.http.post(
      environment.apiUrl + EndPoints.Register,
      JSON.stringify(userData),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  updateUser(id: number, userData: Omit<UserData, 'password'>): Observable<UserResponseData> {
    return this.http.put<UserResponseData>(
      environment.apiUrl + EndPoints.User + `/${id}`,
      JSON.stringify(userData),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
  }
}
