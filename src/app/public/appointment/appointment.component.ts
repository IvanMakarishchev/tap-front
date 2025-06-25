import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { environment } from '../../../environments/environment';
import { EndPoints } from '../../core/enums/endpoints';
import { Observable } from 'rxjs';
import { UserResponseData } from '../../core/interfaces/common';
import { AuthService } from '../../core/services/auth/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// @Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-appointment',
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTimepickerModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css',
  standalone: true,
})
export class AppointmentComponent {
  userData$: Observable<UserResponseData | null>;

  appointmentForm: FormGroup = new FormGroup({
    salutation: new FormControl('Ohne Angabe'),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    telephone: new FormControl(),
    date: new FormControl(),
    time: new FormControl(),
    reason: new FormControl(''),
  });

  constructor(private http: HttpClient, private auth: AuthService) {
    this.userData$ = this.auth.user$;
    this.userData$.pipe(takeUntilDestroyed()).subscribe({
      next: (data: UserResponseData | null) => {
        if (data === null) {
          this.appointmentForm.reset();
          return;
        }
        this.appointmentForm.patchValue({
          salutation: data?.salutation ?? 'Ohne Angabe',
          firstname: data?.firstname,
          lastname: data?.lastname,
          telephone: data?.telephone,
          email: data?.email,
        });
      },
    });
  }

  onSubmit(): void {
    (this.appointmentForm.value.date as Date).setHours(
      (this.appointmentForm.value.time as Date).getHours()
    );
    (this.appointmentForm.value.date as Date).setMinutes(
      (this.appointmentForm.value.time as Date).getMinutes()
    );

    const { salutation, firstname, lastname, telephone, email, reason, date } =
      this.appointmentForm.value;

    const body = {
      salutation,
      firstname,
      lastname,
      telephone,
      email,
      reason,
      date,
    };

    this.http
      .post(environment.apiUrl + EndPoints.Appointments, JSON.stringify(body), {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .subscribe();
  }
}
