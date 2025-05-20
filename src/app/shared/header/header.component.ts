import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Nav, NavAuth } from '../../core/enums/nav';
import { CommonModule, KeyValuePipe, NgFor } from '@angular/common';
import { AuthService } from '../../core/services/auth/auth.service';
import { Observable } from 'rxjs';
import { UserResponseData } from '../../core/interfaces/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, NgFor, KeyValuePipe, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  nav = Nav;
  navAuth = NavAuth;
  user$: Observable<UserResponseData | null>;
  
  constructor(private auth: AuthService, private router: Router) {
    this.user$ = this.auth.user$
  }

  logout() {
    this.auth.logout();
    this.router.navigate([this.nav.Home]);
  }
}
