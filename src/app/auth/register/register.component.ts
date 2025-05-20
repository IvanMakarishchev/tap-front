import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NavAuth } from '../../core/enums/nav';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EndPoints } from '../../core/enums/endpoints';
import { Observable } from 'rxjs';
import { User } from '../../core/interfaces/common';

@Component({
  selector: 'app-register',
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  navAuth = NavAuth;
  registerForm: FormGroup;

  constructor(private http: HttpClient) {
    this.registerForm = new FormGroup({
      salutation: new FormControl('Ohne Angabe'),
      firstName: new FormControl('', { nonNullable: true }),
      lastName: new FormControl('', { nonNullable: true }),
      telephone: new FormControl(),
      email: new FormControl('', { nonNullable: true }),
      password: new FormControl('', { nonNullable: true }),
    });
  }

  onSubmit() {
    const request$: Observable<any> = this.http.post(
      environment.apiUrl + EndPoints.User,
      JSON.stringify(this.registerForm.value),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    request$.subscribe({
      next: (data: User) => console.log(data),
      error: (err) => console.error(err)
    })
  }
}
