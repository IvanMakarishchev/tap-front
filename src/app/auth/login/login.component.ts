import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Nav, NavAuth } from '../../core/enums/nav';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
})
export class LoginComponent {
  nav = Nav;
  navAuth = NavAuth;
  loginForm: FormGroup;

  constructor(private auth: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      identifier: new FormControl(),
      password: new FormControl(),
    });
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe();
    this.router.navigate([this.nav.Home]);
  }
}
