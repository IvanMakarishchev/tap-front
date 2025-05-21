import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Nav, NavAuth } from '../../core/enums/nav';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../core/services/user/user.service';
import { AuthService } from '../../core/services/auth/auth.service';

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
  nav = Nav;
  navAuth = NavAuth;
  registerForm: FormGroup;

  constructor(private auth: AuthService, private userService: UserService, private router: Router) {
    this.registerForm = new FormGroup({
      salutation: new FormControl('Ohne Angabe'),
      firstname: new FormControl('', { nonNullable: true }),
      lastname: new FormControl('', { nonNullable: true }),
      telephone: new FormControl(),
      email: new FormControl('', { nonNullable: true }),
      password: new FormControl('', { nonNullable: true }),
    });
  }

  create() {
    const body = {
      username: this.registerForm.value.email,
      ...this.registerForm.value
    }
    const request$: Observable<any> = this.userService.create(body);

    request$.subscribe(
    //   {
    //   next: () => {
    //     return this.auth
    //       .login({
    //         identifier: this.registerForm.value.email,
    //         password: this.registerForm.value.password,
    //       })
    //       .subscribe({
    //         next: () => this.router.navigate([this.nav.Home])
    //       });
    //   },
    //   error: (err) => console.error(err),
    // }
  );
  }
}
