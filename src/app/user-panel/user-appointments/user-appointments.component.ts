import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { UserRequestsService } from '../../core/services/user/user-requests.service';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserAppointments } from '../../core/interfaces/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { environment } from '../../../environments/environment';
import { EndPoints } from '../../core/enums/endpoints';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-appointments',
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule,
    MatInputModule,
    MatTimepickerModule,
    MatDatepickerModule,
  ],
  templateUrl: './user-appointments.component.html',
  styleUrl: './user-appointments.component.css',
})
export class UserAppointmentsComponent {
  columnsToDisplay = ['date', 'time', 'reason', 'actions'];
  currentDate = new Date();

  previousAppointments$!: Observable<any>;
  futureAppointments$!: Observable<any>;
  expandedElement$!: Observable<any>;

  private appointmentsSubject = new BehaviorSubject<UserAppointments[]>([]);
  appointmentsData$ = this.appointmentsSubject.asObservable();

  editForm: FormGroup = new FormGroup({
    date: new FormControl(),
    time: new FormControl(),
    reason: new FormControl(''),
  });

  constructor(
    private userRequests: UserRequestsService,
    private http: HttpClient
  ) {
    this.fetchAppointments();
  }

  fetchAppointments(): void {
    this.userRequests.getUserAppointments().subscribe((data) => {
      this.appointmentsSubject.next(data);
      this.updateTabsData(data);
    });
  }

  updateTabsData(data: UserAppointments[]) {
    this.previousAppointments$ = of(data).pipe(
      map((data: Array<UserAppointments>) => {
        return !data
          ? []
          : data
              .filter((el) => new Date(el.date) < this.currentDate)
              .map((el: UserAppointments) => {
                let { id, date, reason, ...restData } = el;
                let elDate = new Date(date);
                return {
                  id,
                  reason,
                  date: elDate.toLocaleDateString(),
                  time: elDate.toLocaleTimeString().substring(0, 5),
                };
              });
      })
    );
    this.futureAppointments$ = of(data).pipe(
      map((data: Array<UserAppointments>) => {
        return !data
          ? []
          : data
              .filter((el) => new Date(el.date) >= this.currentDate)
              .map((el: UserAppointments) => {
                let { id, date, reason, ...restData } = el;
                let elDate = new Date(date);
                return {
                  id,
                  reason,
                  date: elDate.toLocaleDateString(),
                  time: elDate.toLocaleTimeString().substring(0, 5),
                };
              });
      })
    );
  }

  toggleEdit(element: UserAppointments): void {
    this.expandedElement$ = this.appointmentsData$.pipe(
      map((arr) => {
        const appointment =
          arr.find((el: UserAppointments) => el.id === element.id) ?? null;
        if (appointment) {
          this.editForm.patchValue({
            date: new Date(appointment.date),
            time: new Date(appointment.date),
            reason: appointment.reason,
          });
        }
        return appointment;
      })
    );
  }

  saveEdit(edited: UserAppointments): void {
    (this.editForm.value.date as Date).setHours(
      (this.editForm.value.time as Date).getHours()
    );
    (this.editForm.value.date as Date).setMinutes(
      (this.editForm.value.time as Date).getMinutes()
    );

    const { reason, date } = this.editForm.value;

    const body = {
      reason,
      date,
    };

    this.http
      .put(
        environment.apiUrl + EndPoints.Appointments + '/' + edited.id,
        JSON.stringify(body),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .subscribe({
        next: () => {
          this.fetchAppointments();
          this.expandedElement$ = of(null);
        },
        error: (err) => {
          console.error('Error: ', err);
        },
      });
  }

  cancelEdit(): void {
    this.expandedElement$ = of(null);
  }

  deleteAppointment(element: UserAppointments) {
    this.http
      .delete(environment.apiUrl + EndPoints.Appointments + '/' + element.id, {
        withCredentials: true,
      })
      .subscribe({
        next: () => {
          this.fetchAppointments();
        },
        error: (err) => {
          console.error('Error: ', err);
        },
      });
  }

  merge(): void {
    console.log('clicked');
    this.userRequests
      .mergeUnauthorizedAppointments()
      .pipe(tap((data) => console.log(data)))
      .subscribe();
  }
}
