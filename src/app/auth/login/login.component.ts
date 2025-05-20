import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NavAuth } from '../../core/enums/nav';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { RequestError, User } from '../../core/interfaces/common';

@Component({
  selector: 'app-login',
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
})
export class LoginComponent {
  navAuth = NavAuth;
  loginForm: FormGroup;

  constructor(private auth: AuthService) {
    this.loginForm = new FormGroup({
      identifier: new FormControl(),
      password: new FormControl(),
    });
  }

  onSubmit() {
    this.auth.login(this.loginForm.value).subscribe();
  }
}
