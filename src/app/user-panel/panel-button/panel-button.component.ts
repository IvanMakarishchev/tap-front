import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Observable } from 'rxjs';
import { UserResponseData } from '../../core/interfaces/common';
import { CommonModule } from '@angular/common';
import { Nav, NavAuth, NavUser } from '../../core/enums/nav';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-panel-button',
  imports: [CommonModule, RouterLink, MatMenuModule, MatButtonModule],
  templateUrl: './panel-button.component.html',
  styleUrl: './panel-button.component.css',
  standalone: true,
})
export class PanelButtonComponent {
  nav = Nav;
  navAuth = NavAuth;
  navUser = NavUser;
  isFetching$: Observable<boolean>;
  user$: Observable<UserResponseData | null>;

  constructor(private auth: AuthService, private router: Router) {
    this.user$ = auth.user$;
    this.isFetching$ = auth.isFetching$;
  }

  logout() {
    this.auth.logout();
    this.router.navigate([this.nav.Home]);
  }
}
