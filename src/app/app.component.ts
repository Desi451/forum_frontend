import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth-service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'forum_frontend';
  isLoggedIn: boolean = false;
  userId: number | undefined;
  private loggedInSubscription: Subscription | undefined;

  constructor(private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loggedInSubscription = this.authService.isLoggedIn$.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngOnDestroy(): void {
    if (this.loggedInSubscription) {
      this.loggedInSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
  }

  goEdit(): void {
    const id = this.authService.getUserId();
    if (id) {
      this.router.navigate([`/edit/${id}`, { replaceUrl: true }]);
    }
  }
}
