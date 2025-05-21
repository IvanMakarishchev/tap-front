import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Nav, NavAuth, NavUser } from '../../core/enums/nav';
import { CommonModule, KeyValuePipe, NgFor } from '@angular/common';
import { AuthService } from '../../core/services/auth/auth.service';
import { User } from '../../core/interfaces/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    NgFor,
    KeyValuePipe,
    MatMenuModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  nav = Nav;
  navAuth = NavAuth;
  navUser = NavUser;
  user: User | null = null;
  isFetching = false;
  initialCheckDone = false;

  constructor(private auth: AuthService, private router: Router) {
    this.auth.user$.subscribe((user) => (this.user = user));
    this.auth.isFetching$.subscribe((fetching) => (this.isFetching = fetching));
    this.auth.initialCheckDone$.subscribe((done) => (this.initialCheckDone = done));
  }

  logout() {
    this.auth.logout();
    this.router.navigate([this.nav.Home]);
  }
}
