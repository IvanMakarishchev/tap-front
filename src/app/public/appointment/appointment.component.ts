import { Component, inject, Injectable } from '@angular/core';
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
    MatButtonModule
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css',
  standalone: true,
})
export class AppointmentComponent {
  private http = inject(HttpClient);

  appointmentForm: FormGroup = new FormGroup({
    salutation: new FormControl('Ohne Angabe'),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    telephone: new FormControl(),
    date: new FormControl(),
    time: new FormControl(),
    reason: new FormControl(''),
  });

  onSubmit(): void {
    (this.appointmentForm.value.date as Date).setHours(
      (this.appointmentForm.value.time as Date).getHours()
    );
    (this.appointmentForm.value.date as Date).setMinutes(
      (this.appointmentForm.value.time as Date).getMinutes()
    );

    const {
      salutation,
      first_name,
      last_name,
      email,
      telephone,
      date,
      reason,
    } = this.appointmentForm.value;

    const body = {
      data: {
        salutation,
        first_name,
        last_name,
        email,
        telephone,
        date,
        reason,
      },
    };

    this.http
      .post(environment.apiUrl + EndPoints.Appointments, JSON.stringify(body), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
