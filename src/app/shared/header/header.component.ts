import { OnInit, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Nav, NavAuth, NavUser } from '../../core/enums/nav';
import { CommonModule, KeyValuePipe, NgFor } from '@angular/common';
import { AuthService } from '../../core/services/auth/auth.service';
import { Observable, tap } from 'rxjs';
import { PanelButtonComponent } from '../../user-panel/panel-button/panel-button.component';
import { UserResponseData } from '../../core/interfaces/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    PanelButtonComponent,
    MatButtonModule,
    NgFor,
    KeyValuePipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  nav = Nav;
  isFetching = false;
  user$: Observable<UserResponseData | null> | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.isFetching$
      .pipe(
        tap((fetching) => {
          // if (!fetching) {
          //   // this.user$ = this.auth.user$;
          // }
          // console.log(this.user$);
          // console.log(fetching);
          this.isFetching = fetching;
        })
      )
      .subscribe();
  }

}
