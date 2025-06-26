import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { EndPoints } from '../../enums/endpoints';
import { catchError, Observable, of, tap } from 'rxjs';
import {
  PetData,
  UserAppointments,
  userPet,
  UserResponseData,
} from '../../interfaces/common';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserRequestsService {
  constructor(private http: HttpClient) {}

  getUserAppointments(): Observable<Array<UserAppointments>> {
    return this.http
      .get<Array<UserAppointments>>(
        environment.apiUrl + EndPoints.Appointments,
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap((appointments) => {
          return of(appointments);
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  mergeUnauthorizedAppointments(): Observable<any> {
    return this.http.post(
      environment.apiUrl + EndPoints.MergeAppointments,
      JSON.stringify({}),
      { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    );
  }

  addNewUserPet(petData: PetData): Observable<userPet> {
    return this.http.post<userPet>(
      environment.apiUrl + EndPoints.Pet,
      JSON.stringify(petData),
      { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    );
  }
}
