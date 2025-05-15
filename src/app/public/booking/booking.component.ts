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
  selector: 'app-booking',
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
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
  standalone: true,
})
export class BookingComponent {
  private http = inject(HttpClient);

  bookingForm: FormGroup = new FormGroup({
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
    (this.bookingForm.value.datum as Date).setHours(
      (this.bookingForm.value.zeit as Date).getHours()
    );
    (this.bookingForm.value.datum as Date).setMinutes(
      (this.bookingForm.value.zeit as Date).getMinutes()
    );

    const {
      anrede,
      vorname,
      nachname,
      email,
      telefon,
      datum,
      grund: grund_des_termines,
    } = this.bookingForm.value;

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
