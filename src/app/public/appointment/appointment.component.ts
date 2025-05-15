import { Component, inject, Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Injectable({ providedIn: 'root' })
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
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css',
  standalone: true,
})
export class AppointmentComponent {
  private http = inject(HttpClient);

  appointmentForm: FormGroup = new FormGroup({
    anrede: new FormControl('Ohne Angabe'),
    vorname: new FormControl(''),
    nachname: new FormControl(''),
    email: new FormControl(''),
    telefon: new FormControl(),
    datum: new FormControl(),
    zeit: new FormControl(),
    grund: new FormControl(''),
  });

  onSubmit(): void {
    (this.appointmentForm.value.datum as Date).setHours(
      (this.appointmentForm.value.zeit as Date).getHours()
    );
    (this.appointmentForm.value.datum as Date).setMinutes(
      (this.appointmentForm.value.zeit as Date).getMinutes()
    );

    const {
      anrede,
      vorname,
      nachname,
      email,
      telefon,
      datum,
      grund: grund_des_termines,
    } = this.appointmentForm.value;

    const body = {
      data: {
        anrede,
        vorname,
        nachname,
        email,
        telefon,
        datum,
        grund_des_termines,
      },
    };

    this.http
      .post('http://127.0.0.1:1337/api/termines', JSON.stringify(body), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
