import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { UserService } from '../../core/services/user/user.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { UserResponseData } from '../../core/interfaces/common';

@Component({
  selector: 'app-user-settings',
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css',
})
export class UserSettingsComponent implements OnInit {
  updateForm: FormGroup;
  userData: Observable<UserResponseData | null>;
  id: number | undefined;

  constructor(private auth: AuthService, private userService: UserService) {
    this.userData = this.auth.user$;
    this.updateForm = new FormGroup({
      salutation: new FormControl('Ohne Angabe'),
      firstname: new FormControl('', { nonNullable: true }),
      lastname: new FormControl('', { nonNullable: true }),
      telephone: new FormControl(),
      email: new FormControl('', { nonNullable: true }),
    });
  }

  ngOnInit(): void {
    this.userData.subscribe({
      next: (data: UserResponseData | null) => {
        if (data === null) {
          this.updateForm.reset();
          return;
        }

        this.id = data?.id;
        this.updateForm.setValue({
          salutation: data?.salutation ?? 'Ohne Angabe',
          firstname: data?.firstname,
          lastname: data?.lastname,
          telephone: data?.telephone,
          email: data?.email,
        });
      },
    });
  }

  updateUser() {
    this.userService
      .updateUser(<number>this.id, this.updateForm.value)
      .subscribe((data: UserResponseData) => {
        this.auth.updateUserSubject = data;
      });
  }
}
