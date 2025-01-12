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
  isAdmin: boolean = false;
  userId: number | undefined;
  private loggedInSubscription: Subscription | undefined;

  constructor(private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loggedInSubscription = this.authService.isLoggedIn$.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });

    this.loggedInSubscription = this.authService.isAdmin$.subscribe((res: boolean) => {
      this.isAdmin = res;
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
    this.userId = this.authService.getUserId();
    if (this.userId) {
      this.router.navigate([`/thread/${this.userId}`]);
    }
  }

  goAdmin(): void {
    this.router.navigate([`/panel`]);
  }
}
